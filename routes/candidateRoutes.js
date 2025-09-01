const express = require("express");
const router = express.Router();
const User = require("../models/candidate");
const {jwtAuthMiddleware,generateToken} = require('../jwt');

//POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    //Create a new User document using the Mongoose model
    const newUser = new User(data);

    const response = await newUser.save();
    console.log("data saved"); 

    const payload = {
      id: response.id,
      name: response.name
    }

    const token = generateToken(payload);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    //Extract aadharNumber and password from req body
    const { aadharNumber, password } = req.body;

    //Find the user by aadharNumber
    const user = await User.findOne({ aadharNumber: aadharNumber });

    //If user does not exist or password does not match return error
    if (!user || !(user.password === password)) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    
    //generate token
    const payload = {
      id: user.id,
      name: user.name 
    }

    const token = generateToken(payload);

    //res.status(200).json({ user });
    res.json({token});  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    // get user data from decoded payload
    const userData = req.user;
    //console.log(userData); -> prints payload data

    //Find the user by id
    const userID = userData.id;
    const user = await User.findById(userID);

    if (!user) {
      res.status(401).json({error: "User does not exist or invalid id"});
    }

    res.status(200).json({user});

  } catch (err) {
    console.log(err);
    res.status(500).json({error: "Internal Server Error"});
  }
});

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; //Extract the id from token
    const {currentPassword, newPassword} = req.body; //Extract old and new password from req body

    //Find the user by userId
    const user = await User.findById(userId);

    //If password does not match, return error
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({error: 'Invalid username or password'});
    }

    //Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("Password Updated");
    res.status(200).json({message: "Password Updated"});
    
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;
