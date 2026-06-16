const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: null,
    },
    googleId: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },

    emailOtp: String,
    emailOtpExpires: Date,
    resetOtp: String,
    resetOtpExpires: Date
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema);