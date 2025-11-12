# Project Overview

This is a new Angular project named "mitocommerce", generated with Angular CLI. It's a standalone application, which is the modern approach for building Angular apps. The project is set up with basic dependencies and a standard file structure.

## Building and Running

### Development Server

To start a local development server, run:

```bash
npm start
```

or

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building

To build the project for production, run:

```bash
npm run build
```

or

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

To run unit tests, execute:

```bash
npm test
```

or

```bash
ng test
```

### Linting

To lint the project files, run:

```bash
npm run lint
```

or

```bash
ng lint
```

## Development Conventions

*   **Standalone Components:** The project is set up to use standalone components, which simplifies the architecture by not requiring `NgModule`.
*   **Zoneless Change Detection:** The application is configured to be zoneless, which is a modern feature in Angular that can lead to better performance.
*   **Routing:** The routing configuration is located in `src/app/app.routes.ts`. Currently, no routes are defined.
*   **Styling:** Global styles are in `src/styles.css`, and component-specific styles are in their respective `.css` files.
*   **Code Formatting:** The project includes a `.prettierrc.json` file, which suggests that Prettier is used for code formatting.

## Angular Best Practices

You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

### TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead

### State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection