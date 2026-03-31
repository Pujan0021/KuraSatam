const mongoose = require("mongoose");

require("dotenv").config();
const CONN_STR = process.env.CONN_STR;
const dbConnect = async () => {
    if (!CONN_STR) {
        console.log("CONN_STR not found");
    }
    try {
        await mongoose.connect(CONN_STR);
        console.log("Database connected successfully");

    } catch (err) {
        console.log(err, "Error occured connecting database");
        return;

    }

}
module.exports = dbConnect;
