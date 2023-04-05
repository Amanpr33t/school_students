const express = require('express')
const app= express()
//app.use(express.static('./public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
const connectDB= require('./db/connect')
const port=  7002
require('dotenv').config()
/*const mongoose= require('mongoose')
mongoose.set('strictQuery', true)
require('dotenv').config()
const errorHandlerMiddleware=require('./middleware/errorHandlerMiddleware')*/
const notFound=require('./middleware/notFound')
/*const cors= require('cors')
app.use(cors())*/
const fileUpload=require('express-fileupload')
app.use(fileUpload({useTempFiles:true}))
const cloudinary= require('cloudinary').v2
cloudinary.config({
   cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
})

const adminRouter=require('./routes/adminRouter')
const studentRouter=require('./routes/studentRouter')

app.use('/admin',adminRouter)
app.use('/student',studentRouter)
app.use(notFound)
/*app.use(errorHandlerMiddleware)*/

const start=async()=>{
    try{
        app.listen(port,console.log(`server running on port ${port}...`))
    }catch(error){
        console.log(error)
    }
}
 start()  
