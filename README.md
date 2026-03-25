# 🚀 Venture CRM

A modern, full-stack CRM (Customer Relationship Management) application built with React, Node.js, and MongoDB. Features a beautiful dashboard with analytics, note management, user authentication, and a responsive design.

![Dashboard Preview](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Venture+CRM+Dashboard)

## ⚡ Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd fse-lab-exam

# Setup backend
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev

# Setup frontend (in a new terminal)
cd ../frontend/crm-frontend
npm install
npm run dev

# Open http://localhost:5173 in your browser
```

## ✨ Features

### 🎯 Currently Implemented
- **User Authentication**: Secure JWT-based login and registration
- **Note Management**: Full CRUD operations with status tracking
- **Dashboard Analytics**: Interactive charts and real-time statistics
- **Analytics Page**: Detailed insights with multiple chart types
- **Responsive Design**: Works seamlessly on all devices

### 📊 Analytics & Insights
- **Real-time Statistics**: Live data on notes, users, and activities
- **Interactive Charts**: Bar charts, pie charts, and line graphs
- **Trend Analysis**: Percentage changes and growth indicators
- **Daily Updates Feed**: Activity stream with timestamps

### 🎨 User Experience
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Component-Based**: Reusable, maintainable React components
- **Protected Routes**: Secure access control for authenticated users
- **Loading States**: Smooth user experience with loading indicators

### 🚧 Planned Features
- **Notifications System**: Real-time notifications and alerts
- **Task Management**: Create and track tasks with due dates
- **Email Integration**: Send and receive emails within the CRM
- **Calendar Integration**: Schedule and manage appointments
- **Contact Management**: Organize customer contacts
- **Company Profiles**: Manage company information
- **Third-party Integrations**: Connect with external services
- **Settings Panel**: User preferences and configuration

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful, responsive charts
- **Axios** - HTTP client for API calls
- **Lucide React** - Modern icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Testing & Quality
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright** - End-to-end testing
- **Jest** - Backend testing framework
- **Supertest** - API endpoint testing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd fse-lab-exam
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create environment file:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/venture-crm
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

### 3. Frontend Setup
```bash
cd ../frontend/crm-frontend
npm install
```

Create environment file (optional):
```bash
# .env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb/brew/mongodb-community

# On Windows
net start MongoDB

# On Linux
sudo systemctl start mongod
```

## 🎯 Usage

### Development Mode

1. **Start Backend Server**:
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

2. **Start Frontend Dev Server**:
```bash
cd frontend/crm-frontend
npm run dev
# App runs on http://localhost:5173
```

3. **Open Browser**:
Navigate to `http://localhost:5173` and register/login to start using the CRM.

### Production Build

1. **Build Frontend**:
```bash
cd frontend/crm-frontend
npm run build
```

2. **Start Backend**:
```bash
cd backend
npm start
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login, returns JWT | ❌ |
| GET | `/api/auth/profile` | Get current user profile | ✅ |

### Notes Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all user notes | ✅ |
| GET | `/api/notes/stats` | Get notes statistics | ✅ |
| POST | `/api/notes` | Create new note | ✅ |
| GET | `/api/notes/:id` | Get single note | ✅ |
| PUT | `/api/notes/:id` | Update note | ✅ |
| DELETE | `/api/notes/:id` | Delete note | ✅ |

### Request/Response Examples

**Register User**:
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Create Note**:
```bash
POST /api/notes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Meeting Notes",
  "description": "Discussed project timeline",
  "status": "Weekly",
  "dueDate": "2024-12-31"
}
```

## � Available Pages

| Route | Status | Description |
|-------|--------|-------------|
| `/login` | ✅ | User login page |
| `/register` | ✅ | User registration page |
| `/dashboard` | ✅ | Main dashboard with charts and stats |
| `/analytics` | ✅ | Detailed analytics and insights |
| `/notes` | ✅ | Notes management (CRUD operations) |
| `/notifications` | 🚧 | Notifications system (planned) |
| `/tasks` | 🚧 | Task management (planned) |
| `/emails` | 🚧 | Email integration (planned) |
| `/calendars` | 🚧 | Calendar integration (planned) |
| `/contacts` | 🚧 | Contact management (planned) |
| `/companies` | 🚧 | Company profiles (planned) |
| `/integrations` | 🚧 | Third-party integrations (planned) |
| `/settings` | 🚧 | User settings (planned) |

## �📁 Project Structure

```
fse-lab-exam/
├── backend/                    # Backend application
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Authentication middleware
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   └── server.js         # Express app entry
│   ├── tests/                # Backend tests
│   ├── package.json
│   └── README.md
├── frontend/
│   └── crm-frontend/         # Frontend application
│       ├── public/           # Static assets
│       ├── src/
│       │   ├── analytics/    # Analytics page
│       │   ├── auth/         # Authentication components
│       │   ├── dashboard/    # Dashboard components
│       │   ├── lib/          # API utilities
│       │   ├── notes/        # Notes management
│       │   ├── shared/       # Shared components
│       │   │   ├── layout/   # Layout components
│       │   │   └── ui/       # UI components
│       │   └── test/         # Test files
│       ├── package.json
│       └── README.md
└── README.md                 # This file
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Unit Tests
```bash
cd frontend/crm-frontend
npm test
```

### End-to-End Tests
```bash
cd frontend/crm-frontend
# Make sure both dev server and backend are running
npx playwright install chromium
npm run test:e2e
```

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Deploy to services like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the application:
```bash
npm run build
```
2. Deploy `dist/` folder to services like:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

### Environment Variables for Production
```env
# Backend
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_secret

# Frontend
VITE_API_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation as needed
- Use conventional commit messages
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Express.js](https://expressjs.com/) - Fast, unopinionated web framework
- [MongoDB](https://www.mongodb.com/) - A document database
- [Recharts](https://recharts.org/) - A composable charting library

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ by the Venture CRM Team**</content>
<parameter name="filePath">c:\fse-lab-exam\README.md