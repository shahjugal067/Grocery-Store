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
import paymentRoutes from './routes/payment.route.js'



dotenv.config();

const app = express()
connectDB()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use('/api/users',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes);
app.use('/api/upload',uploadRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/payment',paymentRoutes)

app.get('/api/config/stripe',(req,res)=>{
    res.send(process.env.STRIPE_KEY)
})

const  __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});