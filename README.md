# Smart Leads Dashboard

## Overview

Smart Leads Dashboard is a full-stack Lead Management System built using the MERN stack (MongoDB, Express, React, Node.js). It includes authentication, role-based access control, lead management, search, filtering, CSV export, and Docker support for deployment.

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Role-based access control (Admin, Sales User)

### Lead Management
- Create, read, update, and delete leads
- Pagination for large datasets
- Debounced search for optimized performance
- Filter leads by status (New, Contacted, Qualified, Lost)

### Role-Based Access Control
- Admin users:
  - Full access to create, update, and delete leads
- Sales users:
  - Read-only access to dashboard

### Data Export
- Export leads data to CSV format

### UI Features
- Responsive dashboard layout
- Dark mode support
- Clean and minimal table-based UI

### DevOps
- Docker support for frontend and backend
- Docker Compose for multi-container setup

---

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Axios
- React Hooks
- Custom hooks (Debounce)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt.js

### DevOps
- Docker
- Docker Compose

---


---

## Installation and Setup

### Clone Repository
```bash
git clone <repository-url>
cd smart-leads-dashboard

Backend Setup
cd backend
npm install
npm run dev

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Frontend Setup
cd frontend
npm install
npm run dev
Docker Setup
Run with Docker Compose
docker compose up --build
Access URLs

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Leads
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id

Role Permissions
Admin
Full access to all operations
Sales User
Read-only access to leads

Future Improvements
Email notifications
Analytics dashboard
Lead assignment system
Real-time updates using WebSockets