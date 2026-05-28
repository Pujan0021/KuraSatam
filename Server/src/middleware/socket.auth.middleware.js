const  UsersModel=require("../models/Users.model")

const jwt=require("jsonwebtoken");
const User=require("../models/Users.model");
require("dotenv").config();


module.exports= socketAuthMiddleware=async(socket,next)=>{
try {
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
        const user=UsersModel.findById(decoded.UserId).select("-password");
        if(!user){
            console.log("Socket connection rejected")
        }

        socket.user=user;
        socket.userId=user._id.toString();
        console.log(`Socket authenticated for ${user.name}` )
        next();
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: "Unauthenticated !"
        })

    }
} catch (error) {
    
}
}