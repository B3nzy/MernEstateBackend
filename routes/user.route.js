const express = require("express");
const { verifyToken } = require("../utils/verifyUser");
const router = express.Router();
const { updateUser, deleteUser } = require("../controllers/user.controller");

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
