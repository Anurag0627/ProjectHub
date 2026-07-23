const { z } = require("zod");

const createTaskSchema = z.object({
    title: z.string().trim().min(3).max(100),
    description: z.string().trim().max(2000).optional(),
    priority: z.enum(["LOW","MEDIUM","HIGH","URGENT"]).default("MEDIUM"),

    dueDate: z.coerce.date().optional(),
    assignedToId: z.string().cuid().optional()
});

const listTaskSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
    priority: z.enum(["LOW","MEDIUM","HIGH","URGENT"]).optional(),
    assignedToId: z.string().cuid().optional(),
    sortBy: z.enum(["createdAt","dueDate","priority","title"]).default("createdAt"),
    sortOrder: z.enum(["asc","desc"]).default("desc")
});

const assignTaskSchema = z.object({
    assignedToId: z.string().cuid()
});

const updateTaskStatusSchema = z.object({
    status: z.enum(["TODO","IN_PROGRESS","IN_REVIEW","DONE"])
});

module.exports = {
    createTaskSchema,
    listTaskSchema,
    assignTaskSchema,
    updateTaskStatusSchema
}