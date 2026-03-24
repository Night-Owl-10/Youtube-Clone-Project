const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/user.controller");
const auth = require("../Middleware/authentication");

router.post("/signUp", UserController.signUp)
router.post("/signIn", UserController.signIn);
router.post("/signOut", UserController.signOut);
router.get("/user/:userId", UserController.getUserById);
router.delete("/deleteUser/:userId", auth, UserController.deleteUser);


module.exports = router;