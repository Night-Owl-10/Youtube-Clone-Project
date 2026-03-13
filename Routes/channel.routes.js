const express = require("express");
const router = express.Router();
const channelController = require("../Controllers/channel.controller");
const auth = require("../Middleware/authentication")


router.post("/channel", auth, channelController.channelDetails);
router.get("/channel/user/:userId", channelController.getChannelByUserId);

module.exports = router;