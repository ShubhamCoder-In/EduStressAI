import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [text, setText] = useState("");

  async function like() {
    try {
      const { data } = await api.post(`/posts/${post._id}/like`);
      setLikes(data.likes);
    } catch {}
  }
  async function unlike() {
    try {
      const { data } = await api.post(`/posts/${post._id}/unlike`);
      setLikes(data.likes);
    } catch {}
  }
  async function addComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await api.post(`/posts/${post._id}/comments`, { text });
    setComments([data, ...comments]);
    setText("");
  }

  return (
    <div className="card">
      <div className="post-header">
        <span className="avatar"></span>
        <div>
          <strong><Link to={`/users/${post.user._id}`}>{post.user.name}</Link></strong><br/>
          <span className="small">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <p style={{marginTop:10, whiteSpace:"pre-wrap"}}>{post.content}</p>
      <div className="row" style={{gap:16}}>
        <span className="small like" onClick={like}>👍 Like</span>
        <span className="small like" onClick={unlike}>👎 Unlike</span>
        <span className="small">{likes} likes</span>
      </div>
      <hr className="sep" />
      <form onSubmit={addComment} className="comment">
        <span className="avatar"></span>
        <input className="input grow" placeholder="Write a comment..." value={text} onChange={e=>setText(e.target.value)} />
        <button className="btn" type="submit">Send</button>
      </form>
      <div style={{marginTop:8}}>
        {comments.map((c) => (
          <div key={c._id} className="comment">
            <span className="avatar"></span>
            <div>
              <strong className="small">{c.user?.name || "User"}</strong><br/>
              <span>{c.text}</span><br/>
              <span className="small">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
