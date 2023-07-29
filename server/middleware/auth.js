const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const auth2client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

// const googleverify = async(req,res,next)=>{
//     try{
//         const token = req.header('Authorization')
//         if(token){
//             const ticket = await auth2client.verifyIdToken({
//                 idToken:token,
//                 audience:process.env.CLIENT_ID
//             })
//             req.user = ticket
//             console.log(req.user.payload.email)
//             next()
//         }
//         else{
//             res.json({ success: false })
 
//         }
//     }
//     catch(err){
//         res.json({success:false})
//     }
// }


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
    { _id: user._id,email: user.email},
    process.env.SECRET_KEY
  );
  return token;
}



const turfAdminToken = (data) => {
  const token = jwt.sign(
    { _id: data._id, email: data.email, name: data.name },
    process.env.SECRET_KEY
  );
  return token;
};

const adminToken = (data) => {
  console.log(data, "token data");
  const token = jwt.sign(
    { _id: data._id, email: data.email },
    process.env.SECRET_KEY
  );
  return token;
};

module.exports = {
  verifyToken,
  generateAuthToken,
  adminToken,
  turfAdminToken,
  // googleverify
};
