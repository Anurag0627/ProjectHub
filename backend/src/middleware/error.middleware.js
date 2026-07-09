const { ZodError } = require("zod");
const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if(err instanceof ZodError){
        return  res.status(400).json({
            success: false,
            message: "validation failed",
            errors: err.issues.map(issue => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        });
    }

    if(err.isOperational){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    if(err.name === "TokenExpiredError"){
        return res.status(401).json({
            success: false,
            message: "Your session has expired. Please log in again."
        });
    }

    if(err.name === "JsonWebTokenError"){
        return res.status(401).json({
            success: false,
            message: "Invalid token structure. Access denied."
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

module.exports = errorHandler

