import {apiSlice} from '../api/apiSlice';
import { ORDER_URL,STRIPE_URL } from '../features/constants';

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        createOrder:  builder.mutation({
            query: (order) =>({
                url: ORDER_URL,
                method: 'POST',
                body: order,
            }),
        }),
        createStripeSession: builder.mutation({
            query: (orderData) => ({
              url: '/api/payment/create-checkout-session',
              method: 'POST',
              body: orderData,
            }),
          }),

        getOrderDetails: builder.query({
            query: (id) =>({
                url: `${ORDER_URL}/${id}`,
                method: 'GET',
            }),
        }),
        payOrder: builder.mutation({
            query: ({ orderId,details }) =>({
                url: `${ORDER_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
        }),
        createStripePaymentIntent: builder.mutation({
            query: (amount) => ({
              url: '/payment/create-payment-intent',
              method: 'POST',
              body: { amount },
            }),
          }),
          getStripeKey: builder.query({
            query: () => '/payment/stripe-key',
          }),

        getMyOrders: builder.query({
            query:() =>({
                url: ORDER_URL + '/mine',
            }),
            keepUnusedDataFor:5,
        }),
        getOrders: builder.query({
            query: () =>({
                url: ORDER_URL,
            }),
            
        }),
        deliveredOrder: builder.mutation({
            query: (orderId) =>({
                url: `${ORDER_URL}/${orderId}/deliver`,
                method: 'PUT',
            }),
        }),
        getTotalOrders: builder.query({
            query: () => `${ORDER_URL}/total-orders`,
        }),
        getTotalSales: builder.query({
            query: () => `${ORDER_URL}/total-sales`,
        }),
        getTotalSalesByDate: builder.query({
            query: () => `${ORDER_URL}/total-sales-by-date`,
        }),

    }),
});

export const { 
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetStripeKeyQuery,
    useGetMyOrdersQuery,
    useDeliveredOrderMutation,
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    useGetOrdersQuery,
    useCreateStripeSessionMutation,
    useCreateStripePaymentIntentMutation,
} = orderSlice;