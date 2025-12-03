# Configuraci�n de Jest con Zoneless en Angular

## 1. Instalaci�n

### 1.1 Eliminar Karma y Jasmine

```bash
npm remove karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine jasmine-core
```

### 1.2 Instalar Jest y dependencias

```bash
npm i -D jest jest-preset-angular ts-node @types/jest @angular-builders/jest --force
```

## 2. Configurar angular.json

En la secci�n `test` del proyecto, reemplazar el builder de Karma por el de Jest:

```json
"test": {
  "builder": "@angular-builder/jest:run",
  "options": {
    "tsConfig": "tsconfig.spec.json",
    "assets": [
      {
        "glob": "**/*",
        "input": "public"
      }
    ],
    "styles": ["src/styles.css"]
  }
}
```

## 3. Crear jest.config.ts

Crear el archivo `jest.config.ts` en la ra�z del proyecto:

```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/app/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
  },
};

export default config;
```

## 4. Crear setup-jest.ts

Crear el archivo `setup-jest.ts` en la ra�z del proyecto para configurar el entorno Zoneless:

```typescript
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// =� Importante: Ejecuta esta funci�n para configurar el entorno Zoneless.
setupZonelessTestEnv();
```

## 5. Actualizar tsconfig.spec.json

Modificar `tsconfig.spec.json` para incluir los tipos de Jest:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["jest", "node"],
    "esModuleInterop": true
  },
  "files": [],
  "include": ["src/**/*.ts", "setup-jest.ts"]
}
```

## 6. Actualizar package.json scripts

Cambiar el script de test para usar Jest:

```json
"scripts": {
  "test": "npx jest"
}
```

## 7. Consideraciones importantes

- **Path aliases**: El `moduleNameMapper` en `jest.config.ts` debe coincidir con los `paths` definidos en `tsconfig.json`
- **Providers en tests**: Recuerda incluir `provideZonelessChangeDetection()` en tus tests junto con los dem�s providers necesarios

## 8. Ejemplo de test con Zoneless

```typescript
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), provideRouter([]), provideHttpClient()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```
