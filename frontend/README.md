# AssociationManager — Frontend

Application Angular standalone pour la gestion d’associations.

## Démarrage

1. Démarrer l’API Spring Boot et PostgreSQL selon les instructions à la racine du dépôt.
2. Depuis `frontend/`, installer les dépendances puis lancer `npm start`.
3. L’application appelle l’API à `http://localhost:8080/api/v1` (configurable dans `src/environments/environment.ts`). Le backend autorise par défaut les origines Angular `localhost:4200` et `127.0.0.1:4200`.

## Fonctionnalités

- Connexion, renouvellement et déconnexion via `/auth/login`, `/auth/refresh` et `/auth/logout`.
- Renouvellement automatique et partagé du jeton d’accès après une réponse 401, sans persistance des jetons dans le stockage navigateur.
- Jetons conservés en mémoire uniquement. Le backend renvoie actuellement le refresh token dans le corps JSON; l’interface utilise ce contrat existant.
- Routes protégées, redirection de retour après connexion et navigation adaptée aux rôles connus du backend (`ADMIN`, `ASSOCIATION_ADMIN`, `MEMBER`).
- Gestion des associations et des membres avec recherche, filtres, formulaires, modification et suppression, branchée sur les endpoints backend existants. Un administrateur sélectionne l’association avant de gérer ses membres.
- Tableau de bord alimenté par les associations ou les membres réels selon le rôle. Les modules sans endpoints backend disponibles affichent leur état plutôt que des données fictives.

## Sécurité

Le filtrage des menus et les guards ne remplacent jamais les contrôles d’autorisation du serveur. L’API demeure l’autorité pour chaque opération. Les jetons sont effacés au rechargement; l’utilisateur doit alors se reconnecter puisque le backend actuel ne fournit pas de refresh-cookie HttpOnly.
