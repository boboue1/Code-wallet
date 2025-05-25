Code Wallet
Une application React simple et élégante pour gérer vos fragments de code avec un formulaire modale. Permet d’ajouter, modifier, supprimer des fragments, et d’organiser ceux-ci avec des tags.
Un fragment peut comporter plusieurs Tags.
Les fragments sont modifés à volonté.
Les tags ne peuvent être ajoutés depuis le formulaire Tag.
Les tags peuvent être supprimés depuis les Tags, comme on peut l'ajputer en modifiant le fragment.

Technologies utilisées:
_**React (hooks : useState, useEffect)**
styled-components pour le style CSS en JS
JavaScript moderne (ES6+)
Highlight.js une bibliothèque JavaScript open source utilisée pour faire de la coloration syntaxique automatique dans les blocs de code affichés sur une page web.

Lancement:
Npm run dev avec react
npm save dev avec Electron car c'est une application de bureau.

//Ce qui faut faire pour arriver au rendu final

## Technologies requises

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure recommandée)  
- **npm** (inclus avec Node.js) ou **yarn**  
- Un navigateur moderne pour exécuter l’application  
- Un compte Firebase avec un projet configuré (Firestore activé)

---

## Installation et déploiement
. **Cloner le dépôt :**

```bash
git clone <URL_DU_REPO>
cd code-wallet

Configurer Firebase :

Créez un projet Firebase sur https://console.firebase.google.com/.

Activez Firestore dans le projet.

Récupérez la configuration Firebase (apiKey, authDomain, projectId, etc.).

Créez un fichier .env.local à la racine du projet avec les variables d’environnement :
