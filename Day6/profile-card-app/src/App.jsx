import React from "react";
import ProfileCard from "./components/ProfileCard";


const users = [
  {
    name: "Jane Doe",
    title: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Passionate about building amazing web experiences.",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/janedoe" },
      { platform: "GitHub", url: "https://github.com/janedoe" },
    ],
  },
  {
    name: "John Smith",
    title: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Loves working with APIs and databases.",
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/johnsmith" },
      { platform: "GitHub", url: "https://github.com/johnsmith" },
    ],
  },
  {
    name: "Alice Brown",
    title: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "Designing intuitive and beautiful interfaces.",
    socialLinks: [
      { platform: "Dribbble", url: "https://dribbble.com/alicebrown" },
      { platform: "Behance", url: "https://behance.net/alicebrown" },
    ],
  },
];

function App() {
  return (
    <>
    <div>
      <h1 style ={{
        color:"white",
        background:"#464563ff",
        fontFamily:"serif",
        padding:"20px",
      }}>
        Profile Card Component
      </h1>
    </div>
    <div
      style={{
        min_height:"40vh",
        display: "flex",
        flexWrap: "wrap", // wrap cards to next line
        justifyContent: "center",
        padding:"15vh",
        gap:"4em",
      }}
      >
      {users.map((user, index) => (
        <ProfileCard key={index} {...user} />
      ))}
    </div>
    </>
  );
}

export default App;
