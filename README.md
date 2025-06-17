# 📝 Task Manager

A full-stack **Task Manager** application built with **Next.js** (frontend), **Express.js** (backend), and **PostgreSQL** (database). It allows users to create, complete, and delete tasks through a responsive web UI.

---

## 📁 Project Structure

```
task-manager/
│
├── backend/                   # Express backend
│   ├── routes/tasks.js        # API routes (CRUD)
│   ├── db.js                  # PostgreSQL connection
│   ├── index.js               # App entry point
│   └── schema.sql             # DB schema setup
│
└── frontend/frontend/         # Next.js frontend
    ├── app/page.tsx           # Main UI component
    ├── app/layout.tsx         # Layout
    └── app/globals.css        # Styling
```

---

## 🔍 Why This Project Structure?

The frontend and backend are organized as independent modules to simplify development, testing, and deployment. This modular design promotes **scalability**, allows easy **CI/CD integration**, and makes it possible to deploy the backend separately (e.g., on Render/Railway) and the frontend on platforms like Vercel.

---

## ⚙️ How Frontend and Backend Are Separated

- **Frontend (Next.js)** handles routing, UI, and API calls.
- **Backend (Express)** provides RESTful APIs and communicates with PostgreSQL.
- Communication happens via HTTP requests from frontend to backend at `http://localhost:3001/api/tasks`.

This separation ensures clean, maintainable code and allows independent upgrades.

---

## 🚀 API Documentation

All API endpoints return JSON and use base URL: `http://localhost:3001/api/tasks`

### 🔹 1. Get All Tasks
- **Endpoint**: `GET /api/tasks`
- **Response**:
```json
[
  { "id": 1, "title": "Read book", "completed": false },
  { "id": 2, "title": "Buy groceries", "completed": true }
]
```

### 🔹 2. Add New Task
- **Endpoint**: `POST /api/tasks`
- **Request Body**:
```json
{ "title": "Learn SQL" }
```
- **Response**:
```json
{ "id": 3, "title": "Learn SQL", "completed": false }
```

### 🔹 3. Toggle Task Completion
- **Endpoint**: `PUT /api/tasks/:id`
- **Response**:
```json
{ "message": "Task updated" }
```

### 🔹 4. Delete Task
- **Endpoint**: `DELETE /api/tasks/:id`
- **Response**:
```json
{ "message": "Task deleted" }
```

---

## 🧰 Steps to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/setiyaayush/task-manager.git
cd task-manager
```

### 2. Setup PostgreSQL

Ensure PostgreSQL is installed and running.

```bash
createdb task_manager
psql -d task_manager -f backend/schema.sql
```

If needed, create a `.env` file in `backend/`:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=task_manager
DB_PASSWORD=postgres
DB_PORT=5432
```

---

### 3. Run the Backend

```bash
cd backend
npm install
npm run dev
# Server runs at http://localhost:3001
```

---

### 4. Run the Frontend

```bash
cd frontend/frontend
npm install
npm run dev
# App runs at http://localhost:3000
```

Make sure `API_URL` in `frontend/frontend/app/page.tsx` is set to `http://localhost:3001`.

---

## ❗ How Errors and Edge Cases Are Handled

- API routes return proper status codes (`400`, `404`, `500`) with descriptive messages.
- Input validation checks for empty task titles or malformed requests.
- Try-catch blocks are used to handle DB or server errors gracefully.
- Logs are printed to the console for debugging.

> 💡 In production, you'd integrate Winston or Morgan for structured logging.

---

## 🔐 What Security Features I'd Add in Production

- ✅ Input sanitization using libraries like `express-validator`
- ✅ Rate limiting with `express-rate-limit` to prevent abuse
- ✅ Enable CORS with proper origin restrictions
- ✅ Use HTTPS for secure communication
- ✅ Authentication (JWT/session-based) to manage users
- ✅ Escape SQL injections with parameterized queries (already handled with `pg`)

---

## ⏳ What I'd Improve With 1 Full Day

If given one more day, I would:
- ✅ Add user authentication (sign-up/login) with hashed passwords
- ✅ Build a dashboard with user-specific tasks
- ✅ Implement optimistic UI for better UX
- ✅ Add unit tests using Jest for APIs
- ✅ Deploy the full-stack app on Vercel + Render with live link

---

## 🌍 Optional Deployment

- **Frontend** can be deployed on [Vercel](https://vercel.com/)
- **Backend** can be deployed on [Render](https://render.com/) or [Railway](https://railway.app/)

Update environment variables and CORS rules for deployed URLs.

---

## 📜 License

This project is open-source under the **MIT License** – feel free to use and modify.

---

## 🙌 Thanks for checking it out!