function errorHandler(err, req, res, next) {
  console.error(err.stack || err);
  
  res.status(500).json({ error: "Une erreur est survenue" });
}

module.exports = errorHandler;
