const AppError = require("../../utils/AppError");
const repository = require("../../modules/projects/repository");
const organizationAccess = require("./organizationAccess");

const projectAccess = async(organizationId, projectId, userId) => {
    await organizationAccess(organizationId, userId);

    const project = await repository.findProjectById(projectId);
    if(!project){
        throw new AppError("Project not found.", 404);
    }

    if(project.organizationId !== organizationId){
        throw new AppError("Project does not belong to this organization.", 403);
    }

    return project;
};

module.exports = projectAccess;