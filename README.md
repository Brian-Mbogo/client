# CharityMinds React Client

Frontend client for the CharityMinds registration interface, built with React, Vite, and Tailwind CSS v4.

## Live Demo
- https://client-dun-omega.vercel.app

## 1) What this project currently does

This client currently renders one page:
- `RegisterPage` (registration screen)

`App.jsx` mounts only that page for now:
- Header
- Registration form
- Footer

No API integration is wired yet in this client. The form is currently presentational (UI-focused).

## 2) Tech stack used

- React 19
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- ESLint 9 (flat config)

## 3) Prerequisites

Install:
- Node.js (LTS) from https://nodejs.org
- npm (comes with Node.js)

Check versions:

```bash
node -v
npm -v
```

## 4) Project setup: step-by-step with commands and what each step entailed

This section explains the exact workflow typically used to reach this current setup.

### Step 1: Create workspace folders

```bash
mkdir CharityMinds-React
cd CharityMinds-React
mkdir client server
cd client
```

What this step entailed:
- Created a monorepo-style root folder (`CharityMinds-React`)
- Split frontend and backend concerns into `client` and `server`
- Entered `client` to initialize the React app

### Step 2: Scaffold the React app with Vite

```bash
npm create vite@latest .
```

What this step entailed:
- Generated a Vite project in the current folder (`.`)
- Selected:
  - Framework: `React`
  - Variant: `JavaScript`
- Created starter files like `index.html`, `src/main.jsx`, `src/App.jsx`, `vite.config.js`, and `package.json`

### Step 3: Install project dependencies

If dependencies were not auto-installed during scaffold:

```bash
npm install
```

What this step entailed:
- Downloaded packages into `node_modules`
- Created/updated `package-lock.json` to lock versions

### Step 4: Add Tailwind CSS v4 integration for Vite

```bash
npm install tailwindcss @tailwindcss/vite
```

What this step entailed:
- Installed Tailwind runtime and Vite plugin
- Enabled Tailwind in `vite.config.js` via:
  - `import tailwindcss from '@tailwindcss/vite'`
  - `plugins: [react(), tailwindcss()]`
- Set `src/index.css` to:

```css
@import "tailwindcss";
```

### Step 5: Build the registration UI by componentizing

What this step entailed:
- Broke the page into reusable components in `src/components/`:
  - `Header.jsx`
  - `RegisterForm.jsx`
  - `Footer.jsx`
- Created page composition file:
  - `src/pages/RegisterPage.jsx`
- Wired the page in `src/App.jsx`:
  - `return <RegisterPage />`
- Used Tailwind utility classes for layout and styling

### Step 6: Run local development server

```bash
npm run dev
```

What this step entailed:
- Started Vite dev server (usually `http://localhost:5173`)
- Enabled hot reload while editing files

### Step 7: Quality and production checks

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

What this step entailed:
- `lint` checks JavaScript/JSX code quality
- `build` outputs optimized files into `dist/`
- `preview` serves the built app locally for final verification

## 5) Commands that are run in this project (reference)

From `package.json`:

- `npm run dev`
  - Runs: `vite`
  - Purpose: start development server

- `npm run build`
  - Runs: `vite build`
  - Purpose: create production-ready assets in `dist/`

- `npm run lint`
  - Runs: `eslint .`
  - Purpose: run static code checks

- `npm run preview`
  - Runs: `vite preview`
  - Purpose: preview the production build locally

## 6) Current folder structure

```text
client/
|- public/
|  \- assets/images/logo.png
|- src/
|  |- assets/
|  |  |- react.svg
|  |  \- vite.svg
|  |- components/
|  |  |- Button.jsx
|  |  |- Footer.jsx
|  |  |- Header.jsx
|  |  |- RegisterForm.jsx
|  |- pages/
|  |  \- RegisterPage.jsx
|  |- App.css
|  |- App.jsx
|  |- index.css
|  \- main.jsx
|- eslint.config.js
|- index.html
|- package.json
|- tailwind.config.js
\- vite.config.js
```

## 7) File-by-file explanation (core runtime files)

- `src/main.jsx`
  - React entrypoint
  - Mounts `<App />` into `#root`

- `src/App.jsx`
  - Root app component
  - Currently renders only `RegisterPage`

- `src/pages/RegisterPage.jsx`
  - Page composition layer
  - Renders `Header`, `RegisterForm`, `Footer`

- `src/components/Header.jsx`
  - Top navigation section
  - Uses logo from `/public/assets/images/logo.png`

- `src/components/RegisterForm.jsx`
  - Main registration form UI
  - Includes text/date/password inputs, terms checkbox, submit button

- `src/components/Footer.jsx`
  - Bottom page footer

- `src/index.css`
  - Tailwind entry (`@import "tailwindcss";`)
  - Global `html, body` height rules

- `vite.config.js`
  - Enables React plugin and Tailwind Vite plugin

- `tailwind.config.js`
  - Declares content scan paths (`index.html`, `src/**/*.{js,jsx}`)

- `eslint.config.js`
  - ESLint flat config for JS/JSX + React hooks + Vite refresh plugin

## 8) How to run this project now (clean machine)

```bash
cd "C:\Users\( F r E a K )\gomycode\CharityMinds-React\client"
npm install
npm run dev
```

Then open the URL printed in terminal (commonly `http://localhost:5173`).

## 9) Suggested day-to-day workflow

1. Start work:

```bash
npm run dev
```

2. Before pushing code:

```bash
npm run lint
npm run build
```

3. Optional final sanity check:

```bash
npm run preview
```

## 10) Known scope and next implementation targets

Current scope:
- UI-only registration page
- Static links in header/footer
- No API calls yet

Likely next steps:
- Add React Router routes (`/register`, `/login`, `/dashboard`)
- Add controlled form state and validation
- Connect submit action to backend API in `server`
- Add reusable UI components (Button/Input/FormField patterns)

## 11) Changelog-style implementation timeline

This timeline summarizes the practical build order used for the current UI.

1. Project scaffolded with Vite (React + JavaScript).
   - Command run: `npm create vite@latest .`

2. Dependencies installed for local development.
   - Command run: `npm install`

3. Tailwind CSS v4 integrated with Vite plugin.
   - Command run: `npm install tailwindcss @tailwindcss/vite`
   - Files updated: `vite.config.js`, `src/index.css`

4. Registration layout split into reusable components.
   - Created: `src/components/Header.jsx`
   - Created: `src/components/RegisterForm.jsx`
   - Created: `src/components/Footer.jsx`
   - Created: `src/pages/RegisterPage.jsx`

5. Root app switched to render registration page composition.
   - Updated: `src/App.jsx` to return `<RegisterPage />`

6. Static branding asset connected in navigation.
   - Used: `public/assets/images/logo.png` in `Header.jsx`

7. Local verification run in development mode.
   - Command run: `npm run dev`

8. Quality and production checks prepared.
   - Commands run when validating changes:
     - `npm run lint`
     - `npm run build`
     - `npm run preview`
