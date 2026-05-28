const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const { socketAuthMiddleware } = require("../middleware/socket.auth.middleware");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log("a user connected", socket.id)
});

io.use(socketAuthMiddleware);


const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("Socket Connected ", socket.user.name);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("Socket disconnected ", socket.user.name);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

module.exports = { io, app, server };