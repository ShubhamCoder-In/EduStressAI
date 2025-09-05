# 🌍 Weather App with Maps

A fullstack weather forecast application built with **React (Vite + Bootstrap)** on the frontend and **FastAPI** on the backend.
It integrates **OpenWeatherMap API** to fetch live weather data and **Leaflet Maps** for interactive geolocation features.

---

## ✨ Features

* 🌦️ Current weather with temperature, humidity, and wind speed
* 📅 5-day forecast with daily breakdown
* 📍 Auto-detect user location using browser geolocation
* 🗺️ Interactive map with weather popup
* 🌈 Responsive UI styled with **Bootstrap 5**

---

## ⚙️ Tech Stack

**Frontend**

* React (Vite)
* Bootstrap 5
* React-Leaflet (Leaflet.js)

**Backend**

* FastAPI (Python)
* Requests (to call OpenWeatherMap API)

**API**

* [OpenWeatherMap API](https://openweathermap.org/)

---

## 🚀 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### 2. Backend Setup

1. Create a `.env` file in `backend/` with:

   ```env
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
2. Install dependencies:

   ```bash
   cd backend
   pip install fastapi uvicorn requests python-dotenv
   ```
3. Start backend server:

   ```bash
   uvicorn app:app --reload --port 5000
   ```

Backend runs at: **[http://localhost:5000](http://localhost:5000)**

---

### 3. Frontend Setup

1. Go to frontend folder:

   ```bash
   cd ../frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start dev server:

   ```bash
   npm run dev
   ```

Frontend runs at: **[http://localhost:5173](http://localhost:5173)**

---

## 📸 Screenshots

* Current weather card
* 5-day forecast grid
* Interactive location map with popup

---

## 🛠️ Project Structure

```
weather-app/
│
├── backend/
│   ├── app.py         # FastAPI backend
│   ├── .env           # API key
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   └── WeatherApp.jsx
│   └── package.json
│
└── README.md
```

---

## 📝 Notes

* You need a free **OpenWeatherMap API key** → [Get it here](https://home.openweathermap.org/users/sign_up).
* Make sure backend (port 5000) is running before frontend.
* On mobile devices, allow **location access** for best results.

---

## 💡 Future Improvements

* 🔎 Search weather by city name
* 🌎 Support for multiple map layers (satellite, terrain)
* 📊 Charts for temperature trends
* 📱 PWA support for offline mode

---

## 👨‍💻 Author

Developed by **Shubham Garg** 🚀
