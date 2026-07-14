const organizationService = require("./service");
const repository = require("./repository");
const {asyncHandler} = require("../../utils/asyncHandler");
const { success } = require("zod");
const sendResponse = require("../../shared/response/apiResponse");
const { send } = require("node:process");

const createOrganization = asyncHandler(async (req, res) => {
    const result = await organizationService.createOrganization(req.user.id, req.body);

    sendResponse(res, {
        statusCode: 201,
        message: "Organization created successfully.",
        data: result
    });
});

const getMyOrganization = asyncHandler(async (req, res) => {
    const result = await organizationService.getMyOrganization(req.user.id);

    sendResponse(res, {
        statusCode: 200,
        message: "My Organizations :",
        data: result
    });
});

const getOrganization = asyncHandler(async (req, res) => {
    const result = await organizationService.getOrganization(req.params.organizationId, req.user.id);
    sendResponse(res, {
        statusCode: 200,
        message: "Organizations fetched successfully.",
        data: result
    });
});

// const findMembershipByEmail = asyncHandler(async (req, res) => {
//     const result = await repository.findMembershipByEmail(req.body.email, req.body.organizationId);
//     res.status(200).json({
//         success: true,
//         data: result
//     })
// });

const inviteMember = asyncHandler(async (req, res) => {
    const member = await organizationService.inviteMember(req.params.organizationId, req.user.id, req.body);

    sendResponse(res, {
        statusCode: 201,
        message: "Member invited successfully.",
        data: member
    });
});

module.exports = {
    createOrganization,
    getMyOrganization,
    getOrganization,
    inviteMember
    // findMembershipByEmail
}