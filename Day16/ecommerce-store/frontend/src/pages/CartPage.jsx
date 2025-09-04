// src/pages/CartPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart();

  return (
    <div style={{ padding: 16 }}>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <div>
          {cart.map((p) => (
            <div key={p._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 8, borderBottom: "1px solid #eee" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 80, height: 80, background: "#fafafa", borderRadius: 6, overflow: "hidden" }}>
                  {p.image ? <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
                </div>
                <div>
                  <strong>{p.name}</strong>
                  <div style={{ color: "#666" }}>₹{p.price} each</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="number" min="1" value={p.qty} onChange={(e) => updateQty(p._id, Math.max(1, Number(e.target.value || 1)))} style={{ width: 64 }} />
                <div>₹{(p.price * p.qty).toFixed(0)}</div>
                <button onClick={() => removeFromCart(p._id)} style={{ padding: "6px 8px" }}>Remove</button>
              </div>
            </div>
          ))}

          <div style={{ marginTop: 12, textAlign: "right" }}>
            <h3>Total: ₹{total.toFixed(0)}</h3>
            <Link to="/checkout"><button style={{ padding: "8px 12px", marginTop: 8 }}>Proceed to Checkout</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
