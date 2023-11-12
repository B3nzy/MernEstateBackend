const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(errorHandler(err.statusCode, err.message));
  }
};

module.exports = signup;
