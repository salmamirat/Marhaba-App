function validateRegister(req, res, next) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Le mot de passe doit avoir au moins 6 caracteres" });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe obligatoires" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Email invalide" });
  }

  next();
}

module.exports = { validateRegister, validateLogin };