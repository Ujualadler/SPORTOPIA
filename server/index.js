const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/dbConnection");
const socketIo = require("socket.io");

const userRouter = require("./routes/users.js");
const turfRouter = require("./routes/turf.js");
const adminRouter = require("./routes/admin.js");

const app = express();
app.use(express.json({ limit: "100mb", extended: true }));
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/", userRouter);
app.use("/turf", turfRouter);
app.use("/admin", adminRouter);

const PORT = process.env.MONGODB_PORT;

connectDb();

const server = app.listen(PORT, () =>
  console.log(`Server started on port: ${PORT}`)
);

const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
}).of("/chat")


io.on("connection", (socket) => {
  socket.on("joinRoom", (clubId) => {
    // Join the specific room based on the clubId
    socket.join(clubId);
    console.log(`Socket joined room: ${clubId}`);
  });

  socket.on("chatMessage", (receivedClubId, message) => {
    console.log(`Received message: ${message} in room: ${receivedClubId}`);
    console.log("dfghjkfghjklfghjk",message)
    
    // Emit the message to the specific room based on the clubId
    io.to(receivedClubId).emit("message", message, receivedClubId);
  });
  socket.on("error" , err =>{
    console.log('backend error ' , err);
  })

  socket.on("disconnect", (ev) => {
    console.log("Socket disconnected" , ev);
  });
});



//  Turf booking socket
// const bookingIo = socketIo(server, {
//   cors: {
//     origin: '*',
//     credentials: true
//   }
// }).of("/bookingIo")

// bookingIo.on("connection", (socket) => {
//   socket.on("joinBooking", (clubId) => {
//     // Join the specific room based on the clubId
//     socket.join(clubId);
//     console.log(`Socket joined room: ${clubId}`);
//   });

//   socket.on("updateBooking", (receivedClubId) => {
//     console.log(`Received message:  in room: ${receivedClubId}`);
//     console.log("booking", receivedClubId)
    
//     // Emit the message to the specific room based on the clubId
//     io.to(receivedClubId).emit("message", receivedClubId);
//   });
//   socket.on("error" , err =>{
//     console.log('backend error ' , err);
//   })

//   socket.on("disconnect", (ev) => {
//     console.log("Socket disconnected" , ev);
//   });
// });