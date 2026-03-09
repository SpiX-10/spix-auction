import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuctionList from "./pages/AuctionList";
import AuctionRoom from "./pages/AuctionRoom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuctionList />} />
        <Route path="/auction/:id" element={<AuctionRoom />} />
      </Routes>
    </Router>
  );
}

export default App;