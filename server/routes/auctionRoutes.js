const express = require("express");
const router = express.Router();
const Auction = require("../models/Auction");

/*
GET ALL AUCTIONS
*/
router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


/*
GET SINGLE AUCTION
*/
router.get("/:id", async (req, res) => {
  try {

    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found"
      });
    }

    res.json(auction);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
});


/*
PLACE BID
*/
router.post("/:id/bid", async (req, res) => {

  try {

    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        message: "Auction not found"
      });
    }

    const bidAmount = Number(req.body.amount);

    if (!bidAmount) {
      return res.status(400).json({
        message: "Invalid bid amount"
      });
    }

    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({
        message: "Bid must be higher than current bid"
      });
    }
     auction.currentBid = bidAmount;
auction.highestBidder = "testUser";

if (!auction.endTime) {
  auction.endTime = new Date(Date.now() + 600000); // 10 min
}

    await auction.save();

    res.json({
      message: "Bid placed successfully",
      auction
    });

  } catch (error) {

    console.log("BID ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;