const articleModel = require('./article-model')


/**
 * Récupère tous les articles de la base de données
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et un tableau d'articles en cas de succès
 *   - Status 500 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la récupération des articles échoue
 */

const getAllArticles = async (req, res) =>{
    try{
        const articles = await articleModel.find()
        return res.status(200).json(articles)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}

/**
 * Récupère un article de la base de données par son ID
 * @param {string} req.params.id - L'ID de l'article à récupérér e
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et l'article en cas de succès
 *   - Status 500 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la récupération de l'article échoue
 */

const getArticleById = async (req, res) => {
    try {
        const article = await articleModel.findById(req.params.id)
        return res.status(200).json(article)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}

/**
 * Crée un nouvel article dans la base de données
 * @param {Object} req.body - Les données de l'article à créer
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et un message de succès en cas de succès
 *   - Status 500 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la création de l'article échoue
 */ 


const createArticle = async (req, res) => {
    try {
        await articleModel.create(req.body)
        return res.status(200).json({message: 'Article created successfully'})
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}

/**
 * Met à jour un article dans la base de données par son ID
 * @param {string} req.params.id - L'ID de l'article à mettre à jour
 * @param {Object} req.body - Les données de l'article à mettre à jour
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :  
 *   - Status 200 et un message de succès en cas de succès
 *   - Status 500 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la mise à jour de l'article échoue
 */

const updateArticle = async (req, res) => {
    try {
        await articleModel.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).json({message: 'Article updated successfully'})
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle
}

