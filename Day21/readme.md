# Developer Portfolio Website

A personal portfolio website built with **React** and **Bootstrap** to showcase your projects, experience, and skills. Includes project detail modals, contact form, and responsive layout.

---

## ✨ Features
- **Hero Section**: Personal introduction and quick call-to-action buttons.
- **About Section**: Brief biography and key highlights.
- **Experience Section**: Timeline of internships, jobs, and major projects.
- **Projects Section**: Project cards with detailed modal views and tech stacks.
- **Contact Section**: Contact form (demo) + social/portfolio links.
- **Responsive Design**: Works on desktop, tablet, and mobile.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at [http://localhost:5173](http://localhost:5173).

---

## 🛠️ Setup

### Bootstrap
Bootstrap is installed via npm. It is imported globally in `main.jsx`:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

### Portfolio Component
All sections are defined in `src/Portfolio.jsx`.

### Customization
- Update your **name**, **bio**, **profile image**, and **contact details** in `Portfolio.jsx`.
- Replace placeholder project details in the `projects` array.
- Add real **LinkedIn, GitHub, and Resume links**.

---

## 📂 File Structure
```
portfolio-website/
├── public/
│   └── profile.jpg          # Your profile image (optional)
├── src/
│   ├── App.jsx              # Main app file
│   ├── main.jsx             # Entry point with Bootstrap imports
│   └── Portfolio.jsx        # Portfolio component (all sections)
├── package.json
└── README.md
```

---

## 📧 Contact Form
Currently, the form is a demo (logs data to console). Options to make it live:
- [EmailJS](https://www.emailjs.com/) (no backend needed)
- Small Node.js / FastAPI backend with mail integration (e.g., Nodemailer, SMTP)

---

## 📄 License
MIT License © 2025 Your Name
