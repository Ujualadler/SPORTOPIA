const express= require('express')
const router=express.Router()
const paymentController=require('../controller/paymentController')
const auth=require("../middleware/auth")

router.post('/create-checkout-session',auth.verifyToken,paymentController.createCheckOut)
router.post('/bookingSuccess',auth.verifyToken,paymentController.paymentSuccess)

module.exports=router
