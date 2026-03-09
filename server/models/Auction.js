const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  spiceName: {
    type: String,
    required: true,
  },
  basePrice: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  highestBidder: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  endTime: {
  type: Date,
},
bids: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: Number,
    time: {
      type: Date,
      default: Date.now,
    },
  },
],
}, { timestamps: true });

module.exports = mongoose.model("Auction", auctionSchema);