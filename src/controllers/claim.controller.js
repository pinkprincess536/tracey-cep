const Claim = require("../models/claim");
const Item = require("../models/item");

// CREATE claim
const createClaim = async (req, res) => {
  try {
    const { itemId, proof } = req.body || {};
    if (!itemId) {
      return res.status(400).json({ message: "itemId is required in the request body" });
    }
    const imageUrl = req.file ? `uploads/${req.file.filename}` : undefined;

    const claimData = { itemId };
    if (proof) claimData.proof = proof;
    if (imageUrl) claimData.imageUrl = imageUrl;

    const claim = await Claim.create(claimData);
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