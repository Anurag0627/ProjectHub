const express = require("express");
const router = express.Router();

const authController = require("./controller");
const authenticate = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me",authenticate, authController.getProfile);
router.get("/admin", authenticate, authorize("ADMIN"), authController.adminDashboard)

module.exports = router;