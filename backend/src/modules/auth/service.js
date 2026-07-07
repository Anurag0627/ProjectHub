const bcrypt = require("bcrypt");
const authRepository = require("./repository");
const registerSchema  = require("./validation");
const { success } = require("zod");



const register = async (userData) => {

    const validatedData = registerSchema.parse(userData);

    const existingUser = await authRepository.findByEmail(validatedData.email);
    if(existingUser){
        return {
            success: false,
            message: "User already exist.",
        }
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await authRepository.createUser({
        ...validatedData,
        password: hashedPassword
    });

    return{
        success: true,
        message: "User registered successfully.",
        data: {
            name: user.name,
            email: user.email
        }
    };
};

module.exports = {
    register
}