# 📊 Hintro Dashboard

A modern React-based dashboard application that displays call session analytics, user profile data, and AI interaction statistics using a mock/Express API.

This project demonstrates real-world frontend engineering skills including API integration, reusable components, responsive UI design, and state management.

---

## 🚀 Features

- 📊 Dashboard analytics (Total Sessions, AI usage, Average duration)
- 🕒 Last session tracking (e.g. "13 days ago")
- 📞 Recent call sessions grouped by date
- 👤 Dynamic user switching (u1 / u2)
- 🎨 Fully responsive UI (mobile + desktop)
- ⚡ Axios-based API integration with custom hook
- 🧩 Reusable components (Navbar, Sidebar)

---

## 🛠 Tech Stack

- React.js
- Vite
- Tailwind CSS
- DaisyUI
- React Icons
- Axios

---

## 📁 Project Structure

src/
│
├── Components/
│   ├── DashboardContent/
│   │   ├── DashboardContent.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│
├── hooks/
│   └── useAxios.jsx
│
├── Pages/
│   └── Dashboard.jsx
│
└── main.jsx

## ⚙️ Setup Instructions

git clone https://github.com/your-username/hintro-dashboard.git

cd hintro-dashboard

npm install

npm run dev
