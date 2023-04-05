const nodemailer = require("nodemailer");

const sendEmail=async({from,to,subject,msg})=>{
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'gordon81@ethereal.email',
          pass: 'BfV8SVWqxrkzTXsZkA'
      },

  tls : { rejectUnauthorized: false }
});
  await transporter.sendMail({
  from,to,subject,html:msg
})
}
module.exports=sendEmail