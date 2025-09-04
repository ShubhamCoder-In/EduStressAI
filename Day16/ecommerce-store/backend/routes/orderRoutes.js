// backend/routes/orderRoutes.js
import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create order with COD
router.post("/", async (req, res) => {
  try {
    const { items, total, customer } = req.body;

    const order = new Order({
      items,
      total,
      customer,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Placed",
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

export default router;
