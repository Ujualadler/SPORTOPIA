const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");
const turfModel = require("../models/turfAdminSchema");
const usercontroller = require("../controller/userController");
const turfAdminModel = require("../models/turfAdminSchema");

// turf admin registration

const signUp = async (req, res, next) => {
  try {
    let turfdetails = req.body;
    const turfadmin = await turfModel.find({ email: turfdetails.email });
    if (turfadmin.length === 0) {
      turfdetails.password = await bcrypt.hash(turfdetails.password, 10);
      turfModel
        .create({
          name: turfdetails.name,
          email: turfdetails.email,
          password: turfdetails.password,
          contactNumber: turfdetails.phone,
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      let turfdetail = await turfModel.findOne({ email: turfdetails.email });
      res.json({ status: true, result: turfdetails });
      usercontroller.sendVerifyMail(
        turfdetails.name,
        turfdetails.email,
        turfdetail._id,
        false
      );
    } else {
      return res.json({ error: "User already exists" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// verifying turfAdmin

const verifyTurf = async (req, res) => {
  try {
    let id = req.body.user_id;

    const updateInfo = await turfAdminModel.updateOne(
      { _id: id },
      { $set: { isVerified: 1 } }
    );
    res.json({ status: true });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// turf admin login details

const login = async (req, res, next) => {
  let turfSignUp = {
    Status: false,
    message: null,
    token: null,
    name: null,
  };
  try {
    const turfdetails = req.body;
    const findTurfAdmin = await turfModel.findOne({ email: turfdetails.email });
    if (findTurfAdmin) {
      if (findTurfAdmin.isVerified === 1) {
        const isMatch = await bcrypt.compare(
          turfdetails.password,
          findTurfAdmin.password
        );
        if (isMatch === true) {
          const token = authToken.turfAdminToken(findTurfAdmin);
          const name = findTurfAdmin.name;
          turfSignUp.message = "You are logged";
          turfSignUp.Status = true;
          turfSignUp.token = token;
          turfSignUp.name = findTurfAdmin.name;

          const obj = {
            token,
            name,
          };

          res
            .cookie("jwt", obj, {
              httpOnly: false,
              maxAge: 6000 * 1000,
            })
            .status(200)
            .send({ turfSignUp });
        } else {
          turfSignUp.message = "Wrong Password";
          turfSignUp.Status = false;
          res.json({ turfSignUp });
        }
      } else {
        turfSignUp.message = "Verify your email first";
        turfSignUp.Status = false;
        res.json({ turfSignUp });
      }
    } else {
      turfSignUp.message = " Wrong Email";
      turfSignUp.Status = false;
      res.json({ turfSignUp });
    }
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

module.exports = {
  signUp,
  login,
  verifyTurf,
};
