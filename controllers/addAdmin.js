const connectDB=require('../db/connect')
const bcrypt= require('bcryptjs')
const {addTeacherQuery,getAdmin, checkEmailExists}=require('../queries')

const addAdmin=async(req,res)=>{

    const email='admin@gmail.com'
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('admin',salt)
    const name='admin'
    const role='admin'

   

    connectDB.query("INSERT INTO auth(email,password,name,role,verificationtoken,verification_token_expiration_time) VALUES('admin@gmail.com','admin','admin','admin',null,null)",[email,hashedPassword,name,role], (error,results)=>{
        if(error) return error
     })


    
    }

module.exports=addAdmin