import React, { useState } from "react";
import api from "../api";

export default function NewPost({ onPosted }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post("/posts", { content });
      setContent("");
      onPosted(data);
    } finally { setLoading(false); }
  }

  return (
    <div className="card">
      <form onSubmit={submit}>
        <textarea className="textarea" rows="3" placeholder="Share something..." value={content} onChange={e=>setContent(e.target.value)} />
        <div style={{display:"flex", justifyContent:"space-between", marginTop:8}}>
          <span className="small">{content.length}/500</span>
          <button className="btn" disabled={loading}>{loading ? "Posting..." : "Post"}</button>
        </div>
      </form>
    </div>
  );
}
