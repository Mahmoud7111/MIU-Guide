# MIU-Guide

Built a comprehensive university web portal as part of a hackathon, delivering two distinct user experiences under the clock: a public university website and a private student portal.  
The app presents Misr International University (MIU) information for visitors and a student-focused portal for authenticated users.

## ✨ Features

- **Built dual experience**
  - Public university website
  - Private student portal
- **Public website**
  - Home, About, Academics, Admissions, Student Life, News, Contact
  - Campus map + buildings + rooms sections
- **Student portal (protected)**
  - Dashboard
  - Schedule
  - Attendance
  - Exams
  - GPA calculator
  - Academic calendar
  - Portal campus map
- **Routing & layouts**
  - Public routes and a protected portal
  - Lazy loading for most pages
  - Layout components for public and portal UI
- **Context providers**
  - Theme (light/dark via CSS variables)
  - Auth (mock localStorage-based login)

## 🧱 Tech Stack

- **React 19**
- **Vite**
- **React Router**
- **Framer Motion**
- **ESLint**

## 📁 Project Structure

```
MIU-Guide/
├─ client/
│  ├─ src/
│  │  ├─ components/        # UI, sections, layouts
│  │  ├─ context/           # Auth, Theme, Language providers
│  │  ├─ data/              # Static data
│  │  ├─ pages/             # Public + portal + auth pages
│  │  ├─ routes/            # Router config + PrivateRoute
│  │  ├─ services/          # Mock services (auth, schedule, events...)
│  │  └─ styles/            # Global styles
│  ├─ index.html
│  ├─ package.json
│  └─ vite.config.js
└─ README.md
```

## 🚀 Getting Started

> The app lives inside the **client** folder.

```bash
cd client
npm install
npm run dev
```

Then open the URL shown in your terminal (typically `http://localhost:5173`).

## 🧪 Scripts

Inside `client/`:

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

## 🗺️ Routing Overview

Public routes include:
- `/` Home  
- `/about`, `/academics`, `/admissions`, `/campus`, `/news`, `/contact`, etc.

Portal routes (protected) include:
- `/portal/dashboard`
- `/portal/schedule`
- `/portal/attendance`
- `/portal/exams`
- `/portal/gpa`
- `/portal/calendar`
- `/portal/campus`

## 📌 Notes

- The repo currently focuses on the **frontend**.
- Services contain mock data and example logic; replace with real APIs if needed.

---
