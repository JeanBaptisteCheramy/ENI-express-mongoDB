const authController = require("./auth-controller")
const express = require("express")

const router = express.Router()

router.post("/register", authController.register)
router.post("/login", authController.login)


// router.get("/logout", userController.logout)

module.exports = router