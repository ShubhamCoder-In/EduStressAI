
import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAdd }) {
  if (!product) return null;

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to={`/product/${product._id}`}>View</Link>
        <button onClick={() => onAdd(product)}>Add</button>
      </div>
    </div>
  )
}