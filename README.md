# TP Auth - React, Node.js, Express et MySQL

Application full-stack d'authentification et de gestion des utilisateurs.

Ce projet contient :
- un **frontend** en **React + Vite**
- un **backend** en **Node.js + Express**
- une base de données **MySQL**
- une authentification avec **JWT**

## Fonctionnalités

- Inscription d'un utilisateur
- Connexion avec email et mot de passe
- Génération d'un token JWT
- Accès protégé à la liste des utilisateurs
- Affichage des utilisateurs dans un dashboard
- Modification d'un utilisateur
- Suppression d'un utilisateur
- Déconnexion

## Structure du projet

```bash
tp-auth/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   ├── .env.example
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── schema.sql
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── logs/
```

## Technologies utilisées

### Frontend
- React
- Vite
- React Router DOM
- Axios

### Backend
- Node.js
- Express
- MySQL2
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- cors

## Prérequis

Avant de lancer le projet, il faut installer :
- **Node.js**
- **npm**
- **MySQL**

## Installation

### 1) Cloner le projet

```bash
git clone <url-du-repo>
cd tp-auth
```

### 2) Installer les dépendances du backend

```bash
cd backend
npm install
```

### 3) Installer les dépendances du frontend

```bash
cd ../frontend
npm install
```

## Configuration de la base de données

### 1) Créer la base MySQL

Ouvrir MySQL puis exécuter le fichier `schema.sql` :

```sql
CREATE DATABASE IF NOT EXISTS tp_auth;
USE tp_auth;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  age INT NULL,
  cin VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2) Configurer le fichier `.env`

Dans le dossier `backend`, créer un fichier `.env` en vous basant sur `.env.example` :

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tp_auth

JWT_SECRET=reactNodeMysqlTP
```

Adaptez les valeurs selon votre configuration MySQL.

## Lancement du projet

### 1) Démarrer le backend

Depuis le dossier `backend` :

```bash
npm run dev
```

Le serveur backend démarre sur :

```bash
http://localhost:5000
```

### 2) Démarrer le frontend

Depuis le dossier `frontend` :

```bash
npm run dev
```

Le frontend démarre généralement sur :

```bash
http://localhost:5173
```

## Routes API

### Authentification

#### Inscription
```http
POST /api/auth/signup
```

Body JSON :

```json
{
  "name": "Amine",
  "email": "amine@example.com",
  "password": "123456",
  "age": 22,
  "cin": "AB123456"
}
```

#### Connexion
```http
POST /api/auth/login
```

Body JSON :

```json
{
  "email": "amine@example.com",
  "password": "123456"
}
```

### Utilisateurs

#### Obtenir tous les utilisateurs
```http
GET /api/users
```
> Route protégée par JWT

#### Modifier un utilisateur
```http
PUT /api/users/:id
```
> Route protégée par JWT

#### Supprimer un utilisateur
```http
DELETE /api/users/:id
```
> Route protégée par JWT

## Pages du frontend

- `/login` : page de connexion
- `/signup` : page d'inscription
- `/dashboard` : tableau de bord des utilisateurs

## Fonctionnement général

1. L'utilisateur crée un compte depuis la page **Signup**.
2. Il se connecte depuis la page **Login**.
3. Le backend retourne un **token JWT**.
4. Le token est sauvegardé dans le **localStorage**.
5. À chaque requête protégée, le token est envoyé dans le header `Authorization`.
6. L'utilisateur accède ensuite au **dashboard** pour voir, modifier ou supprimer des utilisateurs.

## Scripts utiles

### Backend
```bash
npm run dev
```
Lance le serveur avec **nodemon**.

### Frontend
```bash
npm run dev
```
Lance l'application React avec **Vite**.

```bash
npm run build
```
Construit l'application pour la production.

## Points importants

- Le frontend appelle l'API sur :

```js
http://localhost:5000/api
```

- Le token JWT est stocké dans le navigateur avec `localStorage`.
- Les routes `/api/users` sont protégées.
- Le mot de passe est hashé avec `bcrypt` avant d'être enregistré dans la base.

## Exemple de test rapide

1. Créer un compte sur `/signup`
2. Se connecter sur `/login`
3. Accéder au dashboard
4. Vérifier l'affichage des utilisateurs
5. Modifier un utilisateur
6. Supprimer un utilisateur
7. Se déconnecter

## Améliorations possibles

- Ajouter la validation des formulaires
- Afficher les vrais messages d'erreur du backend
- Ajouter la protection de route côté frontend
- Ajouter une page profil
- Ajouter Swagger ou Postman collection
- Déployer le projet

## Auteur

Projet réalisé dans le cadre d'un TP de développement full-stack avec **React**, **Node.js**, **Express** et **MySQL**.
