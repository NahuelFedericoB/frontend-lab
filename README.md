# Frontend Lab — React Component Playground

An independent React application created to demonstrate how I approach component design, API design through props, composition, state management, styling, accessibility, testing, and reusable frontend architecture.

The project is designed as an interactive playground where each component can be explored through its live implementation, configurable properties, source code, and tests.

## Live Demo

**Standalone application:**
https://frontend-lab-nfb.vercel.app/

**Embedded inside the portfolio:**
https://portfolio-nfb.vercel.app/lab/

---

## Purpose

The Frontend Lab is a practical representation of how I work with **React**.

Instead of presenting components only as static code examples, the application allows users to interact with them and observe how their behavior changes based on their props and state.

The project focuses on:

- Component responsibilities
- Reusability
- Composition
- Props and controlled behavior
- State management
- Accessibility
- Responsive behavior
- Styling isolation
- Type-safe component contracts
- Automated component testing
- Source-code visibility

The application is intentionally independent from the main portfolio so it can be developed, built, tested, and deployed on its own.

---

## Tech Stack

### Core

- **React 19**
- **React DOM**
- **TypeScript**
- **Vite 8**

### Styling

- **Tailwind CSS 3**
- **CSS Modules**
- CSS custom properties
- Responsive CSS

Tailwind is configured with project-specific design tokens while component-specific behavior and styling can remain isolated through CSS Modules.

### Testing

- **Vitest**
- **Testing Library for React**
- **Testing Library User Event**
- **jest-dom**
- **JSDOM**

### Code Quality

- **ESLint**
- **Prettier**
- **TypeScript**

### Additional

- **highlight.js** for source-code rendering

---

## Architecture

The application follows a component-oriented structure.

At the application level:

```text
src/
├── App.tsx
├── layout/
├── pages/
├── components/
├── tests/
└── ...
```

The main application is responsible for composition while individual components own their behavior and presentation.

The main flow is centered around:

```text
App
 ├── Lab Header
 ├── Components Page
 │    ├── Component examples
 │    ├── Props / controls
 │    ├── Source code
 │    └── Tests
 └── Footer
```

This structure intentionally keeps the application layer separate from the individual component implementations.

---

## Component Design

The components are designed around clear responsibilities rather than around large generic abstractions.

Each component should expose a predictable interface through typed props and keep internal implementation details isolated whenever possible.

The Lab demonstrates patterns such as:

- Explicit prop contracts
- Sensible defaults
- Controlled and interactive behavior
- Composition instead of duplication
- State local to the component that owns it
- CSS isolation
- Accessible HTML semantics
- Keyboard-friendly interactions
- Responsive behavior

The goal is to demonstrate not only what a component looks like, but how I think about its API and responsibilities.

---

## Interactive Examples

The Lab provides live examples where component behavior can be changed at runtime.

A typical workflow is:

```text
Component
    ↓
Configure props
    ↓
Observe behavior
    ↓
Inspect implementation
    ↓
Review tests
```

This makes the repository useful both as a component showcase and as a technical reference.

---

## Standalone and Embedded Modes

The application supports two modes.

### Standalone

The application can run independently:

```text
https://frontend-lab-nfb.vercel.app/
```

In this mode the Lab renders its own header and footer.

### Embedded

The same application can be embedded into the Svelte portfolio.

```text
https://portfolio-nfb.vercel.app/lab/
```

The portfolio loads the React application through an iframe.

The Lab detects the embedded mode and adjusts its layout accordingly.

```text
Svelte Portfolio
       │
       │ iframe
       ▼
React Frontend Lab
       │
       └── postMessage
             ↓
       Dynamic iframe height
```

The embedded implementation uses `ResizeObserver` to monitor the rendered content and sends the calculated height to the parent application.

This allows the Lab to remain responsive to content changes without requiring the parent application to know its internal layout dimensions.

---

## Local Development

### Requirements

The project currently requires:

- Node.js 24.13.0 or newer
- npm
- Git

Clone the repository:

```bash
git clone https://github.com/NahuelFedericoB/frontend-lab.git
cd frontend-lab
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The development server runs on:

```text
http://127.0.0.1:5174
```

The port is intentionally strict to make local integration with the portfolio predictable.

---

## Running With the Portfolio

When the portfolio is running locally, its `/lab` route proxies requests to:

```text
http://127.0.0.1:5174
```

Therefore, to reproduce the complete local experience:

```text
Portfolio
127.0.0.1:5173
        │
        └── /lab
              ↓
Frontend Lab
127.0.0.1:5174
```

Start both applications independently.

### Frontend Lab

```bash
npm run dev
```

### Portfolio

```bash
npm run dev
```

The repositories do not need to be physically located next to each other.

---

## Production Build

Run:

```bash
npm run build
```

The build performs TypeScript checking before creating the Vite production bundle.

The generated output is:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

The preview server runs on:

```text
http://127.0.0.1:4174
```

---

## Code Quality

Type checking:

```bash
npm run check
```

Lint:

```bash
npm run lint
```

Automatic lint fixes:

```bash
npm run lint:fix
```

Formatting:

```bash
npm run format
```

Formatting validation:

```bash
npm run format:check
```

---

## Testing

Run the test suite:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage:

```bash
npm run test:coverage
```

The project uses:

- Vitest as the test runner
- React Testing Library for component behavior
- `user-event` for realistic user interaction
- `jest-dom` for DOM-specific assertions
- JSDOM as the test environment

The intention is to test components based on their observable behavior rather than their implementation details.

---

## Deployment

The Frontend Lab is deployed independently using **Vercel**.

Production URL:

https://frontend-lab-nfb.vercel.app/

Vercel is connected directly to the GitHub repository and builds the application using:

```bash
npm run build
```

with:

```text
Output Directory: dist
```

The application therefore remains independently deployable from the portfolio.

---

## Project Relationship

The repositories intentionally have different responsibilities:

```text
portfolio
│
├── Svelte application
├── Personal website
├── Experience / work presentation
└── Frontend Lab integration
        │
        ▼
frontend-lab
│
├── React application
├── Component playground
├── Component examples
├── Source code
└── Tests
```

This separation allows each project to evolve independently while the portfolio can present the Lab as part of the overall experience.

---

## What This Project Demonstrates

This repository is primarily intended as a practical demonstration of my React development approach.

It shows how I work with:

- React component composition
- TypeScript
- Props and component APIs
- Local state
- Reusable UI patterns
- CSS isolation
- Tailwind CSS
- Accessibility
- Responsive interfaces
- Component testing
- User interaction testing
- Code quality tooling
- Independent frontend deployments

The objective is to make the implementation visible rather than treating the component library as a black box.

---

## Author

**Nahuel Bordon**
Front-End Engineer

GitHub:
https://github.com/NahuelFedericoB

Portfolio:
https://portfolio-nfb.vercel.app/

## Copyright

© 2026 Nahuel Bordon. All rights reserved.

This project, including its source code, component implementations, design, documentation, and original content, is the intellectual property of Nahuel Bordon.

The repository is publicly available for educational, demonstration, and professional evaluation purposes. No license is granted to copy, modify, redistribute, publish, or commercially use this project or substantial portions of its source code without prior written permission from the author.

Third-party libraries and dependencies remain subject to their respective licenses.
