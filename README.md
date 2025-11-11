# Smart Finance Tracker — Starter Template

This workspace contains a starter React + Tailwind + Firebase + OpenAI scaffold for the Smart Finance Tracker project.

What I added

- Tailwind config and index.css directives
- Components: Navbar, ExpenseForm, ExpenseList, ChartComponent, BudgetPlanner, AIInsights
- Pages: Dashboard, Login, Register
- Context: AuthContext (Firebase Auth wrapper)
- Hooks: useFetchAI (OpenAI call wrapper; uses VITE_OPENAI_API_KEY)
- Firebase: firebaseConfig.js (reads Vite env vars)
- Utils: formatDate

Next steps

1. Install additional dependencies:

```
npm install axios firebase react-router-dom chart.js react-chartjs-2 date-fns framer-motion
```

2. Create a `.env` file at project root and set your keys (Vite env vars):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_OPENAI_API_KEY=...
```

3. Start dev server:

```
npm run dev
```

4. For production, ensure OpenAI keys are never exposed client-side; proxy requests through a serverless function.

Extras to implement

- Firestore CRUD for expenses (users/{uid}/expenses)
- Budget storage and enforcement
- AI server-side proxy + rate-limits
- Tests and CI

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
