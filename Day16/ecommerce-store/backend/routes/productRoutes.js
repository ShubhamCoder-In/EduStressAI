
import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();


// GET /api/products
router.get('/', async (req, res) => {
const products = await Product.find().sort('-createdAt');
res.json(products);
});


// GET /api/products/:id
router.get('/:id', async (req, res) => {
const product = await Product.findById(req.params.id);
if (!product) return res.status(404).json({ message: 'Product not found' });
res.json(product);
});


// POST /api/products (simple admin endpoint)
router.post('/', async (req, res) => {
const p = new Product(req.body);
await p.save();
res.status(201).json(p);
});


export default router;