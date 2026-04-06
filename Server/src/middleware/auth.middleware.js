const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        // console.log(token)
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Token not found!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Unauthenticated !"
        })

    }
}
module.exports = authMiddleware;