🚀 Todo App — PERN + JWT Auth + PWA

A full-stack Todo Manager built using the PERN stack (PostgreSQL, Express, React, Node.js) with:

🔐 JWT Authentication (HttpOnly cookies)

📌 CRUD for Todos

📦 Pagination (Server-side)

✔️ Task completion / edit / delete

🗄 PostgreSQL (Cloud DB)

💾 PWA — Offline Support & Installable

📱 Fully Responsive (Material UI + Tailwind)

🌐 Deployments: Netlify (Frontend) & Render (Backend)

📸 Screenshot / Demo Link

🔗 Live App: https://todo-app-pern.netlify.app

🔗 Backend API: https://todo-app-pern-3ddo.onrender.com/api/v1

🏗 Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | React + Vite + MUI + Tailwind CSS |
| Backend    | Node.js + Express.js              |
| Database   | PostgreSQL (Render Cloud)         |
| Auth       | JWT + HttpOnly Cookies            |
| Deployment | Netlify + Render                  |
| PWA        | vite-plugin-pwa + Workbox         |


📂 Project Structure
todo-app/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── utils/
│   │   └── config/db.js
│   ├── .env
│   ├── package.json
│   └── index.js
│
└── frontend/
    ├── src/
    ├── public/
    │   ├── manifest.json
    │   ├── pwa-192.png
    │   ├── pwa-512.png
    │   └── icons...
    ├── vite.config.js
    ├── package.json
    └── index.html

