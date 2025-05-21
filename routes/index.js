const express = require('express');
const router = express.Router();

const articleRouter = require('../modules/article/article-router')
const authRouter = require('../modules/auth/auth-router')

router.use('/articles', articleRouter)
router.use('/auth', authRouter)

module.exports = router