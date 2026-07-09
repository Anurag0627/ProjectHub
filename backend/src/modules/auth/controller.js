const authService = require("./service");
const {asyncHandler} = require("../../utils/asyncHandler");
const { success } = require("zod");

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    res.status(200).json(result);
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