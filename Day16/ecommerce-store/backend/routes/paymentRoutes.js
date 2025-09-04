
import express from 'express';
import Stripe from 'stripe';
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');


// POST /api/payment/create-session
router.post('/create-session', async (req, res) => {
const { items } = req.body; // items: [{name, price, qty}]


// convert items to stripe line_items
const line_items = items.map(i => ({
price_data: {
currency: 'inr',
product_data: { name: i.name },
unit_amount: Math.round(i.price * 100)
},
quantity: i.qty
}));


try {
const session = await stripe.checkout.sessions.create({
payment_method_types: ['card'],
line_items,
mode: 'payment',
success_url: `${process.env.FRONTEND_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`
});
res.json({ url: session.url });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Stripe error', error: err.message });
}
});


export default router;