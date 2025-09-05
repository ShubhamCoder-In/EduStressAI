import React, { useState } from "react";
import api, { setToken } from "../api";

export default function Auth({ onAuthed }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const url = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      const { data } = await api.post(url, payload);
      setToken(data.token);
      onAuthed(data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  }

  return (
    <div className="card">
      <h3>{isLogin ? "Welcome back" : "Create account"}</h3>
      <form onSubmit={submit}>
        {!isLogin && (
          <div style={{margin:"8px 0"}}>
            <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          </div>
        )}
        <div style={{margin:"8px 0"}}>
          <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </div>
        <div style={{margin:"8px 0"}}>
          <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        </div>
        {error ? <div className="small" style={{color:"#ffb4b4"}}>{error}</div> : null}
        <div className="row" style={{marginTop:8}}>
          <button className="btn" type="submit">{isLogin ? "Login" : "Register"}</button>
          <button type="button" className="btn ghost" onClick={()=>setIsLogin(!isLogin)}>
            {isLogin ? "Need an account?" : "Have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}
