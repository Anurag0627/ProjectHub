const authService = require("./service");
const {asyncHandler} = require("../../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(201).json(result);
});

module.exports = {
    register
};