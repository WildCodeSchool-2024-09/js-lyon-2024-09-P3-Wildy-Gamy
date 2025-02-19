# P3-base

Wildy Gamy est un site web dédié à la boutique physique de jeux d'arcade située à Lyon. Ce site permet aux clients de découvrir les jeux disponibles, les nouveautés ainsi que les informations pratiques concernant la boutique.


FONCTIONNALITES

Présentation des jeux d'arcade disponibles en boutique

Jeux d'arcade jouable sur le site

Contact et avis clients


TECHNOLOGIES UTILISEES

Frontend : HTML, CSS, JavaScript (Framework: React)

Backend : Node.js avec Express 

Base de données : MySQL 

 


## Table des Matières

- [P3-base](#WILDY GAMY)
  - [Utilisateurs Windows](#utilisateurs-windows)
  - [Installation \& Utilisation](#installation--utilisation)
    - [Commandes de Base](#commandes-de-base)

## Utilisateurs Windows

Assurez-vous de lancer ces commandes dans un terminal Git pour éviter [les problèmes de formats de nouvelles lignes](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats) :

```sh
git config --global core.eol lf
git config --global core.autocrlf false
```

## Installation & Utilisation

1. Installez le plugin **Biome** dans VSCode et configurez-le.
2. Clonez ce dépôt, puis accédez au répertoire cloné.
3. Exécutez la commande `npm install`.
4. Créez des fichiers d'environnement (`.env`) dans les répertoires `server` et `client` : vous pouvez copier les fichiers `.env.sample` comme modèles (**ne les supprimez pas**).



### Commandes de Base

| Commande               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `npm install`          | Installe les dépendances pour le client et le serveur                       |
| `npm run db:migrate`   | Met à jour la base de données à partir d'un schéma défini                   |
| `npm run dev`          | Démarre les deux serveurs (client et serveur) dans un seul terminal         |
| `npm run check`        | Exécute les outils de validation (linting et formatage)                     |
| `npm run test`         | Exécute les tests unitaires et d'intégration                                |



Merci de soutenir Wildy Gamy ! 🎮
