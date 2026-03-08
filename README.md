# 🎬 Netflix Login Clone

A full-stack Netflix login page clone built with **React + Vite** (frontend) and **Node.js + Express** (backend).

---

## 📁 Project Structure

```
netflix-login/
├── backend/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── assets/
        │   ├── logo.png
        │   ├── bg.jpg
        │   └── (show images...)
        └── pages/
            ├── Login.jsx
            ├── Login.css
            ├── Signup.jsx
            ├── Signup.css
            ├── Dashboard.jsx
            └── Dashboard.css
```

---

## 🚀 Getting Started

### Step 1 — Start the Backend

```bash
cd netflix-login/backend
npm install
npm run dev
```

Backend runs at → **http://localhost:5000**

### Step 2 — Start the Frontend

Open a second terminal:

```bash
cd netflix-login/frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

> ⚠️ Both terminals must be running at the same time.

---

## ✨ Features

### 🔐 Authentication
- Sign up with name, email, and password
- Login with registered credentials
- Sign out with confirmation popup
- Protected dashboard route (redirects to login if not authenticated)
- User session stored in `sessionStorage`

### 📋 Login Page
- Netflix-accurate UI with floating labels
- Show / Hide password toggle
- Remember me checkbox
- Frontend validation (empty fields, email format, password length 4–60 chars)
- Orange error banner with shake animation on invalid login
- Loading spinner during API call
- Link to Sign Up page

### 📝 Sign Up Page
- Full name, email, password, confirm password fields
- Password match validation
- Redirects to login after successful account creation

### 🎬 Dashboard
- Netflix-style navbar (hides on scroll down, reappears on scroll up)
- Profile dropdown with sign out confirmation modal
- Hero banner section
- Horizontal scrollable content rows
- Card hover zoom with overlay (play button, add button, match %, rating, seasons)
- Welcome message with logged-in user's full name

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, React Router |
| Styling | Plain CSS (Netflix design) |
| HTTP Client | Axios |
| Backend | Node.js, Express |
| Auth | In-memory mock (no database) |

---

## 📡 API Reference

### `POST /api/signup`

**Request:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "pass123" }
```

**Success (201):**
```json
{ "success": true, "user": { "name": "John Doe", "email": "john@example.com" } }
```

**Error (409):**
```json
{ "success": false, "message": "An account with this email already exists." }
```

---

### `POST /api/login`

**Request:**
```json
{ "email": "john@example.com", "password": "pass123" }
```

**Success (200):**
```json
{ "success": true, "user": { "name": "John Doe", "email": "john@example.com" } }
```

**Error (401):**
```json
{ "success": false, "message": "Incorrect email or password." }
```

---

## 🖼️ Adding Show Images

Place images in `frontend/src/assets/` and update the `GENRES` array in `Dashboard.jsx`:

```jsx
{ title: 'Stranger Things', rating: '16+', seasons: '4 Seasons', image: '/src/assets/stranger-things.jpg' }
```

Recommended card image size: **180 × 280px** (portrait ratio)

---

## ⚠️ Notes

- User accounts are stored **in memory** — they reset every time the backend restarts
- No database is used — this is a mock authentication system
- Both frontend and backend servers must be running simultaneously
