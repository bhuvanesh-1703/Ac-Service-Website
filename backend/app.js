const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require('cors')
const connectDB=require('./DB/db_connection')
const aiRouter=require('./Routes/aiRoute')
const careerRouter=require('./Routes/careerRoute')
const bookingRouter=require('./Routes/bookingRoute')
const authRouter=require("./Routes/authRoute")

const http = require('http');
const { Server } = require('socket.io');
const { initSocket } = require('./Socket/socket');

const app=express()
app.use(cors())
app.use(express.json())


const httpServer = http.createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin:"*",
    }
})

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id)
    socket.on("disconnect",()=>{
        console.log("A user disconnected")
    })
})

// Initialize global socket instance
initSocket(io);

//Database Connection
connectDB()

//Router
app.use('/api/ai',aiRouter)
app.use('/api/careers',careerRouter)
app.use('/api/bookings',bookingRouter)
app.use('/api/auth',authRouter)

const PORT=process.env.PORT || 5100

httpServer.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})