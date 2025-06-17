# Task Manager

A full-stack Task Manager application built with Next.js (frontend) and Express.js (backend) using PostgreSQL for data storage.

## Project Structure

- **Frontend**: Next.js app located in `frontend/frontend/`
- **Backend**: Express.js server located in `backend/`
- **Database**: PostgreSQL database named `task_manager`

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure PostgreSQL

- Ensure PostgreSQL is installed and running.
- Create a database named `task_manager`:
  ```bash
  createdb task_manager
  ```
- Initialize the database schema:
  ```bash
  psql -d task_manager -f schema.sql
  ```

#### Configure Database Connection

- The backend uses the `pg` package to connect to PostgreSQL.
- The connection settings are in `backend/db.js`. By default, it uses:
  - User: `postgres`
  - Host: `localhost`
  - Database: `task_manager`
  - Password: `postgres`
  - Port: `5432`
- You can customize these settings by creating a `.env` file in the `backend` directory with the following content:
  ```
  DB_USER=postgres
  DB_HOST=localhost
  DB_NAME=task_manager
  DB_PASSWORD=postgres
  DB_PORT=5432
  ```
- Adjust the values as needed for your environment.

#### Start the Backend Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`.

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend/frontend
npm install
```

#### Configure API URL

- The frontend connects to the backend API at `http://localhost:3001`.
- If your backend runs on a different port or host, update the `API_URL` in `frontend/frontend/app/page.tsx`.

#### Start the Frontend Server

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`.

## Running the Application

1. **Start the Backend:**
   - Navigate to the `backend` directory and run:
     ```bash
     npm run dev
     ```
   - The backend server will start on `http://localhost:3001`.

2. **Start the Frontend:**
   - Navigate to the `frontend/frontend` directory and run:
     ```bash
     npm run dev
     ```
   - The frontend will start on `http://localhost:3000`.

3. **Access the Application:**
   - Open your browser and go to `http://localhost:3000`.
   - You should see the Task Manager interface where you can add, toggle, and delete tasks.

## Making Changes

### Backend Changes

- The backend is built with Express.js. The main files are:
  - `backend/index.js`: Entry point and server setup.
  - `backend/routes/tasks.js`: API routes for task operations.
  - `backend/db.js`: PostgreSQL connection configuration.
  - `backend/schema.sql`: Database schema.

- To modify the API or database logic, edit the corresponding files and restart the backend server.

### Frontend Changes

- The frontend is built with Next.js. The main files are:
  - `frontend/frontend/app/page.tsx`: Main page component with task management logic.
  - `frontend/frontend/app/globals.css`: Global styles.
  - `frontend/frontend/app/layout.tsx`: Root layout component.

- To modify the UI or frontend logic, edit the corresponding files. The changes will be reflected immediately due to hot reloading.

## Troubleshooting

- **Backend Issues:**
  - If the backend fails to start, check the console for errors. Common issues include:
    - PostgreSQL not running.
    - Incorrect database credentials.
    - Port 3001 already in use (use `lsof -i :3001` to find and kill the process).

- **Frontend Issues:**
  - If the frontend fails to connect to the backend, check:
    - The backend server is running.
    - The `API_URL` in `frontend/frontend/app/page.tsx` is correct.
    - CORS is properly configured in the backend.

## License

This project is licensed under the MIT License.