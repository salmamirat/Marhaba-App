# Marhaba — Application d'Authentification Full-Stack

Application mobile d'authentification complète (Express + PostgreSQL + Expo) avec double protection des routes : middlewares côté backend, `<Stack.Protected>` côté frontend.

---

## 🚀 Lancer le projet

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Mobile (Expo)

```bash
cd mobile
npm install
cp .env.example .env
npx expo start --clear
```

> ⚠️ Le téléphone et l'ordinateur doivent être sur le **même réseau Wi-Fi**.
> Pour trouver ton IP : `ipconfig` (Windows) ou `ifconfig` (Mac/Linux).

```
Marhaba-App/
├── backend/
└── mobile/
```

---

# Backend — API d'Authentification

API d'authentification (Express + PostgreSQL + Sequelize + JWT) pour l'app mobile **Marhba**.

## Stack

- Node.js / Express
- PostgreSQL + Sequelize
- bcrypt (hash des mots de passe)
- jsonwebtoken (JWT)
- dotenv

## Installation

### 1. Cloner le repo et aller dans le dossier backend

```bash
cd backend
```

### 2. Installer les dependances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copier le fichier d'exemple :

```bash
cp .env.example .env
```

Puis ouvrir `.env` et remplacer les valeurs par les tiennes :

```
PORT=3000
DB_NAME=marhba_db
DB_USER=postgres
DB_PASSWORD=ton_mot_de_passe
DB_HOST=127.0.0.1
DB_PORT=5433
JWT_SECRET=une_longue_chaine_secrete
JWT_EXPIRES_IN=7d
```

⚠️ Si PostgreSQL tourne dans Docker avec un port mappe differemment (ex: `-p 5433:5432`), mets `DB_PORT=5433`.

### 4. Demarrer PostgreSQL

Si tu utilises Docker, verifie que le container tourne :

```bash
docker ps
```

### 5. Lancer le serveur

```bash
npm start
```

Si tout fonctionne, tu dois voir :

```
Connecte a la base de donnees
Serveur demarre sur le port 3000
```

Sequelize cree automatiquement la table `users` au demarrage (`sequelize.sync()`).

## Endpoints

| Methode | Route | Acces | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Publique | Inscription (fullName, email, password) |
| POST | `/api/auth/login` | Publique | Connexion (email, password) |
| GET | `/api/auth/me` | 🔒 Bearer token | Infos de l'utilisateur connecte |

### Exemple — Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Mohamed Harbouli","email":"mohamed@example.com","password":"secret123"}'
```

### Exemple — Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"mohamed@example.com","password":"secret123"}'
```

### Exemple — Me (protege)

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

## Architecture (MVC)

```
backend/
├── config/
│   └── db.js
├── models/
│   └── user.model.js
├── controllers/
│   └── auth.controller.js
├── middlewares/
│   ├── logger.js
│   ├── validate.js
│   ├── authenticate.js
│   └── errorHandler.js
├── routes/
│   └── auth.routes.js
├── app.js
├── server.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```

## Regles de securite respectees

- Mot de passe hashe avec `bcrypt.hash()` (salt rounds : 10), jamais stocke en clair.
- Le mot de passe hashe n'est jamais renvoye dans les reponses JSON.
- Le secret JWT vit dans `.env` (ignore par Git).
- Le JWT expire (`JWT_EXPIRES_IN`, par defaut `7d`).
- Message d'erreur identique pour "email inexistant" et "mauvais mot de passe" : `"Email ou mot de passe incorrect"`.
- La verification du token vit uniquement dans le middleware `authenticate`, jamais dans un controller.
- Les erreurs inattendues passent par `next(err)` et sont geres par le middleware `errorHandler` centralise, place en dernier dans `app.js`.

## Tester avec Postman

1. Creer une collection "Marhba API".
2. Ajouter les 3 requetes : `POST /register`, `POST /login`, `GET /me`.
3. Tester `/me` deux fois : une fois sans token (doit retourner 401), une fois avec le token recu apres login (doit retourner les infos utilisateur).
4. Exporter la collection (`Export` -> format Collection v2.1) pour la livrer.