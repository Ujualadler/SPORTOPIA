const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const verifyToken = async (req, res, next) => {
  let token = req.header("Authorization");

  try {
    if (!token)
      return res
        .status(404)
        .json({ message: "Authentication failed: no token provided." });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    console.log(req.user._id);
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Authentication failed: invalid token." });
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { _id: user._id, email: user.email, role: "user" },
    process.env.SECRET_KEY
  );
  return token;
};

const turfAdminToken = (data) => {
  const token = jwt.sign(
    { _id: data._id, email: data.email, name: data.name, role: "turfAdmin" },
    process.env.SECRET_KEY
  );
  return token;
};

const adminToken = (data) => {
  console.log(data, "token data");
  const token = jwt.sign(
    { _id: data._id, email: data.email, role: "admin" },
    process.env.SECRET_KEY
  );
  return token;
};

module.exports = {
  verifyToken,
  generateAuthToken,
  adminToken,
  turfAdminToken,
};
