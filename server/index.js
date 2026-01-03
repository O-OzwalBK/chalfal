/**
 * Server entry point for the chat application.
 * Sets up an Express HTTP server and a Socket.IO server with CORS.
 * @module server/index
 */
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDB } from "./db/connectDB.js";

// Load environment variables from .env
config();

/**
 * Port the HTTP server listens on.
 * @type {number|string}
 */
const PORT = process.env.PORT || 8000;

/**
 * Default chat room name used for grouping sockets.
 * @type {string}
 */
const ROOM = "global chat";

/** Express application instance. */
const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());

/** HTTP server wrapping the Express app. */
const httpServer = createServer(app);

/**
 * Socket.IO server attached to the HTTP server.
 * @type {import('socket.io').Server}
 */
const socketServer = new Server(httpServer, {
  cors: {
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: false,
  },
});

/**
 * Basic health/home route for the HTTP server.
 * @name GET/
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
app.get("/", (req, res) => {
  console.log("Requested for home route.");
  res.send("<h1>Home Page</h1>");
});

httpServer
  .listen(PORT)
  .on("listening", () => {
    console.log(`Started server on port ${PORT}`);
    connectToDB();
  })
  .on("error", (err) => {
    console.log(`Error starting server ${err}`);
  });

/**
 * Handle a new socket connection.
 * @param {import('socket.io').Socket} socket - Connected socket instance
 */
function handleSocketConnection(socket) {
  console.log(`Established connection with user ${socket.id}`);

  /**
   * Join the global room for group chat.
   * @param {string} userName - Display name of the joining user
   */
  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} has joined the group.`);
    await socket.join(ROOM);
  });

  /** Handle socket disconnect. */
  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
}

socketServer.on("connection", handleSocketConnection);
