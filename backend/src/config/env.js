const { z } = require("zod");

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().int().positive(),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(32, "JWT_SECRET should be atleast 32 characters."),
    JWT_EXPIRES_IN: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
    console.error("Invalid environment configurations\n");
    console.error(parsed.error.format());
    process.exit(1);
}   

module.exports = parsed.data;