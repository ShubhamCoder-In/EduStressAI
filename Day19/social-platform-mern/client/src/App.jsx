import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getToken, setToken } from "./api.js";

export default function App() {
  const navigate = useNavigate();
  const token = getToken();
  function logout() { setToken(null); navigate("/"); }
  return (
    <div className="container">
      <nav className="nav">
        <Link className="brand" to="/">Social Dashboard</Link>
        <div className="row">
          {token ? <button className="btn ghost" onClick={logout}>Logout</button> : null}
        </div>
      </nav>
      <Outlet />
      <footer className="small" style={{marginTop:24, textAlign:"center"}}>
        Day 19 • Posts • Comments • Likes • Profiles
      </footer>
    </div>
  );
}
