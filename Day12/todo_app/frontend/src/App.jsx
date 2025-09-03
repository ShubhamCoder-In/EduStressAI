import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

const API_ROOT = import.meta.env.VITE_API_ROOT || 'http://localhost:5000/api';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch todos from backend
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_ROOT}/todos`);
      setTodos(res.data);
    } catch (err) {
      setError('Failed to load todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // add todo (optimistic UI)
  const addTodo = async (text) => {
    const temp = { _id: `temp-${Date.now()}`, text, createdAt: new Date().toISOString() };
    setTodos(prev => [temp, ...prev]);

    try {
      const res = await axios.post(`${API_ROOT}/todos`, { text });
      const saved = res.data;
      setTodos(prev => prev.map(t => (t._id === temp._id ? saved : t)));
    } catch (err) {
      // rollback
      setTodos(prev => prev.filter(t => t._id !== temp._id));
      setError('Failed to add todo');
      console.error(err);
    }
  };

  // delete todo
  const deleteTodo = async (id) => {
    const prev = todos;
    setTodos(prev => prev.filter(t => t._id !== id));

    try {
      await axios.delete(`${API_ROOT}/todos/${id}`);
    } catch (err) {
      // rollback on failure
      setTodos(prev);
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>To-Do App</h1>

        <AddTodo onAdd={addTodo} />

        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

        {loading ? <p>Loading...</p> : <TodoList todos={todos} onDelete={deleteTodo} />}
      </div>
    </div>
  );
}
