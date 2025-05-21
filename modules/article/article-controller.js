const articleModel = require("./article-model");

/**
 * Récupère tous les articles de la base de données
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et un tableau d'articles en cas de succès
 *   - Status 400 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la récupération des articles échoue
 */

const getAllArticles = async (req, res) => {
    try {
        const articles = await articleModel.find();
        return res.status(200).json(articles);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * Récupère un article de la base de données par son ID
 * @param {string} req.params.id - L'ID de l'article à récupérér e
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et l'article en cas de succès
 *   - Status 400 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la récupération de l'article échoue
 */

const getArticleById = async (req, res) => {
    try {
        const article = await articleModel
            .where({ uuid: req.params.id })
            .findOne();
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res.status(200).json(article);
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * Crée un nouvel article dans la base de données
 * @param {Object} req.body - Les données de l'article à créer
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et un message de succès en cas de succès
 *   - Status 400 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la création de l'article échoue
 */

const createArticle = async (req, res) => {
    try {
        const article = await articleModel.create(req.body);
        return res
            .status(201)
            .json({
                status: 201,
                message: "Article created successfully",
                article: article,
            });
    } catch (err) {
        return res.status(400).json(err.message);
    }
};

/**
 * Met à jour un article dans la base de données par son ID
 * @param {string} req.params.id - L'ID de l'article à mettre à jour
 * @param {Object} req.body - Les données de l'article à mettre à jour
 * @returns {Promise<import('express').Response>} Retourne une promesse avec :
 *   - Status 200 et un message de succès en cas de succès
 *   - Status 400 et un message d'erreur en cas d'échec
 * @throws {Error} Renvoie une erreur si la mise à jour de l'article échoue
 */

const updateArticle = async (req, res) => {
    try {
        const article = await articleModel.findOneAndUpdate(
            { uuid: req.params.id },
            req.body,
            { new: true }
        )
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res
            .status(200)
            .json({
                status: 200,
                message: "Article updated successfully",
                article: article,
            });
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

const deleteArticle = async (req, res) => {
    try {
        const article = await articleModel
            .where({ uuid: req.params.id })
            .findOneAndDelete();
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        return res
            .status(200)
            .json({ status: 200, message: "Article deleted successfully" });
    } catch (err) {
        return res.status(400).json(err.message);
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}
