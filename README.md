# Student Hub - Student Record Management System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://student-hub-frontend-6994.onrender.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Fakruddin-Coder/Student-Hub)

> 🌐 **Live Deployed URL:** [https://student-hub-frontend-6994.onrender.com](https://student-hub-frontend-6994.onrender.com)

A sleek, modern, and responsive Student Record Management web application built with **React + Vite** and **Node.js + Express**. Designed with a professional blue-and-white theme, light/dark mode support, real-time statistics, search, and dynamic filtering.

---

## 1. Project Overview

**Student Hub** is a full-stack college assignment project created to demonstrate core full-stack web development principles:
- Component-based frontend architecture with React & Vite.
- RESTful API design using Node.js & Express.
- In-memory data management using native JavaScript arrays (no external database overhead).
- Cloud deployment readiness for platforms like Render.

---

## 2. Features

- **Professional Blue + White UI**: Clean, modern aesthetics tailored for academic and institutional usability.
- **Dark / Light Theme Toggle**: Persistent theme state with instant mode switching.
- **Real-Time Analytics & Stats**: Dynamic metrics for total students, year distributions, and course breakdowns.
- **Search & Filter Capabilities**:
  - Live search by student name, email, or course.
  - Dropdown filter by academic course.
  - Dropdown filter by academic year (1st, 2nd, 3rd, 4th).
- **Full CRUD Operations**:
  - **Create**: Add student with name, email, course, and year.
  - **Read**: View list of all enrolled students.
  - **Update**: Interactive edit modal to update student details.
  - **Delete**: Safe delete with confirmation dialog.
- **Responsive Layout**: Fully responsive across mobile, tablet, and desktop viewports.

---

## 3. Technologies Used

### Frontend
- **React 19**: Modern UI library utilizing hooks (`useState`, `useEffect`, `useMemo`).
- **Vite**: Ultra-fast build tool and local development server.
- **CSS3 / Vanilla CSS**: Custom styling, CSS variables, glassmorphism, responsive grid/flexbox layouts.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express 5**: Fast, minimalist web framework for RESTful APIs.
- **CORS**: Cross-Origin Resource Sharing middleware for seamless frontend-backend integration.
- **Dotenv**: Zero-dependency module that loads environment variables.

### Data Storage
- **JavaScript In-Memory Array**: Native array storage (`let students = []`) — strictly no database (no MongoDB, Firebase, SQL).

---

## 4. Project Structure

```text
Student-Hub/
├── backend/
│   ├── routes/
│   │   └── studentRoutes.js    # Express CRUD routes
│   ├── .env.example            # Sample environment configuration
│   ├── package.json            # Backend dependencies and scripts
│   └── server.js               # Main Express entry point
├── frontend/
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── App.css             # Main application styling & themes
│   │   ├── App.jsx             # Root React component with full logic
│   │   ├── index.css           # Global typography & base rules
│   │   └── main.jsx            # React root mount
│   ├── .env.example            # Sample frontend environment config
│   ├── index.html              # HTML shell
│   ├── package.json            # Frontend dependencies and scripts
│   └── vite.config.js          # Vite build configuration
├── .gitignore                  # Root git ignore rules
├── render.yaml                 # Render Blueprint deployment configuration
└── README.md                   # Project documentation
```

---

## 5. How the Frontend Works

- The frontend is built as a Single Page Application (SPA) using React.
- State is managed using standard React hooks (`useState`, `useMemo`, `useEffect`).
- On initial mount, `useEffect` triggers `getStudents()` which sends an asynchronous `fetch` request to the backend.
- The base API endpoint is dynamically determined:
  ```javascript
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/students";
  ```
- Filtering and search are computed in real time using `useMemo` for optimal performance.
- Theme preference (`light` or `dark`) is stored in browser `localStorage` under the key `studenthub-theme`.

---

## 6. How the Backend Works

- The Express server acts as a REST API provider.
- In `server.js`, CORS is enabled to allow incoming requests from the frontend origin.
- Incoming JSON request bodies are parsed using `express.json()`.
- Route handling is encapsulated within `routes/studentRoutes.js`.
- The server binds dynamically to `process.env.PORT || 5000` on host `0.0.0.0` for full cloud compatibility:
  ```javascript
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
  });
  ```

---

## 7. API Endpoints

All endpoints are prefixed with `/api/students`:

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | Root health check | None | `"Student Record System Backend Running"` |
| **GET** | `/api/students` | Get all students | None | `200 OK` (Array of student objects) |
| **POST** | `/api/students` | Add a new student | `{ name, email, course, year }` | `201 Created` (`{ message, student }`) |
| **PUT** | `/api/students/:id` | Update an existing student | `{ name, email, course, year }` | `200 OK` (`{ message, student }`) |
| **DELETE** | `/api/students/:id` | Remove a student | None | `200 OK` (`{ message, student }`) |

---

## 8. Local Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (bundled with Node.js)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Fakruddin-Coder/Student-Hub.git
cd Student-Hub
```

### Step 2: Start the Backend
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:5000`.

### Step 3: Start the Frontend
In a new terminal window/tab:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 9. Environment Variable Setup

### Frontend (`frontend/.env`)
Copy the example file:
```bash
cp frontend/.env.example frontend/.env
```
Contents:
```env
VITE_API_URL=http://localhost:5000/api/students
```

> **For Production**: When deploying the frontend, `VITE_API_URL` must point to your deployed backend URL:
> ```env
> VITE_API_URL=https://<your-backend-service-name>.onrender.com/api/students
> ```

### Backend (`backend/.env`)
Copy the example file:
```bash
cp backend/.env.example backend/.env
```
Contents:
```env
PORT=5000
```

---

## 10. Render Deployment Instructions

The repository includes a ready-to-use `render.yaml` Blueprint to deploy both the backend and frontend simultaneously.

### Option A: Deploy via Render Blueprint (Recommended)
1. Push this repository to your GitHub account (`https://github.com/Fakruddin-Coder/Student-Hub.git`).
2. Log in to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** → **Blueprint**.
4. Connect the `Student-Hub` repository.
5. Render will detect `render.yaml` and configure both services:
   - **Backend Web Service**: Node.js web service running from `backend/`.
   - **Frontend Static Site**: Static site running from `frontend/`.
6. Once the backend is deployed, copy its URL (e.g. `https://student-hub-backend.onrender.com`).
7. In the frontend service settings on Render, set environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://student-hub-backend.onrender.com/api/students`
8. Trigger a manual redeploy of the frontend so Vite bundles the production backend URL.

### Option B: Deploy Manually

#### Backend Web Service:
- **Type**: Web Service
- **Name**: `student-hub-backend`
- **Root Directory**: `backend`
- **Environment / Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

#### Frontend Static Site:
- **Type**: Static Site
- **Name**: `student-hub-frontend`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variables**:
  - `VITE_API_URL` = `https://<your-backend-service>.onrender.com/api/students`
- **Redirects / Rewrites**:
  - Source: `/*`
  - Destination: `/index.html`
  - Action: Rewrite

---

## 11. Important Note on In-Memory Data Storage

> **College Assignment Specification**:
> This project intentionally stores all student records in an **in-memory JavaScript array** (`let students = []`) inside `backend/routes/studentRoutes.js`.
>
> - **No external database** (MongoDB, Firebase, MySQL, PostgreSQL, etc.) is connected.
> - Data operations happen in the memory of the running Node.js process.

---

## 12. Important Note on Data Persistence

> **Data Reset Behavior**:
> Because data is stored in memory:
> - Any time the backend server restarts, crashes, spins down due to inactivity (on Render's Free tier), or is redeployed, the data resets to the initial empty state.
> - This is expected and intended behavior for this assignment.

---

## 13. Future Improvements

- Persistent storage integration (e.g., MongoDB, PostgreSQL, SQLite).
- Student avatar / profile image uploads.
- Export student records to CSV / PDF.
- Role-based access control (Admin vs. Student view).
- Pagination for large student datasets.

---

## 14. Author & Live Links

- **Author**: Fakruddin ([@Fakruddin-Coder](https://github.com/Fakruddin-Coder))
- **Live Deployed Web Application**: [https://student-hub-frontend-6994.onrender.com](https://student-hub-frontend-6994.onrender.com)
- **Repository**: [https://github.com/Fakruddin-Coder/Student-Hub.git](https://github.com/Fakruddin-Coder/Student-Hub.git)
- **License**: MIT
