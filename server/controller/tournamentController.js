const userModel = require("../models/userSchema");
const clubModel = require("../models/clubSchema");
const cloudinary = require("../config/cloudinary");
const tournamentModel = require("../models/tournamentSchema");
const fs = require("fs");

const createTournament = async (req, res) => {
  try {
    const {
      tournamentName,
      sportsType,
      startingDate,
      description,
      startingTime,
      endingDate,
      endingTime,
      maximumTeams,
      clubId,
    } = req.body;
    const detailedDocument = req.file;

    let pdf;
    if (detailedDocument) {
      const uploadOptions = {
        resource_type: 'auto', // Automatically determine the resource type
      };
      const upload = await cloudinary.cloudinary.uploader.upload(
        detailedDocument.path,
        uploadOptions
      );

        pdf = upload.secure_url;
        fs.unlinkSync(detailedDocument.path); // Unlink the local path of the uploaded file
      
    
    const newTournament = new tournamentModel({
        tournamentName,
        sportsType,
        startingDate,
        description,
        startingTime,
        endingDate,
        endingTime,
        maximumTeams,
        clubId,
        detailedDocument: pdf, // Save the URL of the uploaded document
      });
  
      const savedTournament = await newTournament.save();
      res.status(201).json({ status: "success", tournament: savedTournament });
    
    }
  } catch (error) {
    console.error("Error creating tournament:", error);
    res.status(500).json({ error: "An error occurred while creating the tournament" });
  }
};

const getTournaments = async (req, res) => {
    try {
      const clubId = req.query.id;
      
      // Calculate the date that is 2 days from now
      const twoDaysLater = new Date();
      twoDaysLater.setDate(twoDaysLater.getDate() + 2); 

      const result = await tournamentModel.find({
        $and: [
          { clubId: { $ne: clubId } },
          { isCancelled: false },
          { startingDate: { $gte: twoDaysLater } }
        ]
      }).populate('clubId');
      
      res.status(200).json({ result });
    } catch (error) {
      console.error("Error fetching tournaments:", error);
      res.status(500).json({ error: "An error occurred while fetching tournaments" });
    }
  };

  const getTournamentDetails=async(req,res)=>{
    try {
      const id=req.query.id
      const clubId = req.query.clubId

      const result=await tournamentModel.findOne({_id:id}).populate('clubId')
      const data=await tournamentModel.findOne({_id:id,clubId:clubId})
      const joined=await tournamentModel.findOne({_id:id,joinedClubs:clubId})
      
      if(!joined){
      if(!data){
      if(result){
        res.status(200).json({result,status:true})
      }
    }else{
      res.status(200).json({data,status:false})
    }
  }else{
      res.status(200).json({joined,status:'join'})

  }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching tournamentDetails" });
    }
  }

  const joinTournament = async (req, res) => {
    try {
      const { id, clubId } = req.body;
  
      const tournament = await tournamentModel.findOne({
        _id: id,
        joinedClubs: clubId,
      });

      const verifyLength=await tournamentModel.findById({_id: id})
      const lengthOfClub=verifyLength.joinedClubs.length
      if(lengthOfClub<verifyLength.maximumTeams){
      if (!tournament) {
        const updatedTournament = await tournamentModel.findOneAndUpdate(
          { _id: id },
          { $addToSet: { joinedClubs: clubId } },
          { new: true }
        );
  
        if (updatedTournament) {
          res.status(200).json({ result: "success" });
        } else {
          res.status(404).json({ error: "Tournament not found" });
        }
      } else {
        res.status(200).json({ result: 'joined' });
      }
    }else{
      res.status(200).json({ result: 'limit' });
    }
    } catch (error) {
      console.error("Error handling club's participation:", error);
      res.status(500).json({ error: "An error occurred while handling participation" });
    }
  };

  const getJoinedTournaments=async(req,res)=>{
    try {
      const id=req.query.id
      const result=await tournamentModel.find({joinedClubs:id}).populate('clubId')
      res.status(200).json({ result});
    } catch (error) {
      res.status(500).json({ error: "An error occurred while handling getting data" });
    }
  }

  const getYourTournaments=async(req,res)=>{
    try {
      const id=req.query.id
      const result=await tournamentModel.find({clubId:id}).populate('clubId')
      res.status(200).json({ result});
    } catch (error) {
      res.status(500).json({ error: "An error occurred while handling getting data" });
    }
  }

  const leaveTournament=async(req,res)=>{
    try {
      const id=req.query.id
      const clubId=req.query.clubId

      const updatedTournament = await tournamentModel.findOneAndUpdate(
        { _id: id, joinedClubs: clubId },
        { $pull: { joinedClubs: clubId } },
        { new: true }
      )

      res.status(200).json({status:true})
      
    } catch (error) {
      res.status(500).json({ error: "An error occurred while leaving tournament" });
    }
  }

  const cancelTournament=async(req,res)=>{
    try {
      const id=req.query.id

      const updatedTournament = await tournamentModel.findOneAndUpdate(
        { _id: id},
        { $set: { isCancelled: true } },
        { new: true }
      );

      res.status(200).json({status:true})
      
    } catch (error) {
      res.status(500).json({ error: "An error occurred while leaving tournament" });
    }
  }

  const editTournament = async (req, res) => {
    try {
      const id = req.query.id;
      const {
        tournamentName,
        sportsType,
        description,
        maximumTeams,
      } = req.body;
      const detailedDocument = req.file;
  
      let pdf;
      if (detailedDocument) {
        const uploadOptions = {
          resource_type: 'auto', // Automatically determine the resource type
        };
        const upload = await cloudinary.uploader.upload(
          detailedDocument.path,
          uploadOptions
        );
  
        pdf = upload.secure_url;
        fs.unlinkSync(detailedDocument.path); // Unlink the local path of the uploaded file
      }
  
      const newTournament = await tournamentModel.updateOne(
        { _id: id },
        {
          $set: {
            tournamentName,
            sportsType,
            description,
            maximumTeams,
            detailedDocument: pdf, // Save the URL of the uploaded document
          },
        }
      );
      res.status(201).json({ status: "success", tournament: newTournament });
    } catch (error) {
      console.error("Error editing tournament:", error);
      res.status(500).json({ error: "An error occurred while editing the tournament" });
    }
  };
  
  
  
  
  

module.exports = {
  createTournament,
  getTournaments,
  getTournamentDetails,
  joinTournament,
  getJoinedTournaments,
  getYourTournaments,
  leaveTournament,
  cancelTournament,
  editTournament
};
