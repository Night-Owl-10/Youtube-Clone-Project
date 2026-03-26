const Video = require("../Models/video.model");
const Comment = require("../Models/comment.model");


exports.uploadVideo = async (req, res) => {
    try {

        const { title, description, videoLink, thumbnail, category } = req.body;

        if (!title || !description || !videoLink || !thumbnail || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!req.channel || !req.channel._id) {
            return res.status(400).json({ error: "User must have a channel to upload videos" });
        }

        const videoUpload = new Video({ user: req.user._id, channel: req.channel._id, title, description, videoLink, thumbnail, category });
        await videoUpload.save();

        res.status(201).json({ message: "Video Uploaded Successfully", success: "true", videoUpload });

    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }

}


exports.getAllVideo = async (req, res) => {
    try {
        const videos = await Video.find().populate("user", "userName avatar createdAt").populate("channel", "channelName channelDescription channelBanner createdAt subscribers");

        res.status(201).json({ success: '"true', "videos": videos });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}



exports.getVideoById = async (req, res) => {
    try {
        let { id } = req.params;
        const video = await Video.findById(id).populate("user", "userName avatar createdAt").populate("channel", "channelName channelDescription channelBanner createdAt subscribers");

        res.status(201).json({ success: "true", "video": video });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.getAllVideoByUserID = async (req, res) => {
    try {
        let { userId } = req.params;
        const video = await Video.find({ user: userId }).populate("user", "userName avatar createdAt").populate("channel", "channelName channelDescription channelBanner createdAt subscribers");
        res.status(201).json({ success: "true", "video": video });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

exports.searchVideos = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim() === '') {
            return res.status(400).json({ error: "Search query is required" });
        }

        const videos = await Video.find({
            title: { $regex: query, $options: 'i' }
        }).populate("user", "userName avatar createdAt").populate("channel", "channelName channelDescription channelBanner createdAt subscribers");

        res.status(200).json({ success: "true", videos: videos });
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Server Error" });
    }
}

exports.handleViewCount = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        );
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        res.status(200).json({ success: "true", views: video.views });
    } catch (error) {
        console.error("View count error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.likeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        if (!Array.isArray(video.like)) video.like = [];
        if (!Array.isArray(video.dislike)) video.dislike = [];

        const hasLiked = video.like.some(id => id.toString() === userId.toString());
        const hasDisliked = video.dislike.some(id => id.toString() === userId.toString());

        if (hasLiked) {
            video.like.pull(userId);
        } else {
            video.like.push(userId);
            if (hasDisliked) {
                video.dislike.pull(userId);
            }
        }

        await video.save();
        res.status(200).json({ success: "true", message: "Video like updated", video });
    } catch (error) {
        console.error("Like error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.dislikeVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        if (!Array.isArray(video.like)) video.like = [];
        if (!Array.isArray(video.dislike)) video.dislike = [];

        const hasLiked = video.like.some(id => id.toString() === userId.toString());
        const hasDisliked = video.dislike.some(id => id.toString() === userId.toString());

        if (hasDisliked) {
            video.dislike.pull(userId);
        } else {
            video.dislike.push(userId);
            if (hasLiked) {
                video.like.pull(userId);
            }
        }

        await video.save();
        res.status(200).json({ success: "true", message: "Video dislike updated", video });
    } catch (error) {
        console.error("Dislike error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const video = await Video.findById(id);
        await Comment.deleteMany({ video: id });
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        if (video.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this video" });
        }
        await Video.findByIdAndDelete(id);
        res.status(200).json({ success: "true", message: "Video deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};