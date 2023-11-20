const express = require("express");
const router = express.Router();
const {
  createListing,
  deleteListing,
  updateListing,
  getListing,
} = require("../controllers/listing.controller");
const { verifyToken } = require("../utils/verifyUser");

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.get("/get/:id", verifyToken, getListing);
router.post("/update/:id", verifyToken, updateListing);

module.exports = router;
