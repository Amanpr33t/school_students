const jwt= require('jsonwebtoken')
require('dotenv').config()
const {authenticateQuery}=require('../queries')
const connectDB=require('../db/connect')

const authenticate=async(req,res,next)=>{
    try {
        const authHeader= req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(400).json('authentication invalid')
        }
        const token= authHeader.split(' ')[1]
        
            const payload= jwt.verify(token, process.env.JWT_SECRET)
            req.user={
                email:payload.email,
                role:payload.role
             }
            if(!payload){
                   return res.status(400).json('authentication invalid')
            }
             connectDB.query(authenticateQuery,[payload.email,payload.role], (error,results)=>{
                if(results.rows.length===0){
                    return res.status(400).json('authentication invalid')
                }
             next()
                
             }) 
    } catch (error) {
        throw new Error(error)
    }
}
const authorizeAdmin=(req,res,next)=>{
    try {
        if(req.user.role!=='admin'){
            return res.status(400).json('authentication invalid')
        }
    } catch (error) {
        throw new Error(error)
    }
    next()

}
const authorizeStudent=(req,res,next)=>{
    try {
        if(req.user.role!=='student'){
            return res.status(400).json('authentication invalid')
        }
    } catch (error) {
        throw new Error(error)
    }
    next()
}

module.exports= {
    authenticate,authorizeAdmin,authorizeStudent
}