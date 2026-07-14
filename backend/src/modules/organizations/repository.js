const { email } = require("zod");
const prisma = require("../../lib/prisma");
const auth = require("../auth/repository");

const createOrganization = async (userId, data) => {
    return await prisma.$transaction(async (tx) => {
        const organization = await tx.organization.create({
            data: {
                name: data.name
            }
        });

        await tx.organizationMember.create({
            data: {
                userId,
                organizationId: organization.id,
                role: "OWNER"
            }
        });

        return organization;
    });
};

const getUserOrganizations = async (userId) => {
    return await prisma.organizationMember.findMany({ 
        where: {
            userId
        },
        include: {
            organization: true
        }
    });
};

const getOrganizationById = async (organizationId) => {
    return await prisma.organization.findUnique({
        where: {id: organizationId}
    }); 
};

const findMembership = async (userId, organizationId) => {
    return await prisma.organizationMember.findUnique({
        where: {
            userId_organizationId: {
                userId,
                organizationId
            }
        }
    })
};

const findMembershipByEmail = async(email, organizationId) => {
    const user = await auth.findByEmail(email);
    const userId = user.id;
    return await prisma.organizationMember.findUnique({
        where: {
            userId_organizationId: {
                userId,
                organizationId
            }
        }
    });
};

const createMembership = async(userId, organizationId, role) => {
    return await prisma.organizationMember.create({
        data: {
            userId,
            organizationId,
            role
        }
    });
};

module.exports = {
    createOrganization,
    getUserOrganizations,
    getOrganizationById,
    findMembership,
    findMembershipByEmail,
    createMembership
};