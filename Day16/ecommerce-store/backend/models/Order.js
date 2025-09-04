// backend/models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: String, required: true },
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  total: { type: Number, required: true },
  customer: {
    name: String,
    email: String,
    address: String,
    phone: String,
  },
  paymentMethod: { type: String, default: "COD" },
  paymentStatus: { type: String, default: "Pending" },
  orderStatus: { type: String, default: "Placed" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
