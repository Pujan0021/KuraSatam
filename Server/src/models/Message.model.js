const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
    },
    sender: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("KuraSatam_Messages", MessageSchema);