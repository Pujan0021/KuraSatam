const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/Users.model");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        console.log("New User Created..")

        res.status(201).json({
            success: true,
            message: "Signup successful",
            user: { name, email }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Failed to signup"
        });
    }
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist."
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                message: "Email or password is wrong!"
            });
        }

        console.log("User logged in successfully");

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, { maxAge: 1000 * 60 * 60, httpOnly: true });

        res.status(200).json({
            success: true,
            message: "SignIn successful",
            user: { name: user.name, email: user.email },
            token
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Failed to signin"
        });
    }
});

//Todo
// router.post("/login", (req, res) => {

// })

module.exports = router;