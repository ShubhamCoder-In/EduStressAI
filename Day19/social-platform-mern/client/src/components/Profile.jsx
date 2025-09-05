import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import PostCard from "./PostCard";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/users/${id}`);
        setProfile(data);
      } finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <div className="card">Loading profile...</div>;
  if (!profile) return <div className="card">Profile not found</div>;

  const { user, posts } = profile;

  return (
    <div>
      <div className="card">
        <div className="row">
          <span className="avatar" style={{width:56,height:56}}></span>
          <div>
            <h3 style={{margin:0}}>{user.name}</h3>
            <div className="small">{user.email}</div>
            {user.bio ? <div style={{marginTop:6}}>{user.bio}</div> : null}
          </div>
        </div>
      </div>
      {posts.map(p => <PostCard key={p._id} post={{...p, user}} />)}
    </div>
  );
}
