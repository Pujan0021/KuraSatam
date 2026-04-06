const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/Users.model");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware");
require("dotenv").config();


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
                message: "Incorrect credentials!"
            });
        }

        console.log("User logged in successfully");

        const token = jwt.sign(
            { id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // console.log("Token: ", token)
        res.cookie("token", token, {
            maxAge: 100000 * 60 * 60,
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({
            success: true,
            message: "SignIn successful",
            user: { name: user.name, email: user.email },
            token: token
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Failed to signin"
        });
    }
});


router.post("/logout", (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({
            success: true,
            message: "Logout Successful"
        })
    } catch {
        res.status(400).json({
            success: false,
            message: "Logout Failed!"
        })

    }
})



router.get('/profile', authMiddleware, (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ success: false, message: "Token not found" });
    // console.log("token", token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        res.status(200).json({ name: decoded.name, id: decoded._id });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});


module.exports = router;