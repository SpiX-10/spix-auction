import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import socket from "../socket";

function AuctionRoom() {

  const { id } = useParams();

  const [bid, setBid] = useState("");
  const [currentBid, setCurrentBid] = useState(0);

  // JOIN AUCTION ROOM
 
useEffect(() => {

  // JOIN SOCKET ROOM
  socket.emit("joinAuction", id);

  // FETCH AUCTION DATA
  const fetchAuction = async () => {
    try {
      const res = await API.get(`/auctions/${id}`);
      setCurrentBid(res.data.currentBid);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAuction();

  // LISTEN REALTIME BIDS
  socket.on("bidUpdate", (data) => {
    setCurrentBid(data.currentBid);
  });

  return () => {
    socket.off("bidUpdate");
  };

}, [id]);

  // PLACE BID
  
const placeBid = async () => {

  if(Number(bid) <= currentBid){
    alert("Bid must be higher than current bid");
    return;
  }

  try {

    await API.post(`/auctions/${id}/bid`, {
      amount: Number(bid)
    });

    socket.emit("newBid", {
      auctionId: id,
      amount: Number(bid)
    });

    setBid("");

  } catch (error) {
    alert("Bid failed");
  }

};

  return (
    <div style={{ padding: "40px" }}>

      <h1>Auction Room</h1>

      <p>Auction ID: {id}</p>

      <h2>Live Bidding</h2>

      <h3>Current Bid: ₹{currentBid}</h3>

      <input
        type="number"
        placeholder="Enter bid amount"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        style={{
          padding: "10px",
          width: "200px",
          marginRight: "10px"
        }}
      />

      <button
        onClick={placeBid}
        style={{
          padding: "10px 20px",
          background: "#ff6b00",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}
      >
        Place Bid
      </button>

    </div>
  );
}

export default AuctionRoom;