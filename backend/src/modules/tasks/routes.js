const express = require("express");
const router = express.Router();

const taskController = require("./controller");
const authenticate = require("../../middleware/auth.middleware");

router.get("/:organizationId/projects/:projectId/tasks", authenticate, taskController.getTasks);
router.post("/:organizationId/projects/:projectId/tasks", authenticate, taskController.createTask);
router.patch("/:organizationId/projects/:projectId/tasks/:taskId", authenticate, taskController.updateTask);
router.patch("/:organizationId/projects/:projectId/tasks/:taskId/status", authenticate, taskController.updateTaskStatus);

module.exports = router;
