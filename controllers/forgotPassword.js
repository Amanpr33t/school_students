const connectDB = require('../db/connect')
const { checkEmailExistsForgotPassword, adminEmail, updateAuthQuery, getToken, updatePasswordQuery, emptyTokenQuery, updateVerificationTokenExpirationQuery, getVerificationTokenExpirationQuery } = require('../queries')
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const { table } = require('console')

const forgotPassword = (req, res) => {
    try {
        const { email,role } = req.body
        let table
        if (role === 'admin') {
             table = 'auth'
        } else {
             table = 'student_bio'
        }
        connectDB.query(`SELECT * FROM ${table} WHERE email=${email}`, (error, results) => {
            if (results.rows.length === 0) {
                return res.status(400).json('no email exists')
            }
            connectDB.query('SELECT email FROM auth', async (error, results) => {
                const verificationtoken = crypto.randomBytes(3).toString('hex')
                const emailInput = {
                    from: results.rows[0].email,
                    to: email,
                    subject: 'Student website token',
                    msg: `<h4>Hello </h4>,your token for password change is ${verificationtoken}`
                }
                await sendEmail(emailInput)
                const verification_token_expiration_time = Date.now() + 600000

                connectDB.query(`UPDATE ${table} SET verification_token_expiration_time=${verification_token_expiration_time} WHERE email=${email}`, (error, results) => {

                })
                connectDB.query(`UPDATE ${table} SET verificationtoken=${verificationtoken} WHERE email=${email}`, (error, results) => {
                    return res.status(200).json('token has been sent to email')
                })
            })

        })
    } catch (error) {
        throw new Error(error)
    }

}

const verifyToken = (req, res) => {
    try {
        const { email, verificationtoken,role } = req.body
        let table
        if (role === 'admin') {
             table = 'auth'
        } else {
             table = 'student_bio'
        }

        connectDB.query(`SELECT verification_token_expiration_time FROM ${table} WHERE email=${email}`, async (error, results) => {
            if (+results.rows[0].verification_token_expiration_time < Date.now()) {
                connectDB.query(emptyTokenQuery, [email], async (error, results) => {
                })
                connectDB.query(`UPDATE ${table} SET verification_token_expiration_time=null WHERE email=${email}`, (error, results) => {
                })
                return res.status(400).json('token expired')
            }
        })

        connectDB.query(`SELECT verificationtoken FROM ${auth} WHERE email=${email}`, (error, results) => {
            if (results.rows[0].verificationtoken === verificationtoken) {
                connectDB.query(`UPDATE ${table} SET verificationtoken='' WHERE email=${email}`, async (error, results) => {
                })
                connectDB.query(`UPDATE ${table} SET verification_token_expiration_time=null WHERE email=${email}`,  (error, results) => {
                })
                return res.status(200).json({ status: 'ok' })

            }
            return res.status(200).json('invalid token')
        })

    } catch (error) {
        throw new Error(error)
    }


}

const updatePassword = (req, res) => {
    try {
        
        const { password, email,role } = req.body
        let table
        if (role === 'admin') {
             table = 'auth'
        } else {
             table = 'student_bio'
        }
        connectDB.query(`SELECT * FROM ${table} WHERE email=${email}`, async (error, results) => {
            if (results.rows.length === 0) {
                return res.status(400).json('no email exists')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            connectDB.query(`UPDATE ${table} SET password=${hashedPassword} WHERE email=${email}`, (error, results) => {
                return res.status(200).json('password updated')
            })
        })
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = {
    forgotPassword, verifyToken, updatePassword
}