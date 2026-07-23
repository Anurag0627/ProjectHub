const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/routes");
const organizationRoutes = require("../modules/organizations/routes");
const projectRoutes = require("../modules/projects/routes");
const taskRoutes = require("../modules/tasks/routes");

router.use("/auth", authRoutes);
router.use("/organizations", organizationRoutes, projectRoutes);
router.use("/organizations", taskRoutes);
// router.use("/projects", projectRoutes);

module.exports = router;