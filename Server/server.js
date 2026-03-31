const express = require("express");
const app = express();
const authRouter = require("./src/routes/auth.route.js")
const dbConnect = require("./src/config/dbConnect");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./src/midddleware/auth.middleware.js");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;


app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("<h2>Server is in Use</h2>")
})


const startServer = async () => {
    try {
        await dbConnect();
        console.log("Database server started");
    } catch (e) {
        console.log("Error occured creating a server", e);
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log("Server started at ", PORT);
    })

}
startServer();