require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Connecting to the database
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB Database!");
  })
  .catch((err) => {
    console.log(`${err}`);
  });

// Running the server on specified PORT
app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

// All the APIs
// Authetication API
const authRouter = require("./routes/auth.route");
app.use("/api/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "INternal Server Error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
