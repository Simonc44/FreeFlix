# 🎬 FreeFlix - Plateforme de Streaming de Films Moderne

![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**FreeFlix** est un prototype d'application web de streaming de films, conçu pour offrir une expérience utilisateur fluide, moderne et immersive. Ce projet met en œuvre une interface élégante, des fonctionnalités de recommandation intelligentes grâce à l'IA, et une gestion de contenu robuste.

![FreeFlix Hero Section](https://github.com/Simonc44/FreeFlix/blob/main/freeflix.png?raw=true) 

---

## ✨ Fonctionnalités Principales

- **Interface Moderne et Responsive** : Une interface utilisateur soignée avec un mode sombre par défaut, entièrement responsive pour une expérience optimale sur tous les appareils (ordinateur, tablette, mobile).
- **Catalogue de Films Riche** : Parcourez, recherchez et découvrez une vaste collection de films, classés par genre et popularité.
- **Recherche Instantanée** : Trouvez rapidement vos films préférés grâce à une barre de recherche performante.
- **Gestion de Compte Utilisateur** : Système d'authentification complet (inscription et connexion) pour une expérience personnalisée.
- **Liste Personnelle (Watchlist)** : Les utilisateurs peuvent ajouter ou retirer des films de leur liste personnelle pour les retrouver facilement.
- **Lecteur Vidéo Intégré** : Un lecteur vidéo personnalisé avec des contrôles avancés (lecture/pause, avance/recul, volume, plein écran) et des raccourcis clavier.
- **Fonctionnalités IA avec Genkit** :
  - **Recommandations Personnalisées** : Des suggestions de films basées sur l'historique de visionnage de l'utilisateur.
  - **Résumés par IA** : Générez des résumés concis de films en un seul clic pour avoir un aperçu rapide.

---

## 🛠️ Stack Technique

Ce projet est construit avec une stack moderne et performante, axée sur l'écosystème JavaScript/TypeScript.

- **Framework** : **Next.js 15** (App Router, Server Components)
- **Langage** : **TypeScript**
- **Styling** : **Tailwind CSS**
- **Composants UI** : **ShadCN UI** (personnalisables et accessibles)
- **Fonctionnalités IA** : **Google Genkit** pour l'orchestration des modèles génératifs.
- **Authentification & Base de Données** : **Firebase** (Authentication, Firestore)
- **Icônes** : **Lucide React**

---

## 🚀 Démarrage Rapide

Pour lancer le projet en local, suivez ces étapes :

1.  **Clonez le dépôt** :
    ```bash
    git clone https://github.com/votre-utilisateur/freeflix.git
    cd freeflix
    ```

2.  **Installez les dépendances** :
    ```bash
    npm install
    ```

3.  **Configurez les variables d'environnement** :
    Créez un fichier `.env` à la racine du projet et ajoutez-y vos clés d'API Firebase et Genkit. Vous pouvez vous baser sur `src/firebase/config.ts` pour la structure de la configuration Firebase.
    ```env
    # Clés pour l'API Google (Genkit)
    GEMINI_API_KEY=VOTRE_CLE_API_GEMINI

    # (La configuration Firebase est gérée dans src/firebase/config.ts)
    ```

4.  **Lancez le serveur de développement** :
    ```bash
    npm run dev
    ```

5.  **Ouvrez votre navigateur** :
    Rendez-vous à l'adresse [http://localhost:9002](http://localhost:9002) pour voir l'application en action.

---

## ⚖️ Avertissement

FreeFlix est un **projet de démonstration** à des fins éducatives. Le contenu (films, affiches, descriptions) est utilisé à titre d'illustration. Aucune violation des droits d'auteur n'est intentionnelle. Nous ne détenons aucun droit sur le contenu présenté.

## 🧾 Licence

Ce projet est publié sous licence **MIT**.  
Le code source peut être utilisé librement à des fins éducatives ou personnelles.  
