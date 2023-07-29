const express= require('express')
const router=express.Router()
const adminController=require('../controller/adminController')
const auth=require("../middleware/auth")

router.post('/login',adminController.adminLogin)
router.get('/userlist',auth.verifyToken,adminController.userList)
router.get('/blockUser',auth.verifyToken,adminController.userBlock)
router.get('/turflist',auth.verifyToken,adminController.turfList)
router.get('/blockTurf',auth.verifyToken,adminController.turfBlock)


module.exports=router