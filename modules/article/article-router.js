const express = require('express')
const articleController = require('./article-controller')

const router = express.Router()

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Récupère la liste des articles
 *     description: Retourne tous les articles de la base de données
 *     responses:
 *       200:
 *         description: Liste des articles récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *       500:
 *         description: Erreur serveur lors de la récupération des articles
 */
router.get('/', articleController.getAllArticles)

/**
 * @swagger
 * /articles/{uuid}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Récupère un article par son ID
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         description: Identifiant unique de l'article à récupérer
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Article trouvé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   format: uuid
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:uuid', articleController.getArticleById)

// CREATE ARTICLE
router.post('/create', articleController.createArticle)

// UPDATE ARTICLE
router.put('/update/:uuid', articleController.updateArticle)

// DELETE ARTICLE
router.delete('/delete/:uuid', articleController.deleteArticle)


module.exports = router