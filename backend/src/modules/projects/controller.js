const projectService = require("./service");
const {asyncHandler} = require("../../utils/asyncHandler");
const sendResponse = require("../../shared/response/apiResponse");
const { send } = require("node:process");

const createProject = asyncHandler(async (req, res) => {
    const project = await projectService.createProject(
        req.params.organizationId,
        req.user.id,
        req.body
    );
    sendResponse(res, {
        statusCode: 201,
        message: "Project created successfully.",
        data: project
    });
});

const getProjects = asyncHandler(async (req, res) => {
    const projects = await projectService.getProjects(req.params.organizationId, req.user.id, req.query);
    sendResponse(res, {
        statusCode: 200,
        message: "Projects fetched successfully.",
        data: projects.data,
        meta: projects.meta
    });
});

const updateProject = asyncHandler(async (req, res) => {
    const update = await projectService.updateProject(
        req.params.organizationId, 
        req.params.projectId,
        req.user.id,
        req.body
    );

    sendResponse(res, {
        statusCode: 200,
        message: "Project updated successfully.",
        data: update
    });
});

module.exports = {
    createProject,
    getProjects,
    updateProject
};