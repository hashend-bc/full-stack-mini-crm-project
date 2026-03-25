# Venture CRM — Backend

Node.js + Express + MongoDB REST API for the Venture CRM module.

## Stack
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs (auth)
- express-validator (validation)
- Jest + Supertest (tests)

## Setup

```bash
cd backend
npm install
```

### Environment
Copy `.env.example` to `.env` and update values:
```bash
copy .env.example .env
```

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/venture-crm
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

> Requires MongoDB running locally or provide a MongoDB Atlas URI.

### Run dev server
```bash
npm run dev
# → http://localhost:5000
```

### Run tests
```bash
npm test
```

## API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/auth/profile` | Yes | Get current user |

### Notes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notes` | Yes | Get all notes |
| POST | `/api/notes` | Yes | Create note |
| GET | `/api/notes/:id` | Yes | Get single note |
| PUT | `/api/notes/:id` | Yes | Update note |
| DELETE | `/api/notes/:id` | Yes | Delete note |

All protected endpoints require `Authorization: Bearer <token>` header.

## Folder Structure
```
src/
├── config/         # DB connection
├── controllers/    # authController, notesController
├── middleware/     # JWT auth middleware
├── models/         # User, Note schemas
├── routes/         # auth, notes routes
└── server.js       # Express app entry
```
