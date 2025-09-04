import { useState } from "react";
import { api } from "../api";
import type { User } from "../types";

export default function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [username, setUsername] = useState("");

  const handle = async () => {
    if (!username.trim()) return;
    const res = await api.post("/auth/login", { username: username.trim() });
    onLogin(res.data);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl uppercase font-semibold text-black  mb-4">Join Chat</h2>
      <input className="w-full p-2 text-red-200 border rounded mb-3" placeholder="Your username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      <div className="flex gap-2">
        <button onClick={handle} className="px-4 py-2 bg-indigo-600 text-white rounded">Join</button>
      </div>
    </div>
  );
}
