const express = require("express");
const router = express.Router();
const channelController = require("../Controllers/channel.controller");
const auth = require("../Middleware/authentication")


router.post("/channel", auth, channelController.channelDetails);
router.get("/channel/user/:userId", channelController.getChannelByUserId);
router.put("/subscribe/:id", auth, channelController.subscribeChannel);
router.delete("/deleteChannel/:id", auth, channelController.deleteChannel);

module.exports = router;