const express = require("express");
const router = express.Router();
const channelController = require("../Controllers/channel.controller");
const auth = require("../Middleware/authentication")


router.post("/channel", auth, channelController.channelDetails);

module.exports = router;