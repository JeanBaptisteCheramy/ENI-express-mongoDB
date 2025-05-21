const userModel = require("../user/user-model")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const { pseudo, email, password } = req.body;
    const user = await userModel.create({ pseudo, email, password })
    if (!user) {
        res.status(400).json({ message: "Error while registering" })
    }
    const token = user.createJWT()
    return res.status(201).json({
        status: 201,
        message: "User created",
        user: {
            uuid: user.uuid,
            pseudo: user.pseudo,
            email: user.email,
            role: user.role,
        },
        token
    })
}

module.exports = {
    register,
}
