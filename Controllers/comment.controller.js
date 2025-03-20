const Comment = require("../Models/comment.model");



exports.addComment = async(req, res) => {
    try {
            let  {video, message} = req.body;
            const comment = new Comment({user:req.user._id, channel: req.channel._id, video, message});
            await comment.save();

            res.status(201).json({
                message: "Success",
                comment
            })
    } catch(error) {
        res.status(500).json({ error: "Server Error" });
    }
}


exports.getCommentByVideoId = async(req, res) => {
        try {
                let {videoId} = req.params;
                const comments = await Comment.find({ video: videoId }).populate("user", "userName avatar createdAt").populate("channel", "channelName");

                res.status(201).json({
                    message: "Success",
                    comments
                })
        } catch(error) {
            res.status(500).json({ error: "Server Error" });
        }
}