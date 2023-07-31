const express= require('express')
const router=express.Router()
const bookingController=require('../controller/bookingController')
const auth=require("../middleware/auth")

router.post('/create-checkout-session',auth.verifyToken,bookingController.createCheckOut)
router.post('/bookingSuccess',auth.verifyToken,bookingController.paymentSuccess)
router.get('/bookingHistory',auth.verifyToken,bookingController.bookingHistory)
router.get('/turfBookingHistory',auth.verifyToken,bookingController.turfBookingHistory)

module.exports=router
