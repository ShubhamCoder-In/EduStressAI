import TodoItem from './TodoItem';

export default function TodoList({ todos, onDelete }) {
  if (!todos || todos.length === 0) return <p>No todos yet.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}