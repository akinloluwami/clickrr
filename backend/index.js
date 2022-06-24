require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(bodyParser.json());
app.use(cors());

const db = process.env.MONGODB_URI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB...Get me litt 🔥🔥🔥");
  })
  .catch((err) => {
    console.log("Error. Could not connect to Mongo", err);
  });

const port = process.env.PORT || 6969;

app.listen(port, () => {
  console.log(`SERVER IS LIVE ON http://localhost:${process.env.PORT}!`);
});
