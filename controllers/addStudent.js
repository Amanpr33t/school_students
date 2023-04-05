const connectDB = require('../db/connect')
const bcrypt = require('bcryptjs')
const { studentExistsQuery, addStudentQuery } = require('../queries')

const addStudent = async (req, res) => {
    try {
        const { name, email, dob, section, password, image, class_name,role } = req.body
        connectDB.query(studentExistsQuery,[email], (error, results) => {
            if (results !== undefined) {
                return res.status(400).json('email already exists')
            }
            connectDB.query(addStudentQuery, [name, email, new Date(dob), section, password, image, class_name,role], (error, results) => {
                if (error) throw error;
                res.status(200).json('student added')
            })
        })
    } catch (error) {
        throw new Error(error)
    }

}

module.exports = addStudent