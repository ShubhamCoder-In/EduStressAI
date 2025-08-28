import React from "react";

const ProfileCard = ({ name, title, avatar, bio, socialLinks }) => {
  return (
    <div style={styles.card}>
      <img src={avatar} alt={`${name} avatar`} style={styles.avatar} />
      <h2 style={styles.name}>{name}</h2>
      <h4 style={styles.title}>{title}</h4>
      <p style={styles.bio}>{bio}</p>
      <div style={styles.socials}>
        {socialLinks?.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialLink}
          >
            {link.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "250px",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
  },
  name: {
    margin: "10px 0 5px",
    fontSize: "1.5em",
  },
  title: {
    margin: "0 0 10px",
    color: "gray",
  },
  bio: {
    fontSize: "0.9em",
    marginBottom: "15px",
    color: "#555",
  },
  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  socialLink: {
    textDecoration: "none",
    color: "#0073b1",
    fontWeight: "bold",
    fontSize: "0.85em",
  },
};

export default ProfileCard;
