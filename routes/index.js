const express = require('express');
const router = express.Router();

const articleRouter = require('../modules/article/article-router')

router.use('/articles', articleRouter)

module.exports = router