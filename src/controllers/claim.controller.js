const Claim = require("../models/claim");
const Item = require("../models/item");

// CREATE claim
const createClaim = async (req, res) => {
  try {
    const { itemId, proof } = req.body;

    const claim = await Claim.create({
      itemId,
      proof
    });

    res.status(201).json(claim);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all claims
const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate("itemId");

    res.json(claims);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPROVE claim
const approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "approved";
    await claim.save();

    // update item
    await Item.findByIdAndUpdate(claim.itemId, {
      status: "claimed",
      isClaimed: true
    });

    res.json({ message: "Claim approved" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REJECT claim
const rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    res.json(claim);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClaim,
  getClaims,
  approveClaim,
  rejectClaim
};