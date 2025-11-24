# GEMINI.md

## Project Overview

This is a Next.js web application for a recruitment system. The project is built with React, TypeScript, and Tailwind CSS. It features a comprehensive design system that showcases the UI components used throughout the application.

## Building and Running

### Prerequisites

*   Node.js (v20 or later)
*   pnpm

### Installation

1.  Install dependencies:
    ```bash
    pnpm install
    ```

### Development

To run the development server:

```bash
pnpm dev
```

This will start the application on `http://localhost:3000`.

### Building

To build the application for production:

```bash
pnpm build
```

### Linting

To run the linter:

```bash
pnpm lint
```

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling.
*   **Components:** Reusable UI components are located in `src/components`. The application also utilizes Radix UI for accessible and unstyled components.
*   **Fonts:** The project uses `Geist Sans`, `Geist Mono`, and `Plus Jakarta Sans` fonts.
*   **Linting:** The project uses ESLint for code quality.
*   **Toast Notifications:** The application uses `sonner` for toast notifications.