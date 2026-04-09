const express = require("express");
const router = express.Router();
const Users = require("../models/Users.model");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary")();


const upload = multer({ dest: "uploads/" });


router.patch("/:id", upload.single("profileImg"), async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image file is required",
            });
        }


        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "user_profiles",
            resource_type: "image",
        });


        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { imgURL: result.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;