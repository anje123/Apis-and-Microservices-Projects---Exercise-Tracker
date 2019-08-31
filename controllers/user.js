const  User = require("../models/users");
const express = require("express");
const router = express.Router();



router.post("/", async (req, res) => {
  const checkUser = await User.find({username: req.body.username});
  if(checkUser) return res.send("username already exists");
  
  const user = new User({
    username: req.body.username,
  });
  await user.save();
  res.send(user);
});

module.exports = router;
