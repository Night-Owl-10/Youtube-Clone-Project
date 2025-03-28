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
        required: true,
    },
    channelName: {
        type: String,
        required: true,
    },
    channelDescription: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("user", userSchema);