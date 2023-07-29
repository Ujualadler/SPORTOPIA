const jwt = require("jsonwebtoken");
const authToken = require("../middleware/auth");
const turfModel = require("../models/turfSchema");

const turfRegistration = async (req, res) => {
  try {
    const {
      turfName,
      opening,
      closing,
      advance,
      total,
      phone,
      city,
      state,
      pin,
      street,
      turfType,
      preview,
      photos,
    } = req.body;
    const turf = await turfModel.find({ turfName: turfName });
    const admin = req.user._id;
    if (turf.length === 0) {
      turfModel
        .create({
          turfName,
          opening,
          closing,
          advance,
          total,
          phone,
          city,
          state,
          turfType,
          street,
          pin,
          photos,
          admin,
          logo:preview
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
      res.json({ status: true, message: "Turf successfully registered" });
    } else {
      res.json({ error: "Turf name already taken" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTurfs = async (req, res) => {
  try {
    const turfs = await turfModel.find({isTurfBlocked:false});
    res.json({ status: "success", result: turfs });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const getTurfsAdmin = async (req, res) => {
  try {
    const admin = req.user._id;
    const turfs = await turfModel.find({ admin: admin });
    res.json({ status: "success",result:turfs});
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const getTurfDetail = async (req, res) => {
  try {
    const id = req.query.id;
    const turfdata = await turfModel.findOne({ _id:id});
    if (turfdata) {
      res.status(200).json({ data: turfdata });
    } else {
      res.status(500).send({ error: "no turf" });
    }
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

const editTurf = async (req, res, next) => {
  const data = req.body;
  const id = req.query.id;
  try {
    await turfModel.updateOne(
      { _id: id },
      {
        $set: {
          turfName: data.turfName,
          phone: data.phone,
          logo: data.logo,
          city: data.city,
          state: data.state,
          pin: data.pin,
          street: data.street,
          turfType: data.turfType,
          opening: data.opening,
          closing: data.closing,
          advance: data.advance,
          total: data.total,
          photos: data.photos,
        },
      }
    );
    res.json({ status: "success" });
  } catch (error) {
    console.log(error.message);
    res.json({ status: "failed", message: error.message });
  }
};

module.exports = {
  turfRegistration,
  getTurfs,
  getTurfsAdmin,
  getTurfDetail,
  editTurf
};
