const express = require("express");
const router = express.Router();
const CommentController = require("../Controllers/comment.controller");
const auth = require("../Middleware/authentication");

router.post("/comment", auth, CommentController.addComment);
router.get("/comment/:videoId", CommentController.getCommentByVideoId);





module.exports = router;