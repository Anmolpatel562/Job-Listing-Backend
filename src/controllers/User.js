const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this Email already registered !!",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, phone, password: encryptedPassword });
    res.status(200).json({
      message: "User registered Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const userLogIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      return res.status(400).json({
        message: "User with this Email not found !!",
      });
    }
    var isPasswordMatched = await bcrypt.compare( 
      password,
      userDetails.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect Password !!",
      });
    }
    const token = jwt.sign({ userId:userDetails._id}, process.env.SECRET_KEY, {
      expiresIn: "60h",
    });

    res.status(200).json({
      message: "User Logged In Successfully.",
      token:token,
      name:userDetails.name,
      userId:userDetails._id
    });
  } catch (error) {
     next(error);
  }
};

module.exports = { registerUser,userLogIn };
