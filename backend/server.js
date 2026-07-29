require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");
require("./models/user.model");

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log("Connecte a la base de donnees");
    app.listen(PORT, () => {
      console.log("Serveur demarre sur le port " + PORT);
    });
  })
  .catch((err) => {
    console.log("Erreur de connexion:", err);
  });