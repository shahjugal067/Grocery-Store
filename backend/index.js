import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import userRoutes from './routes/user.route.js'
import categoryRoutes from './routes/category.route.js'
import productRoutes from './routes/product.route.js'
import uploadRoutes from './routes/upload.route.js'
import orderRoutes from './routes/order.route.js'
// import paymentRoutes from './routes/payment.route.js'
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51QVZDdGLJCcpxXdfUnVScvWNJoQavp3yKhaQMk7J09ZyOQeFbKeiWeFRFnBWhO81l0lUDbwdTXQgDf1gEw3LWZrP00ptC7aqrI');


dotenv.config();

const app = express()
connectDB()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173', // or wherever your frontend is running
    credentials: true,
}))
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes);
app.use('/api/upload',uploadRoutes)
app.use('/api/orders',orderRoutes)
// app.use('/api/create-checkout-session',async(req,res)=>{
//     const { products,cartItems, orderId } = req.body
 
//   if (!Array.isArray(products)) {
//     return res.status(400).json({ message: '`Products` should be an array' });
//   }
//   const line_items = products.map((product)=>({
//     price_data:{
//       currency:'usd',
//       product_data:{
//         name:product.name,
//         images:[product.image]
//       },
//       unit_amount: Math.round(product.price*100),
//     },
//     quantity:product.qty
//   }));
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types:['card'],
//       line_items,
//       mode:'payment',
//       success_url:'http://localhost:5000/success',
//       cancel_url:'http://localhost:5000/cancel',
//       metadata: {
//         orderId,
//       },
//     })
//     res.status(200).json({ id: session.id });
//   } catch (error) {
//     console.log("Stripe error",error.message)
//   }
// })


const  __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});