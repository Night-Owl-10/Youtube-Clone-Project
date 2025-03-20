const Video = require("../Models/video.model");


exports.uploadVideo = async (req, res) => {
    try {

        const { title, description, videoLink, thumbnail, category } = req.body;

        if (!req.channel || !req.channel._id) {
            return res.status(400).json({ error: "User must have a channel to upload videos" });
        }

        const videoUpload = new Video({ user: req.user._id, channel: req.channel._id, title, description, videoLink, thumbnail, category});
        await videoUpload.save();

        res.status(201).json({ success: "true", videoUpload });

    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }

}


exports.getAllVideo = async(req, res) => {
    try {
            const videos = await Video.find().populate("user", "userName avatar createdAt").populate("channel", "channelName");

            res.status(201).json({ success: '"true', "videos": videos});
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}



exports.getVideoById = async(req, res) => {
    try {
        let {id} = req.params;
        const video = await Video.findById(id).populate("user", "userName avatar createdAt").populate("channel", "channelName");

        res.status(201).json({ success: "true", "video": video});
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.getAllVideoByUserID = async(req, res) => {
    try {
        let {userId} = req.params;
        const video = await Video.find({user:userId}).populate("user", "userName avatar createdAt").populate("channel", "channelName");
        res.status(201).json({ success: "true", "video": video });
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}