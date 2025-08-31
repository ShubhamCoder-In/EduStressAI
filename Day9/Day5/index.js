const express = require("express");
const cors = require("cors"); // ✅ Import cors
const app = express();

// Enable CORS for all routes (allow requests from any origin)
app.use(cors());

// If you only want to allow your frontend (Vite)
 // app.use(cors({ origin: "http://localhost:5173" }));

// Sample students data
const students = [
  { id: 1, name: "Alice Johnson", age: 20, major: "Computer Science" },
  { id: 2, name: "Bob Smith", age: 22, major: "Mechanical Engineering" },
  { id: 3, name: "Charlie Brown", age: 21, major: "Business Administration" }
];

// Route: homepage with list + buttons
app.get("/", (req, res) => {
  let html = `
    <html>
    <head>
      <title>Students List</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f9; padding: 20px; }
        h1 { color: #333; }
        ul { list-style: none; padding: 0; }
        li { margin: 10px 0; padding: 10px; background: #fff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        button {
          background: #007BFF; color: white; border: none; padding: 6px 12px;
          border-radius: 5px; cursor: pointer; transition: 0.3s;
        }
        button:hover { background: #0056b3; }
        a { text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>Students List</h1>
      <ul>
  `;

  students.forEach((student) => {
    html += `
      <li>
        ${student.name} 
        <a href="/api/students/${student.id}">
          <button>View Details</button>
        </a>
      </li>
    `;
  });

  html += `
      </ul>
    </body>
    </html>
  `;
  res.send(html);
});

// Route: get all students (JSON)
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Route: get student by ID (JSON)
app.get("/api/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
