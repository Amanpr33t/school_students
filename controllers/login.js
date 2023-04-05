const connectDB = require('../db/connect')
const { addTeacherQuery, getAdmin, checkEmailExists, checkPassword } = require('../queries')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const adminLogin = (req, res) => {
    try {
        const { email, password, role } = req.body

        if (email === '' || password === '' || role === '') {
            return res.status(400).json('enter all credentils')
        }
        let table
        if (role === 'admin') {
             table = 'auth'
        } else {
             table = 'student_bio'
        }
        connectDB.query(`SELECT * FROM auth WHERE email=${email.toString()}`, (error, results) => {
            console.log(table,email,results.rows)
            if (results.rows.length === 0) {
                return res.status(400).json('email does not exist')
            }
            connectDB.query(`SELECT password FROM ${table} WHERE email=${email}`, async (error, results) => {
                const isMatch = await bcrypt.compare(password, results.rows[0].password)
                const token = jwt.sign(
                    { email, role },
                    process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_LIFETIME
                })
                if (isMatch) {
                    if(table==='auth'){
                        return res.status(200).json({ status: 'ok', authToken: token })
                    }else{
                        let marks 
                        let bioData
                        let student_id
                        connectDB.query(`SELECT * FROM student_bio WHERE email=${email}`, (error, results) => {
                            bioData=results.rows[0]
                            student_id=results.rows[0].student_id
                            (`SELECT * FROM student_marks WHERE student_id=${student_id}`, (error, results) => {
                                marks=results.rows[0]
                            })
                        })
                        connectDB.query
                        return res.status(200).json({ status: 'ok',bioData,marks })
                    }
                    
                }
                return res.status(400).json('wrong password')
            })
        })


    } catch (error) {
        throw new Error(error)
    }

}

module.exports = adminLogin