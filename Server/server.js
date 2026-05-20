const express = require("express");
const app = express();
const authRouter = require("./src/routes/auth.route.js")
const MessageRouter = require("./src/routes/message.route.js")
const ProfileRouter = require("./src/routes/profileUpdate.route.js")
const dbConnect = require("./src/config/dbConnect");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/middleware/auth.middleware.js");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
});


io.on('connection', (socket) => {
    console.log("a user connected", socket.id)
})

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth", authRouter);
app.use("/api", authMiddleware, MessageRouter);
app.use("/api", authMiddleware, ProfileRouter);

app.get("/", (req, res) => {
    res.send("<h2>Server is in Use</h2>")
})


const startServer = async () => {
    try {
        await dbConnect();

    } catch (e) {
        console.log("Error occured creating a server", e);
        process.exit(1);
    }
    server.listen(PORT, () => {
        console.log("Server started at ", PORT);
    })

}
startServer();