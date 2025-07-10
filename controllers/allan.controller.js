exports.bonjour = async (req, res) => {
  try {
    res.status(200).json({ error: false, message: "Bonjour" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.aurevoir = async (req, res) => {
  try {
    res.status(200).json({ error: false, message: "Aurevoir" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
