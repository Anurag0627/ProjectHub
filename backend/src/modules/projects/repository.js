const { file } = require("zod");
const prisma = require("../../lib/prisma");
const logger = require("../../shared/logger/logger");

const findProjectByName = async(name, organizationId) => {
    return await prisma.project.findFirst({
        where: {
            name,
            organizationId
        }
    });
};

const createProject = async(data) => {
    return await prisma.project.create({
        data
    })
};

const findProjectById = async(projectid) => {
    return await prisma.project.findUnique({
        where: {
            id: projectid
        }
    });
};

const updateProject = async(projectId, data) => {
    return await prisma.project.update({
        where: {
            id: projectId
        },
        data
    });
};

const getProjects = async(organizationId, filters) => {

    const where = {organizationId};

    if(filters.search){
        where.name = {
            contains: filters.search,
            mode: "insensitive"
        };
    }

    if(filters.status){
        where.status = filters.status;
    }

    const [projects, total] = await prisma.$transaction([
        prisma.project.findMany({
            where,
            orderBy: {
                [filters.sortBy]: filters.sortOrder
            },
            skip: (filters.page -1) * filters.limit,
            take: filters.limit
        }),

        prisma.project.count({
            where
        })
    ]);

    return{
        projects,
        total
    }
};


module.exports = {
    findProjectByName,
    findProjectById,
    createProject,
    updateProject,
    getProjects,
}