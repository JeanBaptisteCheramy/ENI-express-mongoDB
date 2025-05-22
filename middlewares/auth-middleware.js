const jwt = require("jsonwebtoken")
const userModel = require("../modules/user/user-model")

const checkJWT = async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized" })
    }
    jwt.verify(token, process.env.KEY_JWT, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Not authorized" })
        }
        req.uuid = decoded.uuid
        return next()
    })
}

const isAdmin = (req, res, next) => {
    userModel
        .findOne({ uuid: req.uuid })
        .then((user) => {
            if (user.role === "ADMIN") {
                return next()
            } else {
                return res.status(401).json({ message: "Not authorized" })
            }
        })
        .catch((error) => {
            return res.status(401).json({ message: "Not authorized" })
        })
}

module.exports = { checkJWT, isAdmin }
