// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer style={{ background: "#111", color: "#fff", padding: "16px 24px", marginTop: "auto" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <p>© {new Date().getFullYear()} MyStore. All rights reserved.</p>
        <p style={{ fontSize: 14, marginTop: 4 }}>
          Built with ❤️ using React + Node.js + Stripe
        </p>
      </div>
    </footer>
  );
}
