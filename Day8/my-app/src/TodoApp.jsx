import React, { useState } from "react";
import "./TodoApp.css"; // import the CSS file

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <h1 className="title">To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-btn">
          Add
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span
              onClick={() => toggleTask(task.id)}
              className={task.done ? "task-done" : ""}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}