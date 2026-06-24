const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const connectDB=require('./DB/db_connection')
const aiRouter=require('./Routes/aiRoute')
const careerRouter=require('./Routes/careerRoute')
const bookingRouter=require('./Routes/bookingRoute')
const authRouter=require("./Routes/authRoute")



const app=express()
app.use(cors())
app.use(express.json())

//Database Connection
connectDB()

//Router
app.use('/api/ai',aiRouter)
app.use('/api/careers',careerRouter)
app.use('/api/bookings',bookingRouter)
app.use('/api/auth',authRouter)

const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})