require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`SERVER IS LIVE ON http://localhost:${process.env.PORT}!`);
});
