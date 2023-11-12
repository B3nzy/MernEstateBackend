require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB Database!");
  })
  .catch((err) => {
    console.log(`${err}`);
  });

const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
