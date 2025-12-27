# 🚀 Todo App — PERN + JWT Auth + PWA

A full-stack **Todo Manager** built using the **PERN stack** (PostgreSQL, Express, React, Node.js) with:

- 🔐 **JWT Authentication** (HttpOnly cookies)
- 📌 **CRUD for Todos**
- 📦 Pagination (Server-side)
- ✔️ Task completion / edit / delete
- 🗄 PostgreSQL (Cloud DB)
- 💾 **PWA** — Offline Support & Installable
- 📱 Fully Responsive (Material UI + Tailwind)
- 🌐 Deployments: Netlify (Frontend) & Render (Backend)

---

## 📸 Live Demo

🔗 **App:** https://todo-app-pern.netlify.app  
🔗 **API:** https://todo-app-pern-3ddo.onrender.com/api/v1

---

## 🏗 Tech Stack

| Layer      | Technology |
|------------|-------------|
| Frontend   | React + Vite + MUI + Tailwind CSS |
| Backend    | Node.js + Express.js |
| Database   | PostgreSQL (Render Cloud) |
| Auth       | JWT + HttpOnly Cookies |
| Deployment | Netlify + Render |
| PWA        | vite-plugin-pwa + Workbox |

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone Project
```sh
git clone https://github.com/your-username/todo-pwa-app.git
cd todo-pwa-app
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```

Create `.env`:
```
PORT=5000
JWT_SECRET=your_secret
CORS_ORIGIN=http://localhost:5173
DATABASE_URL=postgresql://user:password@localhost:5432/todo_app
```

Start server:
```sh
npm run dev
```

---

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|--------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login user |
| GET | `/api/v1/todos` | Get todos |
| POST | `/api/v1/todos` | Create todo |
| PUT | `/api/v1/todos/:id` | Update todo |
| DELETE | `/api/v1/todos/:id` | Delete todo |
| DELETE | `/api/v1/todos` | Delete all todos |

---

## 📱 Progressive Web App (PWA)

This app supports:

✔ Installation Prompt  
✔ Offline Use  
✔ Home Screen Icon  
✔ Standalone Mode  

Build PWA:
```sh
npm run build
```

---

## 🔒 Auth Flow

```
Login ➜ Verify ➜ JWT ➜ HttpOnly Cookie → Protected Routes
```

---

## 🌐 Deployment

### Frontend (Netlify)
```sh
npm run build
```
Upload `/dist`

### Backend (Render)
Set environment variables:

```
PORT=10000
JWT_SECRET=your_secret
DATABASE_URL=your_render_db_url
CORS_ORIGIN=https://your-netlify-deployed-site.netlify.app
```

---

## ⭐ Future Enhancements

- Dark Mode
- Notifications
- Drag & Drop
- Analytics Dashboard

---

## 👨‍💻 Author

**Abhishek Vishwakarma**  
📌 Full Stack Developer

---

## ⭐ Give a Star!

If you like the project, please star ⭐ the repository! 🙂
