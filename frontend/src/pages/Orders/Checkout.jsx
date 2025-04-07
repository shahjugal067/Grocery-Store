import React from 'react';
import { useStripe } from '@stripe/react-stripe-js';

const Checkout = () => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          { name: 'Product 1', price: 2000, quantity: 1 },
          { name: 'Product 2', price: 1500, quantity: 2 },
        ],
      }),
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default Checkout;
