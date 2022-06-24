const bcrypt = require("bcrypt");
const User = require("../models/Users");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

module.exports = {
  // POST /api/auth/signup
  signup: async (req, res) => {
    const { email, password, confirmPassword, username } = req.body;

    const user = new User({
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 10),
      confirmPassword: bcrypt.hashSync(confirmPassword, 10),
      isVerified: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      otp: crypto.randomBytes(3).toString("hex"),
      otpExpiry: Date.now() + 1000 * 60 * 15,
    });

    const emailExists = await User.findOne({ email: email });
    const usernameExists = await User.findOne({ username: username });
    const passwordStrength = password.length >= 8;
    const passwordsMatch = password === confirmPassword;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // const validUsername = /^[a-zA-Z0-9]+$/.test(username);
    const validUsername = /^[a-zA-Z0-9]{3,}$/.test(username);

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill out all fields",
      });
    } else if (emailExists) {
      return res.status(400).json({
        message: "Email already exists",
      });
    } else if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    } else if (!validEmail) {
      return res.status(400).json({
        message: "Invalid email",
      });
    } else if (!validUsername) {
      return res.status(400).json({
        message:
          "Username can only contain letters and numbers and must be at least 3 characters long",
      });
    } else if (!passwordsMatch) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    } else if (!passwordStrength) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    } else {
      user.save();
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    }
  },
  // POST /api/auth/verify OTP
  verifyOTP: async (req, res) => {
    const user = await User.findOne({ otp: req.body.otp });
    if (!user) {
      return res.status(400).json({
        message: "OTP is invalid",
      });
    } else if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    } else if (user) {
      user.isEmailVerified = true;
      user.otp = "";
      user.otpExpiry = "";
      user.save();
      return res.status(200).json({
        message: "Email verified successfully",
        user,
      });
    } else {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
  },
  //POST /api/auth/login
  login: async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    } else if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        message: "Username or password is incorrect",
      });
    } else {
      user.lastLogin = Date.now();
      user.save();
      return res.status(200).json({
        message: "Login successful",
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET),
      });
    }
  },
};
