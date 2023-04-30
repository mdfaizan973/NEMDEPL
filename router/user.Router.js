const express = require("express");
const { userModel } = require("../module/user.modul");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Register ------------------------->>>>^^^^^^----
userRouter.post("/register", async (req, res) => {
  const { name, pass, email } = req.body;
  bcrypt.hash(pass, 4, async (err, hash) => {
    const user = new userModel({ name, pass: hash, email });
    await user.save();
    res.send({ message: "Added new user" });
  });
});
//------------------------->>>>^^^^^^----
//------------------------->>>>^^^^^^----
//------------------------->>>>^^^^^^----

//LogIn ------------------------->>>>^^^^^^----
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await userModel.find({ email });

    if (user.length > 0) {
      bcrypt.compare(pass, user[0].hash, async (err, result) => {
        if (!result) {
          var token = jwt.sign(
            { authorID: user[0]._id, author: user[0].name },
            "newmasai"
          );
          res.send({ msg: "Login successFul", token: token });
        } else {
          res.send({ msg: "Login errorFul" });
        }
      });
    } else {
      res.send({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = { userRouter };
