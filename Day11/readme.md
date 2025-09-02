# 🎓 Student CRUD API (Node.js + Express + MongoDB)

This project is a simple **REST API** that performs **CRUD operations (Create, Read, Update, Delete)** on student data. It is built using **Node.js**, **Express.js**, and **MongoDB**.

---

## 📌 Features
- ➕ **Create** a new student  
- 📖 **Read** all students or a single student  
- ✏️ **Update** student information  
- ❌ **Delete** a student  
- 🌐 RESTful routes following best practices  
- 💾 MongoDB for persistent storage  

---

## 📂 Project Structure
student-crud-api/
│── server.js
│── models/
│ └── Student.js
│── routes/
│ └── studentRoutes.js
│── config/
│ └── db.js
│── .env
│── package.json
│── README.md

yaml
Copy code

---

## 🛠️ Tech Stack
- **Node.js** – JavaScript runtime  
- **Express.js** – Web framework for building APIs  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **dotenv** – Environment variable management  
- **REST Client / Postman** – For testing API  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/student-crud-api.git
cd student-crud-api
2. Install dependencies
bash
Copy code
npm install
3. Configure environment
Create a .env file in the root directory:

ini
Copy code
MONGO_URI=mongodb://127.0.0.1:27017/studentDB
PORT=5000
4. Start MongoDB
Make sure MongoDB is running locally:

bash
Copy code
mongod
Or use a MongoDB Atlas connection string in .env.

5. Run the server
bash
Copy code
node server.js
Server runs at 👉 http://localhost:5000

📡 API Endpoints
Method	Endpoint	Description
GET	/api/students	Get all students
GET	/api/students/:id	Get student by ID
POST	/api/students	Add a new student
PUT	/api/students/:id	Update student by ID
DELETE	/api/students/:id	Delete student by ID

🧪 Example Requests
Create a student
http
Copy code
POST http://localhost:5000/api/students
Content-Type: application/json

{
  "name": "Alice",
  "age": 21
}
Get all students
http
Copy code
GET http://localhost:5000/api/students
Update a student
http
Copy code
PUT http://localhost:5000/api/students/<id>
Content-Type: application/json

{
  "name": "Alice Updated",
  "age": 23
}
Delete a student
http
Copy code
DELETE http://localhost:5000/api/students/<id>
🛠️ Testing
You can test the API using:

REST Client (VS Code extension) – create a .http file with API requests

Postman – import the endpoints and send requests

cURL – directly from the terminal

📌 Future Improvements
✅ Add authentication (JWT)

✅ Connect with a frontend (React, Vue, Angular)

✅ Deploy backend to Render / Railway / Heroku

yaml
Copy code

---

👉 Would you like me to also create a **`student-api.http` file** (for VS Code REST Client) that matches these endpoints, so you can test them directly in VS Code with one click?