import { useEffect, useState } from "react";
import API from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";

function AuctionList() {

  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const navigate =useNavigate();

  const fetchAuctions = async () => {
    try {
      const res = await API.get("/auctions");
      setAuctions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>SpiX Auction</h1>

      {auctions.map((auction) => (
        <div
          key={auction._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <h2>{auction.spiceName}</h2>

          <p>Current Bid: ₹{auction.currentBid}</p>

         <button onClick={() => navigate(`/auction/${auction._id}`)}>
         Join Auction
         </button>

        </div>
      ))}
    </div>
  );
}

export default AuctionList;