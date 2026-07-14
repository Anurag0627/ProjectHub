const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/routes");
const organizationRoutes = require("../modules/organizations/routes");

router.use("/auth", authRoutes);
router.use("/organizations", organizationRoutes);

module.exports = router;