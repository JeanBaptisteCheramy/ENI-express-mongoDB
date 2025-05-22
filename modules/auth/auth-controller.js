const userModel = require("../user/user-model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { pseudo, email, password } = req.body;
    const user = await userModel.create({ pseudo, email, password });
    if (!user) {
        res.status(400).json({ message: "Error while registering" });
    }
    const token = user.createJWT();
    return res.status(201).json({
        status: 201,
        message: "User created",
        user: {
            uuid: user.uuid,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
        },
        token,
    });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        
        if (!user) {
            res.status(400).json({ message: "Error while logging in" })
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            res.status(400).json({ message: "Error while logging in" })
        }
        const token = user.createJWT()
        return res.status(200).json({
            status: 200,
            message: "User logged in",
            user: {
                pseudo: user.pseudo,
                email: user.email,
            },
            token,
        })
    } catch (error) {
        res.status(400).json({ message: "Error while logging in" });
    }
}

module.exports = {
    register,
    login
};
