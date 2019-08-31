const  User = require("../models/users");
const express = require("express");
const router = express.Router();



router.post("/new-user", async (req, res) => {
  const checkUser = await User.find({username: req.body.username});
  if(checkUser) return res.send("username already exists");
  
  const user = new User({
    username: req.body.username,
  });
  await user.save();
  res.send(user);
});

router.get("/users",async(req,res)=>{
  const users = await User.find();
  res.send(users);
});


module.exports = router;
