const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware')

const articleRouter = require('../modules/article/article-router')
const authRouter = require('../modules/auth/auth-router')
const userRouter = require('../modules/user/user-router')

router.use('/articles', articleRouter)
router.use('/auth', authRouter)
router.use('/users',[authMiddleware.checkJWT, authMiddleware.isAdmin], userRouter)

module.exports = router