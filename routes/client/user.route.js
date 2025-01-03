const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller.js");
const authMiddleware = require("../../middleware/client/auth.middleware.js");
router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/password/forgot", controller.forgotPassword);
router.post("/password/otp", controller.otpPassword);
router.patch("/password/reset", controller.resetPassword);
router.get("/profile",authMiddleware.requireAuth,controller.profile);

module.exports = router;