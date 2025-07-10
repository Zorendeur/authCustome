const model = require('../models/articles.model');

exports.getAll = async (req, res) => {
  try {
    const articles = await model.getAllArticles();
    res.status(200).json(articles);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const article = await model.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json(article);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.create = async (req, res) => {
  const { titre, contenu, auteur } = req.body;
  if (!titre || !contenu) return res.status(400).json({ message: 'Titre et contenu requis.' });
  try {
    const article = await model.createArticle({ titre, contenu, auteur });
    res.status(201).json(article);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  const { titre, contenu } = req.body;
  if (!titre && !contenu) return res.status(400).json({ message: 'Titre ou contenu requis.' });
  try {
    const article = await model.updateArticle(req.params.id, { titre, contenu });
    res.status(200).json(article);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await model.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};