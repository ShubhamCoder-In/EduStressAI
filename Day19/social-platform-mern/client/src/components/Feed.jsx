import React, { useEffect, useState } from "react";
import api from "../api";
import NewPost from "./NewPost";
import PostCard from "./PostCard";

export default function Feed({ authed }) {
  const [posts, setPosts] = useState([]);

  async function load() {
    const { data } = await api.get("/posts");
    setPosts(data);
  }
  useEffect(() => { load(); }, []);
  return (
    <div>
      {authed ? <NewPost onPosted={(p) => setPosts([p, ...posts])} /> : null}
      {posts.map(p => <PostCard key={p._id} post={p} />)}
    </div>
  );
}
