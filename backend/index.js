import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
import userRoutes from './routes/user.route.js'
import categoryRoutes from './routes/category.route.js'
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
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})