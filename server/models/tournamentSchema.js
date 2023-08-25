const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  tournamentName: {
    type: String,
    required: true,
  },
  sportsType: {
    type: String,
    required: true,
  },
  startingDate: {
    type: Date,
    required: true,
  },
  startingTime: {
    type: String,
    required: true,
  },
  endingDate: {
    type: Date,
    required: true,
  },
  endingTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  detailedDocument: {
    type: String,
    required: true,
  },
  maximumTeams: {
    type: Number,
    required: true,
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  joinedClubs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
    },
  ],
  isCancelled: {
    type: Boolean,
    default:false
  },

});

const tournamentModel = mongoose.model("Tournament", tournamentSchema);
module.exports = tournamentModel;
