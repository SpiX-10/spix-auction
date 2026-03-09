const { io } = require("socket.io-client");

console.log("Test file started");

const socket = io("http://localhost:5001");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  socket.emit ("joinAuction","699d5338a74a32735190e12a");
  socket.emit ("placeBid", {
    auctionId: "699d5338a74a32735190e12a",   // your auction id
    bidAmount: 7500,
    userId: "699d02de33c8544983dd0b29"       // buyer id only
  });
});

socket.on("bidUpdated", (data) => {
  console.log("Bid Updated:", data);
});

socket.on("bidError", (error) => {
  console.log("Error:", error);
});

socket.on("auctionEnded", (data) => {
  console.log("Auction Ended!");
  console.log("Winner:", data.winner);
  console.log("Final Amount:", data.finalAmount);
});

socket.on("auctionExtended", (data) => {
  console.log("Auction Extended!");
  console.log("New End Time:", data.newEndTime);
});