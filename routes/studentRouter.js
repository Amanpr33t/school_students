const express= require('express')
const router= express.Router()

const login=require('../controllers/login')
const changePassword= require('../controllers/changePassword')
const {updatePassword,forgotPassword,verifyToken}=require('../controllers/forgotPassword')


router.post('/login',login)
router.post('/changePassword',changePassword)
router.post('/forgotPassword',forgotPassword)
router.post('/updatePassword',updatePassword)
router.post('/verifyToken',verifyToken)

module.exports= router