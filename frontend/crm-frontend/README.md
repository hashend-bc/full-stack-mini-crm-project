# Venture CRM — Frontend

React + Vite + TypeScript + Tailwind CSS frontend for the Venture CRM module.

## Stack
- React 18 + TypeScript
- Vite 5
- React Router v6
- Axios
- Tailwind CSS 3
- Vitest + React Testing Library (unit tests)
- Playwright (E2E tests)

## Setup

```bash
cd frontend/crm-frontend
npm install
```

### Environment
Create a `.env` file (optional — defaults to `http://localhost:5000/api`):
```
VITE_API_URL=http://localhost:5000/api
```

### Run dev server
```bash
npm run dev
# → http://localhost:5173
```

### Run unit tests
```bash
npm test
```

### Run E2E tests
```bash
# Ensure dev server + backend are running first
npx playwright install chromium
npm run test:e2e
```

### Build for production
```bash
npm run build
```

## Folder Structure
```
src/
├── auth/           # AuthContext, LoginPage, RegisterPage, ProtectedRoute
├── notes/          # NotesPage, NoteCard, NoteForm, notesApi
├── shared/
│   ├── ui/         # Button, Input, Modal, Tag, Logo
│   └── layout/     # AppLayout, Sidebar, TopBar
├── lib/            # Axios instance
└── test/           # Unit tests + E2E tests
```

## Pages
| Route | Description |
|-------|-------------|
| `/login` | Login page (Figma match) |
| `/register` | Register page |
| `/notes` | Notes list (Figma match, protected) |
| `/dashboard` | Dashboard (protected) |
