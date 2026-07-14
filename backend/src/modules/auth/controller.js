const authService = require("./service");
const {asyncHandler} = require("../../utils/asyncHandler");
const { success } = require("zod");
const sendResponse = require("../../shared/response/apiResponse");

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    sendResponse(res, {
        statusCode: 201,
        message: "User registered successfully.",
        data: result
    });
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: "Login Successful.",
        data: result
    });
});

const getProfile = asyncHandler( (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

const adminDashboard = asyncHandler(async (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin!!"
    });
});

module.exports = {
    register,
    login,
    getProfile,
    adminDashboard
};