const express = require("express");
const router = express.Router();
const Message = require("../models/Message.model");
const Users = require("../models/Users.model");
const jwt = require("jsonwebtoken");

router.post("/sendMessage/:id", async (req, res) => {
    const receiver = req.params.id;

    try {
        const { text } = req.body;

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
router.get("/message/:id", async (req, res) => {
    try {
        const receiver = req.params.id;
        console.log(receiver);
        const messages = await Message.find({ receiver });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
});

router.get("/users", async (req, res) => {
    console.log(req.user.id)
    try {
        const users = await Users.find({ _id: { $ne: req.user.id } });
        res.status(200).json(users)
    } catch (err) {
        console.log(err, "Error occured!")
    }
})
module.exports = router;