const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/comment.controller");
const auth = require("../Middleware/authentication");

router.post("/comment", auth, CommentController.addComment);
router.get("/comment/:videoId", CommentController.getCommentByVideoId);
router.delete("/comment/:commentId", auth, CommentController.deleteComment);
router.put("/comment", auth, CommentController.editComment);

module.exports = router;