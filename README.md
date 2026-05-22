# 📊 Hintro Dashboard

A modern React-based dashboard application that displays call session analytics, user profile data, and AI interaction statistics using a mock API.

This project demonstrates real-world frontend engineering skills including API integration, reusable components, responsive UI design, and state management.

---

## 🌐 Live Link

https://hintro-lac.vercel.app/

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

## ⚙️ API Used

Mock Backend:
https://mock-backend-hintro.vercel.app/

- Data is fetched using `x-user-id` header
- Two users supported:
  - `u1` → Empty state
  - `u2` → Filled/random data

---

## 📁 Setup Instructions

```bash
git clone https://github.com/sajid4807/hintro.git

cd hintro

npm install

npm run dev