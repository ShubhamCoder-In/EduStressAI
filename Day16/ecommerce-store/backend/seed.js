import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';


dotenv.config();


const products = [
{ name: 'Wireless Headphones', description: 'Comfortable wireless headphone', price: 2499, image: '', countInStock: 20 },
{ name: 'Gaming Mouse', description: 'High precision mouse', price: 1299, image: '', countInStock: 15 },
{ name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard', price: 3999, image: '', countInStock: 10 }
];


const run = async () => {
await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany({});
await Product.insertMany(products);
console.log('Seeded products');
process.exit();
};


run();
