const validate = require("./validation");
const repository = require("./repository");
const {getOrganizationById, findMembership} = require("../../modules/organizations/repository");
const organizationAccess = require("../../shared/access/organizationAccess");
const projectAccess = require("../../shared/access/projectAccess");
const AppError = require("../../utils/AppError");
const { use } = require("react");
const logger = require("../../shared/logger/logger");


const createProject = async(organizationId, userId, body) => {
    const validatedData = validate.createProjectSchema.parse(body);

    await organizationAccess(organizationId, userId);

    const existingProject = await repository.findProjectByName(validatedData.name, organizationId);
    if(existingProject){
        throw new AppError("Project already exist.", 409);
    }

    const project = await repository.createProject({
        ...validatedData,
        organizationId,
        createdById: userId
    });

    return project;
};

const getProjects = async(organizationId, userId, query) => {
    
    await organizationAccess(organizationId, userId);

    const validatedQuery = validate.listProjectSchema.parse(query);

    const result = await repository.getProjects(organizationId, validatedQuery);
    if(!result){
        throw new AppError("No projects found.", 404);
    }

    return{
        data: result.projects,

        meta: {
            page: validatedQuery.page,
            limit: validatedQuery.limit,
            total: validatedQuery.total,

            totalPages: Math.ceil(result.total / validatedQuery.limit)
        }
    }
};

const updateProject = async(organizationId, projectId, userId, body) => {
    await organizationAccess(organizationId, userId);
    const project = await projectAccess(organizationId, projectId, userId);

    const validatedData = validate.updateProjectSchema.parse(body);

    if(validatedData.name && validatedData.name !== project.name){
        const existingName = await repository.findProjectByName(validatedData.name, organizationId);
        if(existingName){
            throw new AppError("Project name already exist.", 409);
        }
    }

    const updated = repository.updateProject(projectId, validatedData);

    return updated;
};

module.exports = {
    createProject,
    getProjects,
    updateProject
};