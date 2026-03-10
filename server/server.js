import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import auctionRoutes from "./routes/auctionRoutes.js";

dotenv.config();
const app = express();

/* MIDDLEWARE */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

/* ROUTES */
app.use("/api/auctions", auctionRoutes);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("SpiX API Running");
});

/* CREATE HTTP SERVER */
const server = http.createServer(app);

/* SOCKET.IO SETUP */
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* SOCKET EVENTS */
io.on("connection", (socket) => {

  console.log("User connected:", socket.id);

  // Join auction room
  socket.on("joinAuction", (auctionId) => {
    socket.join(auctionId);
  });

  // When new bid happens
  socket.on("newBid", (data) => {

    io.to(data.auctionId).emit("bidUpdate", {
      currentBid: data.amount
    });

  });

});

/* MONGODB CONNECTION */
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

/* SERVER START */
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`SpiX Server running on port ${PORT}`);
});