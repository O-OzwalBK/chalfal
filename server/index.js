import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const PORT = process.env.PORT || 8000;

const app = express();
const httpServer = createServer(app);
const socketServer = new Server(httpServer);

app.get("/", (req, res) => {
  console.log("Requested for home route.");
  res.send("<h1>Home Page</h1>");
});

httpServer
  .listen(PORT)
  .on("listening", () => {
    console.log(`Started server on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log("Error starting server");
  });

socketServer.on("connection", (socket) => {
  console.log(`Established connection with user ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});
