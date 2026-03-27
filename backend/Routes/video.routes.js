const express = require("express");
const router = express.Router();
const videoController = require("../Controllers/video.controller");
const auth = require("../Middleware/authentication")


router.post("/video", auth, videoController.uploadVideo);
router.get("/allVideo", videoController.getAllVideo);
router.get("/search", videoController.searchVideos);
router.get("/getVideoById/:id", videoController.getVideoById);
router.get("/:userId/channel", videoController.getAllVideoByUserID);
router.put("/view/:id", videoController.handleViewCount);
router.put("/like/:id", auth, videoController.likeVideo);
router.put("/dislike/:id", auth, videoController.dislikeVideo);
router.delete("/deleteVideo/:id", auth, videoController.deleteVideo);

module.exports = router;