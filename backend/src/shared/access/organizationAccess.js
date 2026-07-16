const AppError = require("../../utils/AppError");
const repository = require("../../modules/organizations/repository");


const organizationAccess = async(organizationId, userId) => {
    const organization = await repository.getOrganizationById(organizationId);
    if(!organization){
        throw new AppError("Organization not found.", 404);
    }

    const membership = await repository.findMembership(userId, organizationId);
    if(!membership){
        throw new AppError("You are not member of this organization.", 403);
    }

    return membership   ;
};

module.exports = organizationAccess;