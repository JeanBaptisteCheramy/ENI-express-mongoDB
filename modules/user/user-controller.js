const User = require("./user-model")

const getAllUsers = async (req, res) => {
    const users = await User.find()
    if (!users) {
        res.status(400).json({ message: "Error while getting users" })
    }
    res.json(users)
}

module.exports = { getAllUsers }