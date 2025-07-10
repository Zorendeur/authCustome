const model = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password_hash, pseudo, localite } = req.body;
  if (!email || !password_hash || !pseudo || !localite)
    return res.status(400).json({ message: "Tous est requis." });
  const saltRounds = 13;
  const password_hashed = await bcrypt.hash(password_hash, saltRounds);

  try {
    const user = await model.register({
      email,
      password_hashed,
      pseudo,
      localite,
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Tous est requis." });

  try {
    const userMdp = await model.userMdp(email);

    const isValid = await bcrypt.compare(password, userMdp);
    if (!isValid) {
    }

    const user = await model.getUser(email);

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        pseudo: user.pseudo,
        localite: user.localite,
        role: "custom_user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1h en ms
    });

    res.status(201).json({
      message: "Connexion réussie !",
      token,
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        localite: user.localite,
      },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Tous est requis." });

  try {
    const user = await model.getUser(email);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getToken = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Faut un token" });

  try {
    let tokenDecoder = jwt.verify(token, process.env.JWT_SECRET);
    let email = tokenDecoder.email;

    const user = await model.getUser(email);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: e.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "Déconnexion réussie (session détruite et cookie supprimé).",
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
