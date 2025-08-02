const express =require('express')
const connectDB=require('./db/connection')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const DefaultData=require('./default')
const appRouter=require('./route/routes')



require('dotenv').config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))
app.use('/',appRouter)

const port=process.env.PORT || 8000

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is running on port ${port}`))
        DefaultData()
    }
    catch(error){
        console.log(error)
    }
}

start()