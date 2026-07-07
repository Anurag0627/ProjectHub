const { z, email } = require("zod");

const registerSchema = z.object({
    name: z.string().trim().min(3,"Name must be atleast 3 characters."),
    email: z.email("Invalid email address.").transform(email => email.toLocaleLowerCase()),
    password: z.string().min(8,"Password must be atleast 8 characters long.")
});

module.exports = registerSchema;