const { z } = require("zod");
const { organization } = require("../../lib/prisma");

const createOrganizationSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3, "Organization name must be atleast 3 characters.")
    .max(20, "Organization name cannot exceed 20 characters")
});

const organizationIdSchema = z.object({
    organizationId: z.string().cuid()
});

const inviteMemberSchema = z.object({
    email: z.string().email("Invalid email address").transform(email => email.toLocaleLowerCase()),
    role: z.enum(['ADMIN','MEMBER'])
});

module.exports = {
    createOrganizationSchema,
    organizationIdSchema,
    inviteMemberSchema
}