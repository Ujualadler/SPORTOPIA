const express= require('express')
const router=express.Router()
const turfAdminController=require('../controller/turfAdminController')
const turfController=require('../controller/turfController')
const auth=require("../middleware/auth")

router.post('/signup',turfAdminController.signUp)
router.post('/verifyTurf',turfAdminController.verifyTurf)
router.post('/login',turfAdminController.login)
router.post('/registration',auth.verifyToken,turfController.turfRegistration)
router.get('/getTurfsAdmin',auth.verifyToken,turfController.getTurfsAdmin)
router.get('/getTurfDetail',auth.verifyToken,turfController.getTurfDetail)
router.post('/turfEdit',auth.verifyToken,turfController.editTurf)




module.exports=router