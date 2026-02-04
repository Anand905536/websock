import dotenv from 'dotenv';
dotenv.config()
import express from "express";
import cors from 'cors'
import { db } from './src/config/db.js';
import userRoute from './src/routes/user.route.js'

const app = express()

// route redirection
app.use(cors());
app.use(express.json())
app.use('/auth', userRoute)

// database connection
db();

// server connected
const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`🚀 Server is running on the port:${PORT} 🚀`) })