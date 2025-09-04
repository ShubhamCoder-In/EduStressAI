
// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!product) return <div style={{ padding: 16 }}>Product not found.</div>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          {product.image ? (
            <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: 8 }} />
          ) : (
            <div style={{ width: "100%", height: 360, background: "#f5f5f5", borderRadius: 8 }} />
          )}
        </div>
        <div>
          <h1>{product.name}</h1>
          <p style={{ color: "#555" }}>{product.description}</p>
          <h3>₹{product.price}</h3>
          <div style={{ marginTop: 12 }}>
            <label>
              Qty:{" "}
              <input type="number" min="1" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} style={{ width: 60 }} />
            </label>
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => addToCart(product, qty)} style={{ padding: "8px 12px", borderRadius: 6 }}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
