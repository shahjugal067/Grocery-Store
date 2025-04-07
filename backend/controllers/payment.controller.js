import Stripe from "stripe";
import dotenv from 'dotenv'
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getStripeKey = (req, res) => {
  res.status(200).json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

export const createStripeSession = async (req, res) => {
  const { items, email } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
