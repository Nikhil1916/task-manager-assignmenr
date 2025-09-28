# 📝 MEAN Task Management Application

A full-stack **MEAN** application (MongoDB • Express • Angular • Node) with
real-time task updates using **Socket.IO**.  
Users can **register, login, create, update, delete and filter tasks**.
Any change in tasks is broadcast instantly to all connected clients.
included env file in the project itself for direct run
---

## ✨ Features
- User authentication with JWT
- CRUD task management
- Real-time updates with Socket.IO
- Angular frontend with filtering and validation
- TypeScript across backend and frontend

---

## ⚡ Quick Start

**Run**  
clone both client and backend do `npm i` and then run them  
client: `ng serve`  
backend: `npm run dev`  
deployment on url got left due to office work

---

## 🧪 API Endpoints
| Method | Endpoint | Description |
|------- |--------- |-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login`    | Login and receive JWT |
| GET  | `/api/tasks`         | Get all tasks for logged in user |
| POST | `/api/tasks`         | Create a new task |
| PATCH| `/api/tasks/:id`     | Update a task |
| DELETE| `/api/tasks/:id`    | Delete a task |

All task routes require a valid JWT in the `Authorization` header.

---

## 🔌 Real-Time Events
Server emits:
