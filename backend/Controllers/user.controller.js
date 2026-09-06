const User = require("../Models/user.model");
const Channel = require("../Models/channel.model");
const Video = require("../Models/video.model");
const Comment = require("../Models/comment.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const transporter = require("../Config/nodemailer");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
        process.env.NODE_ENV === "production"
            ? "None"
            : "Lax"
}

exports.signUp = async (req, res) => {
    try {
        const { userName, email, password, avatar } = req.body;

        if (!userName || !email || !password || !avatar) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const isUserExist = await User.findOne({ userName });
        const isEmailExist = await User.findOne({ email });
        if (isUserExist) {
            res.status(400).json({ error: "Account with this Username already exist. Please try with some other Username." });
        } else if (isEmailExist) {
            res.status(400).json({ error: "Account with this E-Mail Id already exist. Please try with some other E-Mail Id." });
        } else {
            const otp = Math.floor(
                100000 + Math.random() * 900000
            ).toString();

            const otpExpiry = new Date(
                Date.now() + 10 * 60 * 1000
            );

            let updatedPassword = await bcrypt.hash(password, 10);
            const user = new User({ userName, email, password: updatedPassword, avatar, emailOtp: otp, emailOtpExpires: otpExpiry });
            await user.save();
            await transporter.sendMail({
                from: `"YouTube Clone" <${process.env.GMAIL_USER}>`,
                to: email,
                subject: "Verify Your Account",
                html: `
                    <h2>Your Verification OTP</h2>
                    <h1>${otp}</h1>
                    <p>This OTP will expire in 10 minutes.</p>
                `
            });
            res.status(201).json({
                message: "OTP sent successfully. Please verify your email.",
                success: true,
                email: user.email
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

exports.signIn = async (req, res) => {
    try {

        const { userName, email, password } = req.body;
        const user = await User.findOne({
            $or: [
                { email },
                { userName }
            ]
        });

        if (user?.googleId && !user?.password) {
            return res.status(400).json({
                error: "Please sign in with Google"
            });
        }

        if (user && await bcrypt.compare(password, user.password)) {

            if (!user.isVerified) {
                return res.status(400).json({
                    error: "Please verify your email first"
                });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 3600 });
            res.cookie("token", token, { ...cookieOptions, maxAge: 3600 * 1000 });

            res.json({ message: "Signed In successfully", success: "true", token, user });
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

exports.signOut = async (req, res) => {
    res.clearCookie('token', cookieOptions).json({ message: 'Signed Out successfully' })
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await Channel.findOneAndDelete({ user: req.params.userId });
        await Video.deleteMany({ user: req.params.userId });
        await Comment.deleteMany({ user: req.params.userId });
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.sendTestEmail = async (req, res) => {
    try {

        const data = await transporter.sendMail({
            from: `"YouTube Clone" <${process.env.GMAIL_USER}>`,
            to: "pranavramteke40@gmail.com",
            subject: "NodeMailer Test",
            html: "<h1>NodeMailer is Working 🚀</h1>"
        });

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    if (user.isVerified) {
        return res.status(400).json({
            error: "Email already verified"
        });
    }

    if (!user.emailOtp || !user.emailOtpExpires) {
        return res.status(400).json({
            error: "No active OTP found"
        });
    }

    if (user.emailOtpExpires < new Date()) {
        return res.status(400).json({
            error: "OTP expired"
        });
    }

    if (user.emailOtp !== otp) {
        return res.status(400).json({
            error: "Invalid OTP"
        });
    }

    user.isVerified = true;
    user.emailOtp = null;
    user.emailOtpExpires = null;

    await user.save();

    res.json({
        message: "Email verified successfully",
        success: true
    });
}

exports.resendVerificationOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "No account found with this email" });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: "This account is already verified" });
        }

        // Generate a fresh OTP and reset its expiry
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.emailOtp = otp;
        user.emailOtpExpires = otpExpiry;
        await user.save();

        await transporter.sendMail({
            from: `"YouTube Clone" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Verify Your Account",
            html: `
                <h2>Your Verification OTP</h2>
                <h1>${otp}</h1>
                <p>This OTP will expire in 10 minutes.</p>
            `
        });

        return res.status(200).json({
            message: "Verification OTP resent successfully. Please check your email.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
};

exports.forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                error: "Please verify your email first"
            });
        }

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        user.resetOtp = otp;
        user.resetOtpExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        await transporter.sendMail({
            from: `"YouTube Clone" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Password Reset OTP",
            html: `
                <h2>Password Reset Request</h2>
                <p>Your OTP is:</p>
                <h1>${otp}</h1>
                <p>This OTP expires in 10 minutes.</p>
            `
        });

        return res.status(200).json({
            message: "Password reset OTP sent successfully",
            email: user.email
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
};


exports.verifyResetOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        if (!user.resetOtp || !user.resetOtpExpires) {
            return res.status(400).json({
                error: "No active OTP found"
            });
        }

        if (user.resetOtpExpires < new Date()) {
            return res.status(400).json({
                error: "OTP expired"
            });
        }

        if (user.resetOtp !== otp) {
            return res.status(400).json({
                error: "Invalid OTP"
            });
        }

        user.resetOtp = null;
        user.resetOtpExpires = null;
        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

exports.googleCallback = async (req, res) => {

    try {

        const token = jwt.sign(
            {
                userId: req.user._id
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: 3600
            }
        );

        res.cookie(
            "token",
            token,
            {
                ...cookieOptions,
                maxAge: 3600 * 1000
            }
        );

        res.redirect(
            `${process.env.CLIENT_URL}/oauth-success?token=${token}`
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Google login failed"
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};