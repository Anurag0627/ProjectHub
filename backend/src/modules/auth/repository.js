const prisma = require("../../lib/prisma");

const findByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {email}
    });
};

const createUser = async (userData) => {    
    return await prisma.user.create({
        data: userData,
    })
};

module.exports = {
    createUser,
    findByEmail
}