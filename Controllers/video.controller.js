const Video = require("../Models/video.model");


exports.uploadVideo = async (req, res) => {
    try {

        const { title, description, videoLink, thumbnail, category } = req.body;

        const videoUpload = new Video({ user: req.user._id, title, description, videoLink, thumbnail, category});
        await videoUpload.save();

        res.status(201).json({ success: "true", videoUpload });

    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }

}


exports.getAllVideo = async(req, res) => {
    try {
            const videos = await Video.find().populate("user", "userName channelName channelDescription avatar createdAt")

            res.status(201).json({ success: "true", "videos": videos});
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}



exports.getVideoById = async(req, res) => {
    try {
        let {id} = req.params;
        const video = await Video.findById(id).populate("user", "userName channelName channelDescription avatar createdAt")

        res.status(201).json({ success: "true", "video": video});
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.getAllVideoByUserID = async(req, res) => {
    try {
        let {userId} = req.params;
        const video = await Video.find({user:userId}).populate("user", "userName channelName channelDescription avatar createdAt")
        res.status(201).json({ success: "true", "video": video });
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}