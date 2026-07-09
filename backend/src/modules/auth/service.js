const bcrypt = require("bcrypt");
const authRepository = require("./repository");
const {registerSchema, loginSchema}  = require("./validation");
const { generateAccessToken } = require("../../utils/jwt");
const AppError = require("../../utils/AppError");



const register = async (userData) => {

    const validatedData = registerSchema.parse(userData);

    const existingUser = await authRepository.findByEmail(validatedData.email);
    if(existingUser){
        throw new AppError("User already exist.", 409);
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

const login = async (userData) => {

    const validatedData = loginSchema.parse(userData);

    const user = await authRepository.findByEmail(validatedData.email);
    if(!user){
        throw new AppError("Invalid email or password", 401);
    }
    
    const comparePassword = await bcrypt.compare(validatedData.password, user.password);

    if(!comparePassword){
        throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    return {
        success: true,
        message: "Login Successful.",
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            accessToken
        }
    };
};

module.exports = {
    register,
    login
}