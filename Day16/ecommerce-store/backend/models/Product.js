// backend/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: String,
  },
  { timestamps: true } // createdAt, updatedAt auto add
);

const Product = mongoose.model("Product", productSchema);

export default Product;
