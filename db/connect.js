const Pool= require('pg').Pool
const connectDB=new Pool({
    user:"postgres",
    host:"localhost",
    database:"students",
    password:"Harman@95",
    port:5432
})
module.exports=connectDB