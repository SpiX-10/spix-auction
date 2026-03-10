import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateAuction() {

  const [spiceName, setSpiceName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [endTime, setEndTime] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auctions", {
        spiceName,
        basePrice: Number(basePrice),
        endTime
      });

      alert("Auction Created Successfully");

      navigate("/");

    } catch (error) {

      console.error(error);
      alert("Error creating auction");

    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Create Auction</h2>

      <form onSubmit={handleSubmit}>

        <p>Spice Name</p>
        <input
          value={spiceName}
          onChange={(e) => setSpiceName(e.target.value)}
        />

        <p>Start Price</p>
        <input
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
        />

        <p>Auction End Time</p>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Create Auction
        </button>

      </form>

    </div>
  );
}

export default CreateAuction;