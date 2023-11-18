const Listing = require("../models/listing.model");

const createListing = async (req, res, next) => {
  try {
    const listingData = new Listing({
      ...req.body,
      userRef: req.user.id,
    });
    const listing = await listingData.save();
    res.status(201).json({
      success: true,
      listing,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createListing;
