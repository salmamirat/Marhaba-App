function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({ error: "Cet email est deja utilise" });
  }

  res.status(500).json({ error: "Une erreur est survenue" });
}

module.exports = errorHandler;