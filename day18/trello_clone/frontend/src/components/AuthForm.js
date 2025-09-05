import React, { useState } from 'react';
import { login, register } from '../api/auth';

export default function AuthForm({ onAuth }){
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      if(mode === 'login'){
        const res = await login({ username, password });
        onAuth(res);
      } else {
        const res = await register({ username, password });
        onAuth(res);
      }
    } catch (err){ console.error(err); alert(err?.response?.data?.error || 'auth failed'); }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h3>{mode === 'login' ? 'Login' : 'Register'}</h3>
      <form onSubmit={submit}>
        <div>
          <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>Switch</button>
        </div>
      </form>
    </div>
  );
}
