import io from "socket.io-client";

export const socket = io(
  "https://post-app-backend-express-session.onrender.com",
  {
    autoConnect: false,
    extraHeaders: {
      "Access-Control-Allow-Origin": "https://post-app-express-session.onrender.com",
      "Access-Control-Allow-Credentials": "true",
    },
    withCredentials: true,
  }
);
