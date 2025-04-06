import Stripe from 'stripe';
import dotenv from 'dotenv';
 dotenv.config();

 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 
 exports.createPaymentIntent = async (req, res) => {
    try {
      const { amount, currency = 'usd' } = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      });
  
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Payment Intent Error:', error);
      res.status(500).json({ error: error.message });
    }
  };