import { Component, signal, inject } from '@angular/core';
import { ChatMessage } from '../../models/ChatMessage';
import { FormsModule } from '@angular/forms';
// import { ChatService } from '@/shared/services/chat.service';

@Component({
  selector: 'app-chat-bot',
  imports: [FormsModule],
  templateUrl: './chat-bot.html',
  styles: `
    @keyframes bounce {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-4px);
      }
    }

    .animate-bounce {
      animation: bounce 0.6s ease-in-out infinite;
    }
  `,
})
export class ChatBot {
  // private chatService = inject(ChatService);

  isExpanded = signal(false);
  messages = signal<ChatMessage[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte con este curso?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  currentMessage = '';
  isTyping = signal(false);

  toggleChat() {
    this.isExpanded.update((value) => !value);
  }

  sendMessage() {}

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
