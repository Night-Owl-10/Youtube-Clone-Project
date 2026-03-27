const Comment = require("../Models/comment.model");



exports.addComment = async (req, res) => {
    try {
        let { video, message } = req.body;
        if (!req.user || !req.channel) {
            return res.status(401).json({ error: "User must have a channel to add comments" });
        }
        const comment = new Comment({ user: req.user._id, channel: req.channel._id, video, message });
        await comment.save();

        res.status(201).json({
            message: "Comment added successfully",
            comment
        })
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.getCommentByVideoId = async (req, res) => {
    try {
        let { videoId } = req.params;
        const comments = await Comment.find({ video: videoId }).populate("user", "userName avatar createdAt").populate("channel", "channelName");

        res.status(201).json({
            message: "Success",
            comments
        })
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.deleteComment = async (req, res) => {
    try {
        let { commentId } = req.params;
        let UserId = req.user._id;
        const comment = await Comment.findById(commentId);
        if (comment.user.toString() !== UserId.toString()) {
            return res.status(401).json({ error: "You can only delete your own comments" });
        }
        await comment.deleteOne();

        res.status(201).json({
            message: "Comment deleted successfully",
            comment
        })
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.editComment = async (req, res) => {
    try {
        let { commentId, message } = req.body;
        let UserId = req.user._id;
        const comment = await Comment.findById(commentId);
        if (comment.user.toString() !== UserId.toString()) {
            return res.status(401).json({ error: "You can only edit your own comments" });
        }
        comment.message = message;
        await comment.save();

        res.status(201).json({
            message: "Comment edited successfully",
            comment
        })
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
}

