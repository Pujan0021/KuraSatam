const express = require("express");
const router = express.Router();
const Message = require("../models/Message.model");
const jwt = require("jsonwebtoken");

router.post("/sendMessage/:id", async (req, res) => {
    const token = req.cookies.token;
    const receiver = req.params.id;

    try {
        const { text } = req.body;
        console.log(text)
        const newMessage = new Message({
            text: text,
            receiver: receiver
        });

        await newMessage.save();

        res.status(201).json({
            success: true,
            message: newMessage,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});
module.exports = router;