import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/login">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/create-auction">Create Auction</Link>
    </div>
  );
}

export default Navbar;