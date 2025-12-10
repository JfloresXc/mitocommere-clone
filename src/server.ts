import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { environment } from '@envs/environment';
import { ChatMessage } from '@/modules/ui/models/ChatMessage';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json());

/**
 * Genkit configuration
 */
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: environment.googleAIKey,
    }),
  ],
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Routes
 */
app.post('/api/chat-bot', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `
    Nosotros somos Mitocommerce, una empresa que vende productos orgánicos como plátanos, 
    manzanas, naranjas, peras y uvas, entre muchas otras.
  Eres un asistente virtual de un ecommerce. Tu objetivo es ayudar a los clientes con:
  -  Preguntas sobre productos
  -  Procesamiento de pedidos
  -  Devoluciones y cambios
  -  Preguntas generales sobre la tienda
  `;

    const response = await ai.generate({
      model: 'googleai/gemini-2.5-flash',
      prompt: message,
      system: systemPrompt,
      config: {
        temperature: 0.7,
      },
    });

    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      content: response.text,
      sender: 'bot',
      timestamp: new Date(),
    };

    return res.json({ ...botMessage });
  } catch (error) {
    console.error('Error generating response:', error);
    return res.status(500).json({ error: 'Error al procesar el mensaje' });
  }
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
