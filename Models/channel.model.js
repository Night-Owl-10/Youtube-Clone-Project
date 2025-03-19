const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
        },
    channelName: {
        type: String,
        required: true,
        unique: true,
    },
    channelDescription: {
        type: String,
        required: true,
    },
    channelBanner: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("channel", channelSchema);