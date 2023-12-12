const express = require("express");
const app = express();
const { createServer } = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);
  // receiver
  socket.on("join-room", (data) => {
    console.log(`Room id ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected ${socket.id}`);
  });
});

// middlewares
app.use(cors());

// server
server.listen(8000, () => console.log("server running"));
