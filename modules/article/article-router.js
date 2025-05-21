const express = require('express')
const articleController = require('./article-controller')

const router = express.Router()

// GET ALL ARTICLES 
router.get('/', articleController.getAllArticles)

// GET ARTICLE BY ID
router.get('/:id', articleController.getArticleById)

// CREATE ARTICLE
router.post('/create', articleController.createArticle)

// UPDATE ARTICLE
router.put('/update/:id', articleController.updateArticle)

// DELETE ARTICLE
router.delete('/delete/:id', articleController.deleteArticle)


module.exports = router