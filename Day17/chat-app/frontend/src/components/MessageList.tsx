// import React from "react";
import type {Message}  from "../types.ts";

export default function MessageList({ messages, currentUserId }: { messages: Message[]; currentUserId: string; }) {
  return (
    <div className="p-2 space-y-2">
      {messages.map((m) => {
        const mine = m.from === currentUserId;
        return (
          <div key={m._id || Math.random()} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] p-2 rounded ${mine ? "bg-indigo-600 text-white" : "bg-slate-100 text-black"}`}>
              <div className="text-sm break-words">{m.text}</div>
              <div className="text-xs mt-1 opacity-60">{new Date(m.createdAt || Date.now()).toLocaleTimeString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
