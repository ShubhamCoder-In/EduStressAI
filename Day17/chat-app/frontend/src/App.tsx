// import React from "react";
import { useEffect, useState } from "react"
import Login from "./components/Login.tsx";
import ChatWindow from "./components/ChatWindow.tsx";
import type { User}  from "./types";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const saved = sessionStorage.getItem("chat_user");
    if (saved) setUser(JSON.parse(saved));
  },[]);

  return (
    <div className="w-screen h-screen flex bg-gray-100 items-center justify-center">
      <div className="w-screen max-w-4xl bg-gray-200 p-4 ">
        {!user ? (
          <Login onLogin={(u) => { setUser(u); sessionStorage.setItem("chat_user", JSON.stringify(u)); }} />
        ) : (
        <ChatWindow user={user} onLogout={() => { sessionStorage.removeItem("chat_user"); setUser(null); }} />
        )} 
       
      </div>
    </div>
  );
}
