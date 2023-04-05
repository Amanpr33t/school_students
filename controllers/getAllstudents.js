const connectDB = require('../db/connect')
const bcrypt = require('bcryptjs')
const { getAllStudentsQuery } = require('../queries')

const getAllStudents = async (req, res) => {
    try {
        connectDB.query(getAllStudentsQuery, (error, results) => {
            if (results.rows.length === 0) {
                return res.status(400).json('no students')
            }
            return res.status(400).json(results.rows)
        })
    } catch (error) {
        throw new Error(error)
    }

}

module.exports = getAllStudents