const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
const updateUser = require("../controllers/user.controller");

router.post("/update/:id", verifyToken, updateUser);

module.exports = router;
