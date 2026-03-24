const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channel",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    videoLink: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "All"
    },
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("video", videoSchema);