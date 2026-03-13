const Channel = require("../Models/channel.model");

exports.channelDetails = async (req, res) => {
    try {
        if (req.channel) {
            return res.status(400).json({ error: "Channel already exists for this user" });
        }

        const { channelName, channelDescription, channelBanner } = req.body;

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