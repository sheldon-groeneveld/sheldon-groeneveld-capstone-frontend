import { io } from "socket.io-client";

const URL = "https://sheldon-groeneveld-capstone-api.onrender.com";
// process.env.NODE_ENV === "production"
//   ? "https://sheldon-groeneveld-capstone-api.onrender.com"
//   : "http://localhost:8080";

export const socket = io(URL, {
  autoConnect: false,
});
