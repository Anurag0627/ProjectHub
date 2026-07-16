const express = require("express");
const router = express.Router();

const projectController = require("./controller");
const authenticate = require("../../middleware/auth.middleware");

router.get("/:organizationId/projects", authenticate, projectController.getProjects);
router.post("/:organizationId/projects", authenticate, projectController.createProject);
router.patch("/:organizationId/projects/:projectId", authenticate, projectController.updateProject);

module.exports = router;