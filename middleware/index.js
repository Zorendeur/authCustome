const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.one = async (req, res, next) => {
  try {
    console.log("1");
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.two = async (req, res, next) => {
  try {
    console.log("2");
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.three = async (req, res, next) => {
  try {
    console.log("3");
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


exports.protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Non autorisé, token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Token invalide ou expiré." });
  }
}