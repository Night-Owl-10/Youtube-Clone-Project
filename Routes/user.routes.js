const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/user.controller");

router.post("/signUp", UserController.signUp)
router.post("/signIn", UserController.signIn);
router.post("/signOut", UserController.signOut);
router.get("/user/:userId", UserController.getUserById);


module.exports = router;