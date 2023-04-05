const connectDB = require('../db/connect')
const bcrypt = require('bcryptjs')
const { addStudentMarksQuery,studentExistsQuery } = require('../queries')
const addStudentMarks = async (req, res) => {
    try {
        const { student_id,maths,science,english,punjabi,social_science } = req.body
        connectDB.query(studentExistsQuery,[student_id], (error, results) => {
            if (results !== undefined) {
                return res.status(400).json('email already exists')
            }
            connectDB.query(addStudentMarksQuery,[student_id,maths,science,english,punjabi,social_science] , (error, results) => {
                if (error) throw error;
                res.status(200).json('student added')
            })
        })
    } catch (error) {
        throw new Error(error)
    }

}

module.exports = addStudentMarks