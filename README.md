# API REST Node.js avec Express et MongoDB

Une API REST complète permettant la gestion d'articles et d'utilisateurs avec authentification.

## 🚀 Fonctionnalités

-   Gestion complète des articles (CRUD)
-   Système d'authentification utilisateur
-   Validation des données
-   Gestion des erreurs

## 📋 Prérequis

-   Node.js
-   MongoDB
-   npm ou yarn

## 🛠️ Installation

1. Clonez le repository
2. Installez les dépendances :

```bash
npm install
```

3. Créez un fichier .env avec les variables d'environnement suivantes :

```javascript
HOSTNAME=localhost
PORT=3000
DATABASE=mongodb://localhost:27017/votre_base
KEY_JWT=votre_clé_secrète
```

4. Lancez l'application :

```bash
npm start
```

## 📝 Endpoints

Articles:

-   GET /api/articles : Récupère tous les articles
-   GET /api/articles/:uuid : Récupère un article par son UUID
-   POST /api/articles/create : Crée un nouvel article
-   PUT /api/articles/update/:uuid : Met à jour un article existant
-   DELETE /api/articles/:uuid : Supprime un article existant

Auth:

-   POST /api/auth/register : Crée un nouvel utilisateur

Modèles de données:

Articles:

```javascript
{
    uuid: UUID,
    title: String (unique),
    content: String,
    author: String,
    createdAt: Date
}
```

Utilisateurs:

```javascript
{
    uuid: UUID,
    pseudo: String (unique),
    email: String (unique),
    password: String (hashé),
    role: Enum["USER", "ADMIN"],
    createdAt: Date
}
```
