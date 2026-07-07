const { ZodError } = require("zod");

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

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler

