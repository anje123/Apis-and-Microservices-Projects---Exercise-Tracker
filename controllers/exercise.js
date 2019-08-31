const Exercise  = require("../models/exercise");
const express = require("express");
const router = express.Router();

router.post("/",async (req, res) => {

  try {
    const exercise = new Exercise({
      userId: req.body.userId,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date
    });
    await exercise.save();
    res.send(exercise);
  } catch (error) {
    console.log(error);
    
  }
});



module.exports = router;
