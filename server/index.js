const express = require('express');
const mongoose = require('mongoose')
const cors=require('cors')
const dotenv = require('dotenv').config()
const cookieParser = require("cookie-parser")


const userRouter =require("./routes/users.js");
const turfRouter =require("./routes/turf.js");
const adminRouter =require("./routes/admin.js");
const bookingRouter =require("./routes/booking.js");


const app = express()
app.use(express.json({limit:'100mb',extended:true}))
app.use(cors());
app.use(express.static("public"))

app.use("/", userRouter)
app.use("/turf",turfRouter)
app.use("/admin",adminRouter)
app.use("/booking",bookingRouter)



const PORT = process.env.MONGODB_PORT;

mongoose.connect('mongodb://127.0.0.1:27017/SPORTOPIA-PROJECT', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
});