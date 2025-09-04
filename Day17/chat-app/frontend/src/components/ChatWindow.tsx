import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { api } from "../api";
import type { User, Message } from "../types";
import MessageList from "./MessageList.tsx";

const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export default function ChatWindow({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const socketRef = useRef<any>(null);

  useEffect(()=>{
    // fetch users
    api.get("/auth/users").then(res => setUsers(res.data.filter((u:User)=>u._id !== user._id)));
  }, [user._id]);

  useEffect(()=>{
    socketRef.current = io(socketUrl);
    socketRef.current.emit("user:join", { userId: user._id });

    socketRef.current.on("user:online", ({ userId }: { userId: string })=>{
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, online: true } : u));
    });
    socketRef.current.on("user:offline", ({ userId }: { userId: string })=>{
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, online: false } : u));
    });

    socketRef.current.on("message:receive", (msg: Message) => {
      // if message belongs to current conversation push it
      if (selected && msg.conversationId === selected._id + "-" + user._id || (selected && msg.conversationId === `${selected._id}_${user._id}`)) {
        setMessages(prev => [...prev, msg]);
      } else {
        // optionally show notification
      }
    });

    socketRef.current.on("message:sent", (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return ()=> {
      socketRef.current.emit("user:leave", { userId: user._id });
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, selected]);

  useEffect(()=>{
    if (!selected) return;
    // create or fetch conversation: for simplicity we'll create conversation id as sorted ids joined
    const convId = createConversationId(user._id, selected._id);
    api.get(`/messages/${user._id}`).then(()=>{/* no-op */});
    api.get(`/conversation/${convId}/messages`).catch(()=>{/* endpoint not created for convId scheme */});
    // fetch messages via REST (we used /messages/:userId earlier)
    api.get(`/messages/${user._id}`).then((res)=>{
      // filter those that are between user and selected
      const filtered = res.data.filter((m: Message)=> (m.from === user._id && m.to === selected._id) || (m.from === selected._id && m.to === user._id));
      // we want ascending
      setMessages(filtered.reverse());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const send = async () => {
    if (!text.trim() || !selected) return;
    const conversationId = createConversationId(user._id, selected._id);
    socketRef.current.emit("message:send", { conversationId, from: user._id, to: selected._id, text: text.trim() });
    setText("");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex h-[80vh]">
      <div className="w-1/4 border-r pr-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Contacts</h3>
          <button onClick={onLogout} className="text-sm text-red-500">Logout</button>
        </div>
        <div className="space-y-2 overflow-auto h-[70vh]">
          {users.map(u=>(
            <div key={u._id} onClick={()=>setSelected(u)} className={"p-2 rounded cursor-pointer " + (selected?._id===u._id ? "bg-slate-100":"hover:bg-slate-50")}>
              <div className="flex justify-between">
                <div>{u.username}</div>
                <div className="text-xs">{u.online ? <span className="text-green-600">online</span> : <span className="text-gray-400">offline</span>}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col pl-4">
        {selected ? (
          <>
            <div className="border-b pb-2 mb-2">
              <div className="font-semibold">{selected.username}</div>
            </div>

            <div className="flex-1 overflow-auto mb-2">
              <MessageList messages={messages} currentUserId={user._id} />
            </div>

            <div className="flex gap-2">
              <input value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=> e.key === "Enter" && send()} className="flex-1 p-2 border rounded" placeholder="Type a message" />
              <button onClick={send} className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Select a contact to start chatting</div>
        )}
      </div>
    </div>
  );
}

function createConversationId(a: string, b: string) {
  // deterministic id: smaller + "_" + larger
  return a < b ? `${a}_${b}` : `${b}_${a}`;
}
