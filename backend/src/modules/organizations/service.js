const { success } = require("zod");
const repository = require("./repository");
const validate = require("./validation");
const auth = require("../auth/repository");
const organizationAccess = require("../../shared/access/organizationAccess");
const AppError = require("../../utils/AppError");

const createOrganization = async(userId, data) => {
    const validatedData = validate.createOrganizationSchema.parse(data);

    const organization = await repository.createOrganization(userId, validatedData);

    return organization;
};

const getMyOrganization = async(userId) => {
    const organization = await repository.getUserOrganizations(userId);

    return organization.map(member => ({
             id: member.id,
             name: member.organization.name,
             role: member.role
        }));
};

const getOrganization = async(organizationId, currentUserId) => {

    validate.organizationIdSchema.parse({ organizationId });
    
    const organization = await repository.getOrganizationById(organizationId);

    if(!organization){
        throw new AppError("Organization not found.", 404);
    }

    const membership = await repository.findMembership(currentUserId, organizationId);
    if(!membership){
        throw new AppError("You are not a member of this organization.", 403);  
    }

    return organization;
    
};

const inviteMember = async(organizationId, currentUserId, data) => {

    const validatedData = validate.inviteMemberSchema.parse(data);

    const currentMembership = await organizationAccess(organizationId, currentUserId);

    const allowedRoles = ["OWNER", "ADMIN"];
    if(!allowedRoles.includes(currentMembership.role)){
        throw new AppError("You are not allowed to invite members.", 403);
    }

    const existingMembership = await repository.findMembershipByEmail(validatedData.email, organization.id);
    if(existingMembership){
        throw new AppError("User is already a member of organization.", 409);
    }

    const invitedUser = await auth.findByEmail(validatedData.email);
    if(!invitedUser){
        throw new AppError("User not found.", 404);
    }
    
    const newMembership = await repository.createMembership(invitedUser.id, organization.id, validatedData.role);

    return{
            id: newMembership.id,
            userId: invitedUser.id,
            email: invitedUser.email,
            role: newMembership.role
    };
};


module.exports = {
    createOrganization,
    getMyOrganization,
    getOrganization,
    inviteMember
}