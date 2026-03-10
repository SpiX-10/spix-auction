import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateAuction from "./pages/CreateAuction";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <h1>SpiX Auction</h1>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-auction" element={<CreateAuction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;