const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong!",
      errorMessage: err.message,
    });
  }
};

module.exports = signup;
