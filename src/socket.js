import io from "socket.io-client";

export const socket = io(
  "https://post-app-backend-express-session.onrender.com",
  {
    autoConnect: false,
    extraHeaders: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  }
);
