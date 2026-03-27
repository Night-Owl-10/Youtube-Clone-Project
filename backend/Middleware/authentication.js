const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");
const Channel = require("../Models/channel.model");

const auth = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decode.userId).select('-password');

        if (!req.user) {
            return res.status(404).json({ error: "User not found" });
        }

        const channel = await Channel.findOne({ user: req.user._id });
        req.channel = channel || null;

        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Token is not valid" });
    }
}

module.exports = auth;

