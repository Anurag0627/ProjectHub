const taskService = require("./service");
const {asyncHandler} = require("../../utils/asyncHandler");
const sendResponse = require("../../shared/response/apiResponse");
const { send } = require("node:process");

const createTask = asyncHandler(async (req, res) => {
    const task = await taskService.createTask(
        req.params.organizationId,
        req.params.projectId,
        req.user.id,
        req.body
    );

    sendResponse(res, {
        statusCode: 201,
        message: "Task created successfully.",
        data: task
    });
});

const getTasks = asyncHandler(async (req, res) => {
    const task = await taskService.getTasks(
        req.params.organizationId,
        req.params.projectId,
        req.user.id,
        req.query
    );

    sendResponse(res, {
        statusCode: 200,
        message: "Tasks fetched successfully.",
        data: task.data,
        meta: task.meta
    });
});

const updateTask = asyncHandler(async (req, res) => {
    const task = await taskService.updateTask(
        req.params.organizationId,
        req.params.projectId,
        req.user.id,
        req.params.taskId,
        req.body
    );

    sendResponse(res, {
        statusCode: 201,
        message: "Task assigned successfully.",
        data: task
    });
});

const updateTaskStatus = asyncHandler(async (req, res) => {
    const update = await taskService.updateTaskStatus(
        req.params.organizationId,
        req.params.projectId,
        req.user.id,
        req.params.taskId,
        req.body
    );

    sendResponse(res, {
        statusCode: 201,
        message: "Status updated successfully.",
        data: update
    });
});

module.exports = {
    createTask,
    getTasks,
    updateTask,
    updateTaskStatus
}