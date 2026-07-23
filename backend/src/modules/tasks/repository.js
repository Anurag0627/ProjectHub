const { tr } = require("zod/v4/locales");
const prisma = require("../../lib/prisma");
const { findProjectById } = require("../projects/repository");
const { file, email } = require("zod");

const createTask = async(data) => {
    return await prisma.task.create({
        data,
        include: {
            assignedToUser: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            createdBy: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    });

};

const findTaskById = async(taskId) => {
    return await prisma.task.findUnique({
        where: {
            id: taskId
        }
    });
};

const findTaskByName = async(name) => {
    return await prisma.task.findFirst({
        where: {
            title: name
        }
    });
};

const getTasks = async(projectId, filters) => {
    
    const where = {projectId};

    if(filters.search){
        where.title = {
            contains: filters.search,
            mode: "insensitive"
        };
    }

    if(filters.status){
        where.status = filters.status;
    }

    if(filters.priority){
        where.priority = filters.priority;
    }

    if(filters.assignedToId){
        where.assignedToId = filters.assignedToId;
    }

    const [tasks, total] = await prisma.$transaction([
        prisma.task.findMany({
            where,
            include: {
                assignedToUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                [filters.sortBy]: filters.sortOrder
            },
            skip: (filters.page - 1) * (filters.limit),
            take: filters.limit
        }),

        prisma.task.count({
            where
        })
    ]);

    return{
        tasks,
        total
    }

};

const updateTask = async(taskId, data) => {
    return await prisma.task.update({
        where: {
            id: taskId
        },
        data,
        include: {
            assignedToUser: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            },
            createdBy: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    });
};

module.exports = {
    createTask,
    findTaskById,
    findTaskByName,
    getTasks,
    updateTask
};