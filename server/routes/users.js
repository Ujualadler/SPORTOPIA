const express= require('express')
const router=express.Router()
const userController=require('../controller/userController')
const turfController=require('../controller/turfController')
const auth=require("../middleware/auth")

router.post('/signUp',userController.signUp)
router.post('/verify',userController.verifyMail)
router.post('/login',userController.login)
router.post('/googlelogin',userController.googlelogin)
router.get('/getTurfs',turfController.getTurfs)
router.get('/profile',auth.verifyToken,userController.userProfile)
router.get('/getUserDetail',auth.verifyToken,userController.getUserDetail)
router.post('/userEdit',auth.verifyToken,userController.editProfile)
router.get('/getTurfDetail',auth.verifyToken,turfController.getTurfDetail)
router.post('/otpLogin',userController.otpLogin)




module.exports=router
