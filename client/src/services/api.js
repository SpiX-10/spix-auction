import axios from "axios";

const API = axios.create({
  baseURL: "https://spix-auction-server.onrender.com/api"
});

export default API;
