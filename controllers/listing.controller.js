const Listing = require("../models/listing.model");
const { findById } = require("../models/user.model");
const errorHandler = require("../utils/error");

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

const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    } else if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }
    const deletedListingData = await Listing.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Listing has been deleted!",
      // deletedListingData,
    });
  } catch (err) {
    next(err);
  }
};

const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    console.log(listing);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    } else if (req.user.id !== listing.userRef.toString()) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    } else {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body,
            userRef: req.user.id,
          },
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        updatedListing,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { createListing, deleteListing, updateListing };
