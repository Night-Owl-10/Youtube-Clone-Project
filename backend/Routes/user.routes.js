const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/user.controller");
const auth = require("../Middleware/authentication");
const passport = require("passport");

router.post("/signUp", UserController.signUp)
router.post("/signIn", UserController.signIn);
router.post("/signOut", UserController.signOut);
router.get("/user/:userId", UserController.getUserById);
router.delete("/deleteUser/:userId", auth, UserController.deleteUser);

router.get("/test-email", UserController.sendTestEmail);
router.post("/verify-otp", UserController.verifyOtp);
router.post("/resend-verification-otp", UserController.resendVerificationOtp);
router.post("/forgot-password", UserController.forgotPassword)
router.post("/verify-reset-otp", UserController.verifyResetOtp)

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false
    }),
    UserController.googleCallback
);

router.get("/me", auth, UserController.getMe);

module.exports = router;