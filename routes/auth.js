const express = require("express");
const User = require('../models/user');
const bodyParser = require("body-parser");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
      const {name,email,password,type} = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User with same email already exists!" });
      }
  
      const hashedPassword = await bcryptjs.hash(password, 8);
  
      let user = new User({
        name,
        email,
        password: hashedPassword,
        type,
      });
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

//signin
  authRouter.post("/api/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exist!" });
      }
  
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Incorrect password." });
      }
      ///const path = "C:\Users\sanja\.vscode\.vscode\Web\Ecofeast.html";
      const token = jwt.sign({ id: user._id }, "passwordKey");
      res.cookie("token", token);
      //res.sendFile('Ecofeast.html', { root: path.join(__dirname, '../public') });
      const path = require('path');

// ...

const rootPath = path.resolve(__dirname, 'C:\\Users\\sanja\\.vscode\\.vscode\\EcoFeast-main');
const filePath = path.join(rootPath, 'Ecofeast.html');
res.sendFile(filePath);
    
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  //checking if token is vail
  authRouter.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("x-auth-token");
      if (!token) return res.json(false);
      const verified = jwt.verify(token, "passwordKey");
      if (!verified) return res.json(false);
  
      const user = await User.findById(verified.id);
      if (!user) return res.json(false);
      res.json(true);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // get user data
    authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  });
module.exports = authRouter;