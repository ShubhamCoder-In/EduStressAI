import React, { useEffect, useState } from "react";
import api from "../api";
import Auth from "../components/Auth";
import Feed from "../components/Feed";

export default function Home() {
  const [me, setMe] = useState(null);

  async function fetchMe() {
    try { const { data } = await api.get("/auth/me"); setMe(data); } catch {}
  }
  useEffect(() => { fetchMe(); }, []);

  return (
    <div>
      {me ? null : <Auth onAuthed={() => fetchMe()} />}
      <Feed authed={!!me} />
    </div>
  );
}
