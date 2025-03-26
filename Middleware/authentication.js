const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

const auth = async (req, res, next) => {
   const token = req.cookies.token //|| req.headers.authorization?.split(" ")[1];

   //let token = req.cookies.token || req.headers.authorization?.split(" ")[1];
   
    if(!token) {
        return res.status(401).json({error: "No token, authorization denied"});
    } else {
        try {
                const decode = jwt.verify(token, "MySecretKey");
                req.user = await User.findById(decode.userId).select('-password');

                /** 
                if (!req.user) {
                    return res.status(404).json({ error: "User not found" });
                }
        
                const channel = await Channel.findOne({ user: req.user._id });
        
                req.channel = channel || null; 
                 */

                next();
        } catch(error) {
                res.status(401).json({ error: "Token is not valid" });
        }
    }
}

module.exports = auth;

