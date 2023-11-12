const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

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
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials!"));
    }
    const token = jwt.sign(
      {
        id: validUser.id,
      },
      process.env.JWT_SECRET_KEY
    );
    const { username: usernameDB, email: emailDB } = validUser;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Valid user",
        username: usernameDB,
        email: emailDB,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin };
