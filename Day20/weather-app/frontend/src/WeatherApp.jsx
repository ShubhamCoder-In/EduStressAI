import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function WeatherApp() {
  const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.209 });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => console.warn("Using default Delhi coords")
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: weatherData } = await axios.get(
          `http://localhost:5000/api/weather?lat=${coords.lat}&lon=${coords.lon}`
        );
        setWeather(weatherData);

        const { data: forecastData } = await axios.get(
          `http://localhost:5000/api/forecast?lat=${coords.lat}&lon=${coords.lon}`
        );
        const daily = forecastData.list.filter((item) =>
          item.dt_txt.includes("12:00:00")
        );
        setForecast(daily);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [coords]);

  return (
    <div>
      {/* Bootstrap Header/Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            🌍 WeatherApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Forecast
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Map
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container py-4">
        {/* Current Weather Card */}
        {weather ? (
          <div className="card text-center shadow mb-4">
            <div className="card-body">
              <h2 className="card-title">{weather.name}</h2>
              <p className="card-text text-capitalize">
                {weather.weather[0].description}
              </p>
              <h3 className="fw-bold">{weather.main.temp}°C</h3>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
            </div>
          </div>
        ) : (
          <p className="text-center">Loading weather...</p>
        )}

        {/* Forecast Row */}
        <h4 className="mb-3">5-Day Forecast</h4>
        <div className="row g-3 mb-4">
          {forecast.map((f, i) => (
            <div key={i} className="col-md-2 col-sm-4 col-6">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <p className="fw-bold">
                    {new Date(f.dt_txt).toLocaleDateString()}
                  </p>
                  <h5>{f.main.temp}°C</h5>
                  <p>{f.weather[0].main}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <h4 className="mb-3">Location Map</h4>
        <div className="card shadow">
          <div className="card-body p-0">
            <MapContainer
              center={[coords.lat, coords.lon]}
              zoom={12}
              style={{ height: "400px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coords.lat, coords.lon]}>
                <Popup>
                  {weather ? (
                    <>
                      <b>{weather.name}</b> <br />
                      {weather.main.temp}°C
                    </>
                  ) : (
                    "Location"
                  )}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
