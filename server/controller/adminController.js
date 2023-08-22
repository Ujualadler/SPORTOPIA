const jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");
const adminModel = require("../models/adminSchema");
const userModel = require("../models/userSchema");
const turfModel = require("../models/turfSchema");

// admin login details

const adminLogin = async (req, res, next) => {
  try {
    let result = {
      Status: false,
      message: null,
      token: null,
    };
    let adminDetails = req.body;
    const admin = await adminModel.findOne({ email: adminDetails.email });
    if (admin) {
      if (admin.password === adminDetails.password) {
        const token = authToken.adminToken(admin);
        result.Status = true;
        result.token = token;
        res.json({ result });
      } else {
        result.message = "Your Password not matched";
        res.json({ result });
      }
    } else {
      result.message = "Your email is wrong";
      res.json({ result });
    }
  } catch (error) {
    console.log(error);
  }
};

// listing user on admin side

const userList = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.json({ status: "success", result: user });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

// blocking user

const userBlock = async (req, res) => {
  try {
    const id = req.query.id;
    let data = await userModel.findOne({ _id: id });
    if (data.isBlocked === true) {
      await userModel.updateOne({ _id: id }, { $set: { isBlocked: false } });
    } else {
      await userModel.updateOne({ _id: id }, { $set: { isBlocked: true } });
    }
    let resend = await userModel.find({});
    res.json({ result: resend, message: "success" });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

// listing turfs in admin side

const turfList = async (req, res) => {
  try {
    const turf = await turfModel.find({});
    res.json({ status: "success", result: turf });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

// blocking turfs

const turfBlock = async (req, res) => {
  try {
    const id = req.query.id;
    let data = await turfModel.find({ _id: id });
    if (data[0].isTurfBlocked === true) {
      await turfModel.updateOne(
        { _id: id },
        { $set: { isTurfBlocked: false } }
      );
    } else {
      await turfModel.updateOne({ _id: id }, { $set: { isTurfBlocked: true } });
    }
    let resend = await turfModel.find({});
    res.json({ result: resend, message: "success" });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

module.exports = {
  adminLogin,
  userList,
  userBlock,
  turfList,
  turfBlock,
};
