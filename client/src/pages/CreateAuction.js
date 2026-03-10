import React, { useState } from "react";
import API from "../services/api";

function CreateAuction() {

  const [spiceName, setSpiceName] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auctions", {
        spiceName,
        startPrice,
        endTime
      });

      alert("Auction Created Successfully");

      setSpiceName("");
      setStartPrice("");
      setEndTime("");

    } catch (error) {
      console.error(error);
      alert("Error creating auction");
    }
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Create Auction</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Spice Name</label>
          <br />
          <input
            type="text"
            value={spiceName}
            onChange={(e) => setSpiceName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Start Price</label>
          <br />
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Auction End Time</label>
          <br />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Auction
        </button>

      </form>

    </div>
  );
}

export default CreateAuction;