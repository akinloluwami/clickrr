const bcrypt = require("bcrypt");
const User = require("../models/Users");
const crypto = require("crypto");

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
      //   user.save();
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    }
  },
};
