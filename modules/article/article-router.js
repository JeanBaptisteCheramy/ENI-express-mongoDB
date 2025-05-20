const express = require('express')
const articleController = require('./article-controller')

const router = express.Router()

// GET ALL ARTICLES 
router.get('/', articleController.getAllArticles)

// GET ARTICLE BY ID
router.get('/:id', articleController.getArticleById)

// CREATE ARTICLE
router.post('/add', articleController.createArticle)

// UPDATE ARTICLE
router.put('/update/:id', articleController.updateArticle)


module.exports = router