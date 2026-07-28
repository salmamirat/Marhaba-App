function validateRegister(req, res, next) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  if (!email.includes("@")) {
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

  next();
}

module.exports = { validateRegister, validateLogin };