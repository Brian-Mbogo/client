# CharityMinds React Client

Live demo (Vercel): https://client-dun-omega.vercel.app

This project is a React app built with Vite and Tailwind CSS.

## Quick quoted glossary

> "Node.js is the runtime that lets you run JavaScript outside the browser."

> "`npm` (Node Package Manager) is the tool used to install and manage project packages."

> "`npx` runs a package command without you installing it globally."

> "`package.json` is your project manifest: scripts, dependencies, and metadata."

> "`package-lock.json` locks exact package versions so installs stay consistent."

> "`node_modules` is the folder where npm installs project dependencies."

## Components and how to structure them

A React component is a reusable UI block. Your app is built by combining small components into bigger sections/pages.

## What components, hooks, JSX, state, props, routing, event handling, and rendering are

- Components are functions that return JSX (UI). They let you split the interface into reusable pieces like `Navbar`, `DonationCard`, and `Footer`.
- JSX is syntax that looks like HTML inside JavaScript and describes what the UI should render.
- Hooks are special React functions (like `useState` and `useEffect`) that let components use state, side effects, and reusable logic.
- State is component data that changes over time and triggers UI updates when updated.
- Props are inputs passed from a parent component to a child component.
- Routing maps URL paths (like `/`, `/about`, `/donate`) to page components, usually using `react-router-dom`.
- Event handling means responding to user actions (click, submit, change) using handler functions like `onClick` and `onSubmit`.
- Rendering is React turning component code into what appears on screen, then re-rendering when state or props change.
- Rule: hooks must be called at the top level of a React component or inside a custom hook, not inside conditions or loops.

Simple example:

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

In this example, `Counter` is the component and `useState` is the hook.

Basic rules:

1. Keep components focused on one job.
2. Pass data down with `props`.
3. Keep state as close as possible to where it is used.
4. Reuse shared UI (buttons, cards, inputs) instead of duplicating code.
5. Split large components when they become hard to read.

Suggested `src` structure as the project grows:

```text
src/
|- assets/              # Images, icons, static files used by React
|- components/          # Reusable UI components
|  |- common/           # Generic components (Button, Card, Modal...)
|  \- layout/           # Header, Footer, Navbar, Sidebar...
|- pages/               # Page-level components (Home, About, Donate...)
|- features/            # Feature modules (donation, auth, profile...)
|- hooks/               # Custom hooks (useAuth, useFetch...)
|- services/            # API calls and external service logic
|- utils/               # Helper functions
|- App.jsx              # Main app shell / routing entry
|- index.css            # Global styles (Tailwind import + base styles)
\- main.jsx             # App bootstrap (render to #root)
```

Practical pattern:

1. `main.jsx` starts the app.
2. `App.jsx` handles high-level layout and routes.
3. `pages/*` represent screens.
4. `components/*` are shared pieces used by pages/features.
5. `services/*` handles API calls so UI components stay clean.

## File-by-file explanation (first to last)

### Root files

1. `.gitignore`  
   Lists files and folders Git should ignore, including logs, `node_modules`, build output (`dist`), and editor/system files.

2. `eslint.config.js`  
   ESLint flat config for JavaScript/JSX files. It enables recommended JS rules, React hooks rules, React refresh rules, and ignores `dist`.

3. `index.html`  
   Main HTML entry file. It contains `<div id="root"></div>` where React mounts, and loads `src/main.jsx`.

4. `package-lock.json`  
   Auto-generated lockfile that pins exact dependency versions for consistent installs.

5. `package.json`  
   Project metadata, scripts (`dev`, `build`, `lint`, `preview`), and dependencies/devDependencies (React, Vite, Tailwind, ESLint).

6. `README.md`  
   Project documentation (this file).

7. `vite.config.js`  
   Vite configuration file. It registers the React plugin and the Tailwind Vite plugin.

### `public/`

8. `public/vite.svg`  
   Static Vite logo served directly from the public folder.

### `src/`

9. `src/main.jsx`  
   React entry point. It creates the root and renders `<App />` inside `StrictMode`.

10. `src/index.css`  
    Global stylesheet entry. Currently imports Tailwind via `@import "tailwindcss";`.

11. `src/App.jsx`  
    Main app component. Right now it is the default Vite React demo with a counter and logo links.

12. `src/App.css`  
    Component-level styles for `App.jsx` (layout, logo animation, button/card spacing).

13. `src/assets/react.svg`  
    React logo asset used by `App.jsx`.

## Folder structure (mini tree)

```text
client/
|- public/
|  \- vite.svg
|- src/
|  |- assets/
|  |  \- react.svg
|  |- App.css
|  |- App.jsx
|  |- index.css
|  \- main.jsx
|- .gitignore
|- eslint.config.js
|- index.html
|- package-lock.json
|- package.json
|- README.md
\- vite.config.js
```

- `public/`: Static files served as-is.
- `src/`: React source code, styles, and local assets.

## Steps that lead here (video flow you shared)

1. In terminal, go to the place where you want the project folder to live.
2. Create the main project and subfolders:
   - `mkdir CharityMinds-React`
   - `cd CharityMinds-React`
   - `mkdir client server`
3. Go into the React app folder:
   - `cd client`
4. Scaffold React with Vite in the current folder:
   - `npm create vite@latest .`
5. During prompts, choose:
   - Install latest version: `Y`
   - Framework: `React`
   - Variant: `JavaScript`
   - Rollup option: `No` (default)
   - Install dependencies and start: `Yes`
6. Install Tailwind packages (inside `client`):
   - `npm install -D tailwindcss postcss autoprefixer`
7. Update `client/vite.config.js` to include Tailwind/PostCSS plugin setup (as shown in the tutorial).
8. Update `client/src/index.css` with Tailwind directives:
   - `@tailwind base;`
   - `@tailwind components;`
   - `@tailwind utilities;`
9. Start development server (inside `client`):
   - `npm run dev`
10. Open the local URL from terminal (usually `http://localhost:5173`).

Note: this repository currently uses Tailwind v4 style config (`@tailwindcss/vite` + `@import "tailwindcss";`), which is slightly different from the older PostCSS-style setup above.

## Setup process (from zero)

1. Install Node.js (LTS) from `https://nodejs.org`.
2. Confirm installation:
   - `node -v`
   - `npm -v`
3. (Optional) Confirm VS Code terminal command:
   - `code --version`
4. Open terminal and go to the project:
   - `cd "C:\Users\( F r E a K )\gomycode\CharityMinds-React\client"`
5. Install dependencies:
   - `npm install`
6. Start development server:
   - `npm run dev`
7. Open the local app URL shown in terminal (usually `http://localhost:5173`).
8. Open the project in VS Code (if not already open):
   - `code .`

## Open this project in VS Code from terminal

1. Open a terminal (PowerShell or Command Prompt).
2. Move into this project folder:  
   `cd "C:\Users\( F r E a K )\gomycode\CharityMinds-React\client"`
3. Start VS Code in the current folder:  
   `code .`

What these commands do:

- `cd ...` changes the terminal's current working directory to your project folder.
- `code .` tells VS Code to open the current directory (`.`), so the files appear in the Explorer.

## Quick start

```bash
npm install
npm run dev
```

## Useful scripts

- `npm run dev`: Start local development server.
- `npm run build`: Create production build in `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint checks.


## Default and named exports (modules)

- `export default X` exports one main value from a file.
- `import X from './file'` imports that default export (name can be changed by importer).
- `export { X }` is a named export.
- `import { X } from './file'` imports a named export (must match exact name and case).
- You can have many named exports, but only one default export per file.

Example:

```jsx
// App.jsx
function App() {
  return <h1>Hello world, this is React.</h1>
}

export default App
// or: export { App }
```

```jsx
// main.jsx
import App from './App.jsx'      // for default export
// import { App } from './App.jsx' // for named export
```

Common mistake:

- `export { APP }` fails if your function is named `App` (JavaScript is case-sensitive).



