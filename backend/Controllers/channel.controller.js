const Channel = require("../Models/channel.model");
const Video = require("../Models/video.model");
const Comment = require("../Models/comment.model");


exports.channelDetails = async (req, res) => {
    try {
        if (req.channel) {
            return res.status(400).json({ error: "Channel already exists for this user" });
        }

        const { channelName, channelDescription, channelBanner } = req.body;

        if (!channelName || !channelDescription || !channelBanner) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingChannel = await Channel.findOne({ channelName });
        if (existingChannel) {
            return res.status(400).json({ error: "Channel name already exists. Please choose a different name." });
        }

        const channel = new Channel({
            user: req.user._id,
            channelName,
            channelDescription,
            channelBanner
        });
        await channel.save();

        res.status(201).json({
            success: "true",
            message: "Channel created successfully",
            channel
        });

    } catch (error) {
        console.error("Channel creation error:", error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "Channel name already exists. Please choose a different name." });
        }
        res.status(500).json({ error: "Server Error" });
    }
}

exports.getChannelByUserId = async (req, res) => {
    try {
        const channel = await Channel.findOne({ user: req.params.userId });
        if (!channel) {
            return res.status(404).json({ error: "No channel found" });
        }
        res.json({ channel });
    } catch (error) {
        console.error("Get channel error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.subscribeChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const channel = await Channel.findById(id);
        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        if (!Array.isArray(channel.subscribers)) channel.subscribers = [];

        const hasSubscribed = channel.subscribers.some(id => id.toString() === userId.toString());

        if (hasSubscribed) {
            channel.subscribers.pull(userId);
        } else {
            channel.subscribers.push(userId);
        }

        await channel.save();
        res.status(200).json({ success: "true", message: "Channel subscription updated", channel });
    } catch (error) {
        console.error("Subscribe error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.deleteChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const channel = await Channel.findById(id);
        if (!channel) {
            return res.status(404).json({ error: "Channel not found" });
        }

        if (channel.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await Video.deleteMany({ channel: id });
        await Comment.deleteMany({ channel: id });
        await channel.deleteOne();

        res.status(200).json({ success: "true", message: "Channel deleted successfully" });
    } catch (error) {
        console.error("Delete channel error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};