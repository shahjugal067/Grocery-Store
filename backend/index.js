import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js'
dotenv.config();

const app = express()

connectDB()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})