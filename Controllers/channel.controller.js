const Channel = require("../Models/channel.model");


exports.channelDetails = async (req, res) => {
    try {

        if (req.channel) {
            return res.status(400).json({ error: "Channel already exists for this user" });
        }
        
        const { channelName, channelDescription, channelBanner } = req.body;
        const channel = new Channel({ user: req.user._id, channelName, channelDescription, channelBanner});
        await channel.save();

        res.status(201).json({ success: "true", channel });

    } catch(error) {
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
        res.status(500).json({ error: "Server error" });
    }
};