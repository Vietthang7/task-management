const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller.js");
router.post("/register", controller.register);

module.exports = router;