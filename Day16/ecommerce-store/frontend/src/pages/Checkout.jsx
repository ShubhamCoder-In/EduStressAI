// src/pages/Checkout.jsx
import React, { useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: "", email: "", address: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    if (!cart.length) return alert("Cart is empty!");
    if (!customer.name || !customer.address) return alert("Please fill your details");

    setLoading(true);
    try {
      const { data } = await API.post("/orders", {
        items: cart.map((c) => ({ product: c._id, name: c.name, price: c.price, qty: c.qty })),
        total,
        customer,
      });

      alert(`Order placed successfully! Order ID: ${data._id}`);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h1>Checkout (Cash on Delivery)</h1>

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
        <input placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
        <input placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
        <textarea placeholder="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
      </div>

      <p><strong>Total: ₹{total}</strong></p>
      <button onClick={handleOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order (COD)"}
      </button>
    </div>
  );
}

