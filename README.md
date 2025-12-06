# VoiceIT - Voice-Enabled Task Management System

A modern, full-stack task management application that allows users to create, manage, and track tasks through both traditional UI and innovative voice commands. Built with React, Express.js, MongoDB, and Web Audio APIs.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
  - [Development](#development)
  - [Production](#production)
- [API Documentation](#api-documentation)
  - [Authentication Endpoints](#authentication-endpoints)
  - [Task Endpoints](#task-endpoints)
- [Project Architecture](#project-architecture)
- [Key Features Explanation](#key-features-explanation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

✅ **User Authentication** - Secure JWT-based authentication with password hashing  
✅ **Voice Input** - Create and manage tasks using voice commands  
✅ **Task Management** - Full CRUD operations with filtering and search  
✅ **Task Priority & Status** - Organize tasks by priority (low/medium/high) and status (todo/in-progress/done)  
✅ **Responsive UI** - Material-UI based modern frontend with React  
✅ **Real-time Updates** - Instant task synchronization  
✅ **Secure API** - Protected endpoints with JWT middleware  
✅ **MongoDB Persistence** - Reliable data storage with Mongoose ODM

---

## Project Structure

```
VoiceIT/
├── backend/                    # Express.js server
│   ├── src/
│   │   ├── server.js          # Main server configuration
│   │   ├── auth.routes.js     # Authentication endpoints
│   │   ├── auth.middleware.js # JWT verification middleware
│   │   ├── tasks.routes.js    # Task CRUD endpoints
│   │   ├── task.model.js      # Task MongoDB schema
│   │   ├── user.model.js      # User MongoDB schema
│   ├── package.json
│   ├── .env                    # Backend environment variables
│   └── .gitignore
│
├── frontend/                   # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Header.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskFormModal.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── todoContainer.jsx
│   │   │   └── VoiceInputModal.jsx
│   │   ├── context/           # React Context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   └── TasksContext.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── homePage.jsx
│   │   │   ├── login.jsx
│   │   │   └── signupPage.jsx
│   │   ├── services/          # API service modules
│   │   │   ├── auth.js
│   │   │   └── tasksApi.js
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── useVoiceInput.js
│   │   ├── utils/             # Utility functions
│   │   │   ├── parseVoiceTask.js
│   │   │   ├── protectedRoutes.jsx
│   │   │   └── publicOnly.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .env                    # Frontend environment variables
│   └── .gitignore
│
└── README.md
```

---

## Tech Stack

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 4.22.x
- **Database**: MongoDB 8.0.x with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken 9.0.x)
- **Security**: bcryptjs 3.0.x, CORS, Cookie-parser
- **Logging**: Morgan
- **Development**: Nodemon

### Frontend
- **Framework**: React 18.3.x
- **Build Tool**: Vite 7.2.x
- **Routing**: React Router DOM 7.10.x
- **UI Library**: Material-UI 5.18.x
- **HTTP Client**: Axios 1.13.x
- **Styling**: Styled Components 6.1.x
- **Utilities**: date-fns 4.1.x
- **Linting**: ESLint 8.57.x

---

## Prerequisites

Before installation, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v7 or higher) - Comes with Node.js
- **MongoDB** (Local or Atlas) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version    # v16.x or higher
npm --version     # v7.x or higher
```

---

## Installation

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `backend/` directory:
   ```bash
   # Copy the content from the Configuration section below
   ```

4. **Verify the setup:**
   ```bash
   npm run dev
   ```
   You should see: `Server running on http://localhost:5000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** in the `frontend/` directory:
   ```bash
   # Copy the content from the Configuration section below
   ```

4. **Verify the setup:**
   ```bash
   npm run dev
   ```
   You should see: `Local: http://localhost:5173`

---

## Configuration

### Environment Variables

#### Backend `.env` (Required)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/voice_tasks

# JWT Secret (Generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

**For Production:**
```env
PORT=5000
NODE_ENV=production

# Use MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/voice_tasks?retryWrites=true&w=majority

# Generate a strong JWT secret
JWT_SECRET=your_long_random_secret_key_32_characters_minimum

# Your production domain
CLIENT_URL=https://yourdomain.com
```

#### Frontend `.env` (Required)

```env
# Development
VITE_API_URL=http://localhost:5000

# Production (uncomment and update)
# VITE_API_URL=https://api.yourdomain.com
```

### Generating a Strong JWT Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

---

## Running the Application

### Development

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Access the application at: **http://localhost:5173**

### Production

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Backend (Production Mode):**
```bash
cd backend
NODE_ENV=production npm start
```

---

## API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://api.yourdomain.com`

### Authentication Flow

All protected endpoints require a valid JWT token sent via HTTP-Only cookies. The authentication system uses:
- **Login/Signup**: Issues a JWT token stored in HTTP-Only cookies
- **Cookie Name**: `token`
- **Token Expiry**: 7 days
- **Secure Flag**: Enabled in production

---

### Authentication Endpoints

#### 1. Sign Up

Create a new user account.

**Request:**
```http
POST /auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Email already exists
- `500 Server Error` - Server error

---

#### 2. Login

Authenticate user and receive a token.

**Request:**
```http
POST /auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `400 Bad Request` - User not found or incorrect password
- `500 Server Error` - Server error

---

#### 3. Get Current User

Retrieve the authenticated user's information.

**Request:**
```http
GET /auth/me
Cookie: token=<your_jwt_token>
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - No valid token provided

---

#### 4. Logout

Clear the authentication token.

**Request:**
```http
POST /auth/logout
Cookie: token=<your_jwt_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out"
}
```

---

### Task Endpoints

#### 5. Get All Tasks

Retrieve all tasks with optional filtering.

**Request:**
```http
GET /api/tasks?status=todo&priority=high&q=important
Cookie: token=<your_jwt_token>
```

**Query Parameters (Optional):**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | String | Filter by status: `todo`, `in-progress`, `done` |
| `priority` | String | Filter by priority: `low`, `medium`, `high` |
| `q` | String | Search in title and description (case-insensitive) |

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-12-31T23:59:59.000Z",
    "createdAt": "2024-12-01T10:00:00.000Z",
    "updatedAt": "2024-12-05T14:30:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Review pull requests",
    "description": "Check and review pending PRs",
    "status": "todo",
    "priority": "medium",
    "dueDate": null,
    "createdAt": "2024-12-02T09:30:00.000Z",
    "updatedAt": "2024-12-02T09:30:00.000Z"
  }
]
```

---

#### 6. Get Task by ID

Retrieve a single task by its ID.

**Request:**
```http
GET /api/tasks/507f1f77bcf86cd799439011
Cookie: token=<your_jwt_token>
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "createdAt": "2024-12-01T10:00:00.000Z",
  "updatedAt": "2024-12-05T14:30:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Task not found
- `400 Bad Request` - Invalid task ID format

---

#### 7. Create Task

Create a new task.

**Request:**
```http
POST /api/tasks
Content-Type: application/json
Cookie: token=<your_jwt_token>

{
  "title": "Fix login bug",
  "description": "Users unable to login with special characters in password",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-15T00:00:00Z"
}
```

**Request Body Fields:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | ✅ Yes | Task title (must be a non-empty string) |
| `description` | String | ❌ No | Task description (default: empty string) |
| `status` | String | ❌ No | One of: `todo`, `in-progress`, `done` (default: `todo`) |
| `priority` | String | ❌ No | One of: `low`, `medium`, `high` (default: `medium`) |
| `dueDate` | ISO String | ❌ No | Due date in ISO 8601 format (default: null) |

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Fix login bug",
  "description": "Users unable to login with special characters in password",
  "status": "todo",
  "priority": "high",
  "dueDate": "2024-12-15T00:00:00.000Z",
  "createdAt": "2024-12-06T10:15:00.000Z",
  "updatedAt": "2024-12-06T10:15:00.000Z"
}
```

**Error Responses:**
- `400 Bad Request` - Title is required or invalid format
- `500 Server Error` - Failed to create task

---

#### 8. Update Task

Update an existing task (all fields optional).

**Request:**
```http
PUT /api/tasks/507f1f77bcf86cd799439013
Content-Type: application/json
Cookie: token=<your_jwt_token>

{
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2024-12-20T00:00:00Z"
}
```

**Request Body Fields (Optional):**
| Field | Type | Description |
|-------|------|-------------|
| `title` | String | Updated task title |
| `description` | String | Updated task description |
| `status` | String | One of: `todo`, `in-progress`, `done` |
| `priority` | String | One of: `low`, `medium`, `high` |
| `dueDate` | ISO String | Updated due date or null to clear |

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "title": "Fix login bug",
  "description": "Users unable to login with special characters in password",
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "2024-12-20T00:00:00.000Z",
  "createdAt": "2024-12-06T10:15:00.000Z",
  "updatedAt": "2024-12-06T11:45:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` - Task not found
- `400 Bad Request` - Invalid task ID or update data
- `500 Server Error` - Failed to update task

---

#### 9. Delete Task

Delete a task by its ID.

**Request:**
```http
DELETE /api/tasks/507f1f77bcf86cd799439013
Cookie: token=<your_jwt_token>
```

**Response (200 OK):**
```json
{
  "message": "Task deleted"
}
```

**Error Responses:**
- `404 Not Found` - Task not found
- `400 Bad Request` - Invalid task ID
- `500 Server Error` - Failed to delete task

---

### Health Check Endpoint

Check if the server is running.

**Request:**
```http
GET /health
```

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

---

## Project Architecture

### Backend Architecture

```
Express.js Server
├── CORS & Security Middleware
├── Routes
│   ├── /auth (Authentication)
│   │   ├── POST /signup
│   │   ├── POST /login
│   │   ├── POST /logout
│   │   └── GET /me
│   └── /api/tasks (Task CRUD)
│       ├── GET / (all tasks with filters)
│       ├── GET /:id
│       ├── POST / (create)
│       ├── PUT /:id (update)
│       └── DELETE /:id
└── MongoDB Database
    ├── users collection
    └── tasks collection
```

### Frontend Architecture

```
React Application (Vite)
├── Context API (Global State)
│   ├── AuthContext (User authentication)
│   └── TasksContext (Task management)
├── Pages
│   ├── Login Page
│   ├── Signup Page
│   └── Home Page (Main dashboard)
├── Components
│   ├── Header
│   ├── TaskBoard (Kanban-style board)
│   ├── TaskList
│   ├── TaskCard
│   ├── TaskFormModal
│   └── VoiceInputModal (Voice command interface)
├── Services (API Layer)
│   ├── auth.js (Authentication API calls)
│   └── tasksApi.js (Task API calls)
└── Utilities
    ├── Voice input parsing
    ├── Protected routes
    └── Public-only routes
```

---

## Key Features Explanation

### 1. Voice Input Integration

The `useVoiceInput` hook provides voice command capabilities:
- Uses Web Audio API for recording
- Processes voice input through `parseVoiceTask` utility
- Converts speech to structured task data
- Creates tasks with automatic parsing of priority and status

### 2. Task Filtering & Search

Users can filter tasks by:
- **Status**: todo, in-progress, done
- **Priority**: low, medium, high
- **Search**: Full-text search on title and description

### 3. JWT Authentication

- Stateless authentication using JWT tokens
- Tokens stored in HTTP-Only cookies (secure against XSS)
- 7-day expiration
- Automatic token refresh on login

### 4. Protected Routes

- Frontend routes protected via `protectedRoutes.jsx`
- Backend endpoints secured with `auth.middleware.js`
- Unauthorized requests return 401 status

---

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB service is running
- Check `MONGO_URI` in `.env` file
- Verify MongoDB credentials if using Atlas

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Frontend Issues

**CORS Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Verify `CLIENT_URL` in backend `.env` matches your frontend URL
- Check `VITE_API_URL` in frontend `.env`
- Ensure credentials are included in API calls

**Blank Page on Startup:**
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
npm run dev
```

### Authentication Issues

**Token Not Persisting:**
- Ensure cookies are enabled in browser
- Check that `SECURE` flag is appropriate for your environment
- Verify same-site cookie policy matches your setup

**"Invalid Token" Error:**
- Token may have expired (7 days)
- Clear cookies and login again
- Verify `JWT_SECRET` is consistent across restarts

---

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Commit changes**: `git commit -m 'Add your feature'`
4. **Push to branch**: `git push origin feature/your-feature`
5. **Submit a Pull Request**

### Code Standards

- Use ES6+ syntax
- Follow existing code style
- Add meaningful commit messages
- Test changes before submitting PR

---

## Deployment Guide

### Deploy Backend (Example: Heroku)

```bash
# Set environment variables on Heroku
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGO_URI=your_mongo_atlas_uri
heroku config:set CLIENT_URL=https://yourfrontend.com

# Deploy
git push heroku main
```

### Deploy Frontend (Example: Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Update `VITE_API_URL` to point to your production backend.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---

## Changelog

### Version 1.0.0
- Initial release
- Authentication system (signup/login/logout)
- Full task CRUD operations
- Voice input integration
- Task filtering and search
- Material-UI responsive design

---

**Maintainer**: VoiceIT Team
