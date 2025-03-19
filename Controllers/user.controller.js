const User = require("../Models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax"
}

exports.signUp = async(req, res) => {
    try {
        const { userName, email, password, avatar } = req.body;
        const isUserExist = await User.findOne({ userName});
        const isEmailExist = await User.findOne({ email});
        if(isUserExist) {
            res.status(400).json({error: "Account with this Username already exist. Please try with some other Username."});
        } else if(isEmailExist) {
            res.status(400).json({error: "Account with this E-Mail Id already exist. Please try with some other E-Mail Id."});
        } else {
            let updatedPassword = await bcrypt.hash(password, 10);
            const user = new User({ userName, email, password: updatedPassword, avatar });
            await user.save();
            res.status(201).json({ message: "User registered successfully", success: "yes", data:user });
        }
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}

exports.signIn = async(req, res) => {
    try {
            const {userName, email, password} = req.body;
            const user = await User.findOne({ userName});
            const userEmail = await User.findOne({ email});

            if(user && userEmail && await bcrypt.compare(password, user.password)) {

                const token = jwt.sign({userId: user._id}, "MySecretKey");
                res.cookie("token", token, cookieOptions);

                    res.json({message: "Logged in successfully", success: "true", token});
            } else {
                res.status(400).json({error: "Invalid credentials"});
            }

    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}

exports.signOut = async(req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Logged out successfully' })
}