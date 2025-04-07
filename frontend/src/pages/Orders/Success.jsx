import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');

      const response = await fetch(`/api/checkout-session?session_id=${sessionId}`);
      const sessionData = await response.json();
      setSession(sessionData);
    };

    fetchSession();
  }, [location]);

  return (
    <div>
      <h1>Payment Successful</h1>
      {session && (
        <div>
          <p>Thank you, {session.customer_details.name}!</p>
          <p>Your payment of ${session.amount_total / 100} was successful.</p>
        </div>
      )}
    </div>
  );
};

export default Success;
