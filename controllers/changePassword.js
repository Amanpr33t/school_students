const connectDB = require('../db/connect')
const { checkEmailExistsForgotPassword, updatePasswordQuery, checkPassword } = require('../queries')
const bcrypt = require('bcryptjs')

const changePassword = (req, res) => {
    const { email, oldPassword, newPassword,role } = req.body
    let table
    if (role === 'admin') {
        table = 'auth'
    } else {
        table = 'student_bio'
    }
    try {
        connectDB.query(`SELECT * FROM ${table} WHERE email=${email} `, (error, results) => {
            if (results.rows.length === 0) {
                return res.status(400).json('no email exists')
            }
        })

        connectDB.query(`SELECT password FROM ${table} WHERE email=${email}`, async (error, results) => {
            const isMatch = await bcrypt.compare(oldPassword, results.rows[0].password)
            if (!isMatch) {
                return res.status(400).json('wrong password')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            connectDB.query(`UPDATE ${table} SET password=${password} WHERE email=${email}`, (error, results) => {
                return res.status(200).json('password updated')
            })

        })
    } catch (error) {
        throw new Error(error)
    }

}
module.exports = changePassword