const router = require('express').Router()
const userController = require('./user-controller')

router.get('/all', userController.getAllUsers)

module.exports = router