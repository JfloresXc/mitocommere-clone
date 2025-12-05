# Guía de Instalación Manual de Cypress en Angular v20 (Integración con Jest)

Esta guía detalla los pasos para instalar Cypress manualmente en un proyecto Angular que ya utiliza Jest, asegurando que no existan conflictos de tipado entre ambos frameworks.

---

## 1. Instalación del Paquete

Instala Cypress como dependencia de desarrollo:

```bash
npm install cypress --save-dev --force
```

---

## 2. Inicialización (Scaffolding)

Ejecuta el asistente de configuración inicial para generar la estructura de carpetas:

```bash
npx cypress open
```

**Pasos en el asistente:**

1. Se abrirá la ventana de Cypress.
2. Selecciona **E2E Testing**.
3. Revisa los archivos que se crearán y haz clic en **Continue**.
4. Selecciona un navegador (Chrome/Electron) y dale a **Start**.
5. Cierra la ventana del navegador y termina el proceso en la terminal.

---

## 3. Resolución de Conflictos de Tipos (Jest vs Cypress)

Para evitar que TypeScript confunda `expect` de Jest con `expect` de Cypress, debemos aislar el entorno de Cypress.

Crea un archivo nuevo: **`cypress/tsconfig.json`** y pega el siguiente contenido:

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "dom"],
    "types": ["cypress", "node"],
    "baseUrl": "../"
  },
  "include": ["**/*.ts"]
}
```

> **Nota:** La propiedad `"types": ["cypress", "node"]` es crucial. Asegura que dentro de la carpeta `cypress/` solo existan los tipos de Cypress, ignorando los de Jest.

---

## 4. Configuración de Base URL

Edita el archivo **`cypress.config.ts`** en la raíz del proyecto para definir el puerto de desarrollo de Angular:

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

---

## 5. Scripts de Ejecución

Agrega los siguientes comandos en tu **`package.json`** bajo la sección `"scripts"`:

```json
"scripts": {
  "cy:open": "cypress open",
  "cy:run": "cypress run"
}
```

---

## 6. Configuración de Git

Evita subir videos de errores o capturas de pantalla al repositorio. Agrega esto a tu **`.gitignore`**:

```gitignore
# Cypress artifacts
cypress/videos
cypress/screenshots
cypress/downloads
```

---

## 7. Flujo de Trabajo (Workflow)

Al ser una instalación manual, Cypress no inicia el servidor de Angular por ti. Debes ejecutar ambos procesos:

```bash
# Terminal 1: Inicia el servidor de desarrollo de Angular
npm start

# Terminal 2: Abre Cypress (en modo interactivo)
npm run cy:open
```

**O ejecuta los tests en modo headless (para CI/CD):**

```bash
# Primero inicia el servidor de Angular
npm start

# En otra terminal, ejecuta los tests
npm run cy:run
```

---

## 8. Estructura de Carpetas Resultante

```
/
├── cypress/
│   ├── e2e/              <-- Tus archivos de prueba (*.cy.ts)
│   ├── fixtures/         <-- JSONs para mock data
│   ├── support/          <-- Comandos globales y configuración
│   │   ├── commands.ts   <-- Comandos personalizados
│   │   └── e2e.ts        <-- Configuración global de E2E
│   └── tsconfig.json     <-- Configuración de tipos aislada
├── cypress.config.ts     <-- Configuración principal de Cypress
├── package.json
└── tsconfig.json         <-- Configuración de la App
```

---

## 9. Comandos Útiles

```bash
# Abrir Cypress UI (modo interactivo)
npm run cy:open

# Ejecutar tests en modo headless (CI)
npm run cy:run

# Ejecutar con navegador específico
npm run cy:run -- --browser chrome

# Ejecutar un test específico
npm run cy:run -- --spec "cypress/e2e/product-detail.cy.ts"

# Ejecutar con reporte de video
npm run cy:run -- --video

# Ver resultados sin video (más rápido)
npm run cy:run -- --video false
```

---

## 10. (Opcional) Comandos Personalizados

Puedes crear comandos reutilizables en **`cypress/support/commands.ts`**:

```typescript
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      addToCart(productId: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="login-button"]').click();
});

Cypress.Commands.add('addToCart', (productId: string) => {
  cy.get(`[data-cy="product-${productId}"]`).click();
  cy.get('[data-cy="add-to-cart-button"]').click();
});

export {};
```

---

## 11. Ejemplo de Test E2E

Crea un archivo **`cypress/e2e/home.cy.ts`**:

```typescript
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the home page', () => {
    cy.contains('MitoCommerce').should('be.visible');
  });

  it('should navigate to products', () => {
    cy.get('[data-cy="products-link"]').click();
    cy.url().should('include', '/products');
  });
});
```

---

## 12. Mejores Prácticas

1. **Usa selectores `data-cy`**: Más robustos que clases CSS

   ```html
   <button data-cy="add-to-cart-button">Add to cart</button>
   ```

2. **Agrupa tests relacionados con `describe`**

   ```typescript
   describe('Product Detail Page', () => {
     describe('Product Images', () => {
       it('should display thumbnail images', () => {
         // test...
       });
     });
   });
   ```

3. **Usa `beforeEach` para setup común**

   ```typescript
   beforeEach(() => {
     cy.visit('/products/1');
   });
   ```

4. **Evita `cy.wait(ms)` fijos**: Usa assertions automáticas

   ```typescript
   // ❌ Malo
   cy.wait(1000);

   // ✅ Bueno
   cy.get('.product-name').should('be.visible');
   ```

---

## 13. Troubleshooting

### Error: `Cannot find module 'cypress'`

```bash
npm install cypress --save-dev
```

### Conflictos de tipos entre Jest y Cypress

Asegúrate de tener `cypress/tsconfig.json` correctamente configurado con `"types": ["cypress", "node"]`.

### Tests no encuentran elementos

Verifica que el servidor de Angular esté corriendo en `http://localhost:4200`.

---

## Resumen

1. ✅ Instalar Cypress: `npm install cypress --save-dev`
2. ✅ Inicializar: `npx cypress open`
3. ✅ Crear `cypress/tsconfig.json` para aislar tipos
4. ✅ Configurar `cypress.config.ts` con `baseUrl`
5. ✅ Agregar scripts a `package.json`
6. ✅ Actualizar `.gitignore`
7. ✅ Ejecutar: `npm start` + `npm run cy:open`

¡Listo para escribir tests E2E en Angular con Cypress! 🎉
