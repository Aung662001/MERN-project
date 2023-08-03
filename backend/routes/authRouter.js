const express = require("express");
const router = express.Router;
const authController = require("../controller/authController.js");
const loginLimitter = require("../middleware/loginLimitter.js");

router.route("/").post(loginLimitter, authController.login);
router.route("/refresh").get();
router.route("/logout").post();

module.exports = router;
