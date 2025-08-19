const express = require("express");
const router = express.Router();
const User = require("./../models/user");

//POST route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    //Create a new User document using the Mongoose model
    const newUser = new User(data);

    const response = await newUser.save();
    console.log("data saved");

    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
