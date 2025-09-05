const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = [];
const SECRET = "hackathonSecret";

// Root route (so browser GET / shows something)
app.get("/", (req, res) => {
  res.send("🚀 API is running! Try POST /register or /login");
});

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: "✅ User registered!" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Dashboard (protected)
app.get("/dashboard", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: `🎉 Welcome ${user.username}!` });
  });
});

// Start server
app.listen(5000, () => console.log("✅ Auth server running on http://localhost:5000"));
