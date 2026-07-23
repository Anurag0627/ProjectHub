const repository = require("./repository");
const orgRepository = require("../organizations/repository");
const AppError = require("../../utils/AppError");
const validate = require("./validation");
const projectAccess = require("../../shared/access/projectAccess");
const sendResponse = require("../../shared/response/apiResponse");
const {STATUS, VALID_STATUS_TRANSITIONS} = require("../../constants/taskStatus");
const logger = require("../../shared/logger/logger");


const createTask = async(organizationId, projectId, userId, data) => {
    const validatedData = validate.createTaskSchema.parse(data);
    await projectAccess(organizationId, projectId, userId);

    const existingTask = await repository.findTaskByName(validatedData.title);
    if(existingTask){
        throw new AppError("Task with same title already exists.", 403);
    }

    if(validatedData.dueDate && validatedData.dueDate < new Date()){
        throw new AppError("Due date cannot be in past", 400);
    }

    if (validatedData.assignedToId) {

        const membership = await orgRepository.findMembership(validatedData.assignedToId,organizationId);
        if (!membership) {
            throw new AppError("Assignee must be a member of this organization.",400);
        }
    }

    const task = await repository.createTask({
        ...validatedData,
        projectId,
        createdById: userId
    });

    return task;
};

const getTasks = async(organizationId, projectId, userId, query) => {
    const validatedQuery = validate.listTaskSchema.parse(query);
    await projectAccess(organizationId, projectId, userId);

    const task = await repository.getTasks(projectId, validatedQuery);

    return{
        data: task.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate,
            createdAt: task.createdAt,
            assignedToUser: task.assignedToUser,
            createdBy: task.createdBy
        })),

        meta: {
            page: validatedQuery.page,
            limit: validatedQuery.limit,
            total: task.total,

            totalPages: Math.ceil(task.total / validatedQuery.limit)
        }
    }
};

const updateTask = async(organizationId, projectId, userId, taskId, data) => {
    const validatedData = validate.assignTaskSchema.parse(data);
    await projectAccess(organizationId, projectId, userId);

    const task = await repository.findTaskById(taskId);
    if(!task){
        throw new AppError("Task not found.", 404);
    }

    if(task.status == STATUS.DONE){
        throw new AppError("Cannot assign to the completed task.", 403);
    }

    const membership = await orgRepository.findMembership(validatedData.assignedToId, organizationId);
    if(!membership){
        throw new AppError("Member does not exist or not in same organization.", 404);
    }

    if(task.assignedToId == data.assignedToId){
        throw new AppError("Cannot reassign to same member.", 409);
    }

    const updatetask = await repository.updateTask(taskId, validatedData);
    
    return{
        id: updatetask.id,
        title: updatetask.title,
        assignedToUser: updatetask.assignedToUser
    }
};

const updateTaskStatus = async(organizationId, projectId, userId, taskId, data) => {
    const validatedData = validate.updateTaskStatusSchema.parse(data);
    await projectAccess(organizationId, projectId, userId);

    const task = await repository.findTaskById(taskId);
    if(!task){
        throw new AppError("Task not found.", 404);
    }

    if (validatedData.status && validatedData.status !== task.status) {
        const allowed = VALID_STATUS_TRANSITIONS[task.status] || [];
        
        if (!allowed.includes(validatedData.status)) {
            throw new AppError(`Invalid status transition from '${task.status}' to '${validatedData.status}'.`, 400);
        }
    }

    const update = await repository.updateTask(taskId, validatedData);

    return{
        id: update.id,
        title: update.title,
        status: update.status
    };
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    updateTaskStatus
};