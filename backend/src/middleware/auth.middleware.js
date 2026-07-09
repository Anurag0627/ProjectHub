const { asyncHandler } = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const {verifyAccessToken} = require("../utils/jwt");

const authenticate = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError("Authentication required", 401);
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        throw new AppError("Authentication required", 401);
    }

    const payload =  verifyAccessToken(token);
    req.user = payload;

    next();
});

module.exports = authenticate;