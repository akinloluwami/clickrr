const User = require("../models/Users");
const Link = require("../models/Links");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
module.exports = {
  // POST /api/links/add
  add: async (req, res) => {
    const { title, url } = req.body;
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const isValidURL =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
        title
      );
    const isValidTitle = /^[a-zA-Z0-9-_]+$/.test(title);
    if (!title || !url) {
      return res.status(400).json({
        message: "Please fill out all fields",
      });
    } else if (!isValidURL) {
      return res.status(400).json({
        message: "Invalid URL",
      });
    } else if (!isValidTitle) {
      return res.status(400).json({
        message:
          "Title can only contain letters, numbers, dashes, and underscores",
      });
    } else {
      const link = new Link({
        title: title,
        url: url,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        user: user._id,
      });
      const savedLink = await link.save();
      return res.status(200).json({
        message: "Link added successfully",
        link: savedLink,
      });
    }
  },
};
