const express = require("express");
const router = express.Router();

const { register, login, getMe } = require("../controllers/auth.controller");
const { validateRegister, validateLogin } = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, getMe);

module.exports = router;