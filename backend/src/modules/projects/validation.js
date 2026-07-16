const { z } = require("zod");

const createProjectSchema = z.object({
    name: z.string().trim().min(3, "Project name must be atleast 3 characters.").max(100),
    description: z.string().trim().max(500).optional()
});

const listProjectSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().optional(),
    status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
    sortBy: z.enum(["createdAt", "name"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc")
});

const updateProjectSchema = z.object({
    name: z.string().trim().min(3, "Project name must be atleast 3 characters.").max(100).optional(),
    description: z.string().trim().max(500).optional(),
    status: z.enum(["ACTIVE", "ARCHIVED"]).optional()
}).refine(
    (data) => Object.keys(data).length > 0,
    {
        message: "Atleast one field must be provided."
    }
);

module.exports = {
    createProjectSchema,
    listProjectSchema,
    updateProjectSchema
}