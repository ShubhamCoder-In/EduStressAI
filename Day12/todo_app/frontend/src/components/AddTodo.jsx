import { useState } from 'react';

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    await onAdd(text.trim());
    setText('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter todo"
        style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ddd' }}
      />
      <button type="submit" disabled={submitting} style={{ padding: '8px 12px', borderRadius: 6 }}>
        Add
      </button>
    </form>
  );
}
