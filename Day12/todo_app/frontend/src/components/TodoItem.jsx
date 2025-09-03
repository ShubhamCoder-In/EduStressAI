export default function TodoItem({ todo, onDelete }) {
  return (
    <li style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 12px',
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div>
        <div style={{ fontWeight: 500 }}>{todo.text}</div>
        <div style={{ fontSize: 12, color: '#666' }}>{new Date(todo.createdAt).toLocaleString()}</div>
      </div>
      <button onClick={() => onDelete(todo._id)} style={{ background: '#ef4444', color: '#fff', padding: '6px 8px', borderRadius: 6, border: 'none' }}>
        Delete
      </button>
    </li>
  );
}

