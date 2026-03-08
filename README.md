# 🎬 Netflix Login Clone

A full-stack Netflix login page clone built with **React + Vite** (frontend) and **Node.js + Express** (backend), deployed on **Vercel**.

🔗 **Live Site:** https://netflix-login-tawny.vercel.app

---

## 📁 Project Structure

```
netflix-login/
├── api/                        ← Vercel serverless functions
│   ├── login.js
│   └── signup.js
├── backend/                    ← Local development server
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── assets/             ← Show images & background
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── assets/
│       │   └── logo.png
│       └── pages/
│           ├── Login.jsx
│           ├── Login.css
│           ├── Signup.jsx
│           ├── Signup.css
│           ├── Dashboard.jsx
│           └── Dashboard.css
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started (Local)

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

> ⚠️ Both terminals must be running at the same time for local development.

---

## 🌐 Deployment

The app is deployed on **Vercel** with serverless API functions.

| Layer | Service |
|---|---|
| Frontend | Vercel (auto-deploy from GitHub) |
| Backend API | Vercel Serverless Functions (`/api` folder) |
| User Storage | Browser `localStorage` |

### Vercel Settings
| Setting | Value |
|---|---|
| Root Directory | ` ` (blank) |
| Build Command | `cd frontend && npm install && npm run build` |
| Output Directory | `frontend/dist` |

---

## ✨ Features

### 🔐 Authentication
- Sign up with full name, email, and password
- Login with registered credentials
- Duplicate email detection on signup
- Sign out with confirmation popup
- Protected dashboard (redirects to login if not authenticated)
- User session stored in `sessionStorage`
- User accounts stored in `localStorage`

### 📋 Login Page
- Netflix-accurate UI with floating labels
- Show / Hide password toggle
- Remember me checkbox
- Frontend validation (empty fields, email format, password length)
- Orange error banner with shake animation
- Loading spinner during submission
- Link to Sign Up page

### 📝 Sign Up Page
- Full name, email, password, confirm password fields
- Password match validation
- Redirects to login after successful account creation

### 🎬 Dashboard
- Netflix-style navbar (hides on scroll down, reappears on scroll up)
- Profile dropdown with sign out confirmation modal
- Hero banner section
- Horizontal scrollable content rows with show cards
- Card hover zoom with overlay (play, add, match %, rating, seasons)
- Card title hides on hover
- Welcome message with logged-in user's full name

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 6, React Router |
| Styling | Plain CSS (Netflix design) |
| Backend (local) | Node.js, Express |
| Backend (production) | Vercel Serverless Functions |
| Auth | localStorage (no database) |

---

## 🖼️ Adding Show Images

Place images in `frontend/public/assets/` and update the `GENRES` array in `Dashboard.jsx`:

```jsx
{ title: 'Stranger Things', rating: '16+', seasons: '4 Seasons', image: '/assets/stranger-things.jpg' }
```

Recommended card image size: **180 × 280px** (portrait ratio)

---

## ⚠️ Notes

- User accounts persist in the browser's `localStorage` — clearing browser data will remove accounts
- The backend `server.js` is only used for local development
- On production (Vercel), authentication is handled entirely by serverless functions and localStorage
