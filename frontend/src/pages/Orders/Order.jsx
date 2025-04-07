import React, { useEffect } from 'react';
import { useGetStripeKeyQuery, useCreateStripeSessionMutation,
  useDeliveredOrderMutation,usePayOrderMutation,useGetOrderDetailsQuery
 } from '../../redux/api/orderSlice';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react'

const Order = () => {
  const { data: stripeKey, isLoading: loadingStripe,error:errorStripe } = useGetStripeKeyQuery();
  const [createStripeSession] = useCreateStripeSessionMutation();
  const { id: orderId } = useParams()
  const {dat: order,refetch, isLoading,error} = useGetOrderDetailsQuery(orderId)
  const [payOrder,{ isLoading:loadingDeliver }] = useDeliveredOrderMutation()
  const {userInfo } = useSelector((state)=> state.auth)
  
  const [{isLoading},stripeDispatch] = useCreateStripeSessionMutation()
  

  const handleCheckout = async () => {
    const email = 'shahjugal067@example.com'; // Replace with actual user email from auth state

    try {
      const session = await createStripeSession({ items, email }).unwrap();
      const stripe = await loadStripe(stripeKey.publishableKey);
      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (err) {
      console.error('Stripe session error:', err);
    }
  };

  useEffect(()=>{
    if(!errorStripe && !loadingStripe && stripeKey.clientId){
      const loadingStripe = async()=>{
        stripeDispatch ({
          type:'resetOptions',
          value:{
            'client-id': stripeKey.clientId,
            currency:"USD"
          }
        })
        stripeDispatch({ type:'setLoadingStatus', value:'pending'})
      };
      if(order && !order.isPaid){
        if(!window.stripe){
          loadingStripe();
        }
      }
    }
  },[errorStripe,loadingStripe,order,stripeKey,stripeDispatch])


  return isLoading ? (
    <Loader className='w-5 h-5 text-yellow-600 animate-spin  ' />
  ) : error ? (
    <Message>

    </Message>
  )
  

};

export default Order;
