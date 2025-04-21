import React, { useEffect } from 'react';
import {
  usePayOrderMutation, useGetOrderDetailsQuery,
  useDeliveredOrderMutation,
  useGetStripeKeyQuery
} from '../../redux/api/orderSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify'
import Message from '../../components/Message'; // Assuming you have a Message component


const Order = () => {
  const cart= useSelector((state) => state.cart);
  const { id: orderId } = useParams(); 
  const { userInfo } = useSelector((state)=>state.auth);
  
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder,{isLoading: loadingDeliver}] = useDeliveredOrderMutation();
  
  const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
  const { data: paypal,
    isLoading:loadingPayPal,
    error: errorPayPal,
  } = useGetStripeKeyQuery()

  

  const handleCheckout = async () => {
    const stripe = await loadStripe("pk_test_51QVZDdGLJCcpxXdfFJw8GinMKrsD77D1PZiHQJJwFPeN9zP8J0FOWwVkd2zCmFQRaY8FqJsM9m6Fh7oXAr2m6Wv600TzNlC3Sh")
    const body = {
      products: cart
    }
    const headers = {
      'Content-Type': 'application/json',
      
    }
    console.log(cart)
  const response = await fetch('http://localhost:5000'+'/api/create-checkout-session', {
    method: 'POST',
    headers:headers,
    body: JSON.stringify(body),
  })
  const session = await response.json();
  const result = stripe.redirectToCheckout({
    sessionId: session.id
  });
  if(result.error){
    console.log(result.error)
  }
 
  }
  useEffect(() => {
    // If you want to auto-check or set anything when component loads
    if (order && !order.isPaid) {
      console.log('Order is not paid. Ready for Stripe checkout.');
    }
  }, [order]);

  function onApprove(data,actions){
    return actions.order.capture().then(async function (details){
      try {
        await payOrder({ orderId,details})
        refetch();
        toast.success("Order is Paid")
      } catch (error) {
        console.log(error)
      }
    })
  }
  function createOrder(data,actions){
    return actions.order.create({
      purchage_units: [{amount: { value: order.totalPrice} } ],
    })
    .then((orderId)=> {
      return orderId;
    });
  }

  function onError(error){
    toast.error(error?.message)
  }


  return isLoading ? (
    <Loader className='w-5 h-5 text-yellow-600 animate-spin' />
  ) : error ? (
    <Message variant='danger'>
      {error?.data?.message || error?.message || 'Something went wrong'}
    </Message>
  ) : (
    <div className=' flex flex-col ml-[10rem] md:flex-row'>
      <div className='w-2/4'>
        <div className='border border-gray-400 mt-5 mr-4'>
          {order.orderItems.length === 0 ? (
            <Message>Order is empty</Message>
          ) : (
            <>
              <h2 className='text-lg font-bold mb-2 text-center text-green-600'>Order Summary</h2>
              <table className='w-[100%]'>
                <thead className='border-blue-200 border'>
                    <tr>
                      <th className='p-2 text-sm font-medium'>Image</th>
                      <th className='p-2'> Product</th>
                      <th className='p-2'>Quantity</th>
                      <th className='p-2'>Unit Price</th>
                      <th className='p-2'>Total </th>
                    </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item,index) => (
                    <tr key={index} className=' text-center'>
                      <td className='p-2'>
                        <img src={item.image} alt={item.name} className='w-16 h-16 object-cover' />
                      </td>
                      <td className='p-2'>
                        <Link to={`/product/${item.product}`} className='text-blue-500 hover:underline'>
                        {item.name}
                        </Link>
                      </td>
                      <td className='p-2'>{item.qty}</td>
                      <td className='p-2'>${item.price.toFixed(2)}</td>
                      <td className='p-2'>${(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </>
          )}
        </div>
      </div>
      <div className='md:w-1/3'>
          <div className='px-4 mt-5 border border-gray-300'>
            <h2 className='text-lg mb-2'>Shipping</h2>
            <p className='mb-1'>
                <strong>Order:</strong> {order._id}
            </p>
            <p className='mb-1'>
                <strong>Name: </strong>  {order.user.username}
            </p>
            <p className='mb-1'>
                <strong>Email: </strong>{order.user.email}
            </p>
            <p className='mb-1'>
              <strong>Address: </strong>
              {order.shippingAddress.address},{order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode},{' '}
              {order.shippingAddress.country}
            </p>
            <p className='mb-4 mt-4'>
                <strong>Method: </strong>{order.paymentMethod}
            </p>
            {order.isPaid ? (
              <Message variant='success'>Paid on {order.paidAt}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </div>
          <h2 className='text-xl mb-2 mt-6'>Order summary</h2>
          <div className='flex justify-between mb-1'>
              <span>Items</span>
              <span>${order.itemsPrice}</span>
          </div>
          <div className='flex justify-between mb-1'>
              <span>Shipping</span>
              <span>${order.shippingPrice}</span>
          </div>
          <div className='flex justify-between mb-1'>
              <span>Tax</span>
              <span>${order.taxPrice}</span>
          </div>
          <div className='flex justify-between mb-1'>
              <span>Total</span>
              <span>${order.totalPrice}</span>
          </div>
          {!order.isPaid && (
            <div>
              {loadingPay ? (
                <Loader className='w-5 h-5 text-yellow-600 animate-spin' />
              ) : (
                <button createOrder={createOrder} onApprove={onApprove} onError={onError}
                  onClick={handleCheckout}
                  className='mt-4 bg-green-600 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded'
                >
                  Pay with Stripe
                </button>
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Order;
