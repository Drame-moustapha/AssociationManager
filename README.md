# AssociationManager

Application web de gestion associative composée d’une API **Spring Boot 3.4 / Java 21**, d’une interface **Angular 19** et d’une base **PostgreSQL 16**.

> Le dépôt est en cours de développement. Les fonctions décrites ci-dessous reflètent le code présent, et non les modules envisagés mais pas encore reliés à une API.

## État des fonctionnalités

### API backend

- Authentification par e-mail/mot de passe et JWT.
- Renouvellement avec rotation et révocation du refresh token.
- Gestion CRUD des associations et des membres.
- Validation des entrées, contrôle d’accès Spring Security et migrations de schéma avec Flyway.
- Les autres tables métier (activités, réunions, gouvernance et finances) sont présentes dans les migrations, mais leurs API ne sont pas encore toutes exposées.

### Application Angular

- Connexion/déconnexion intégrées aux routes backend `/api/v1/auth/login`, `/refresh` et `/logout`.
- Jetons conservés en mémoire; ils sont perdus au rechargement de la page.
- Routes protégées, guard de rôle et navigation de l’espace associatif.
- Gestion des associations et des membres (liste, recherche/filtre, création, modification et suppression) reliée aux endpoints CRUD.
- Tableau de bord responsive et pages d’information pour les modules qui ne disposent pas encore d’endpoints backend.

Les rôles que le backend accepte actuellement en base sont `ADMIN`, `ASSOCIATION_ADMIN` et `MEMBER`. Les rôles `SUPER_ADMIN`, `PRESIDENT`, `SECRETAIRE` et `TRESORIER` évoqués dans la conception ne sont pas encore pris en charge par le modèle backend actuel.

## Prérequis

- Java 21
- Maven 3.9+
- Docker et Docker Compose
- Node.js compatible avec Angular 19 et npm

## Démarrage local

1. À la racine du dépôt, initialiser les variables locales :

   ```bash
   cp .env.example .env
   ```

2. Démarrer PostgreSQL :

   ```bash
   docker compose up -d postgres
   ```

3. Démarrer l’API dans un terminal :

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Flyway applique les migrations au démarrage. L’API écoute par défaut sur `http://localhost:8080`; vérifier la disponibilité avec `GET http://localhost:8080/api/health`.

4. Démarrer l’interface dans un autre terminal :

   ```bash
   cd frontend
   npm install
   npm start
   ```

   Angular sert l’application sur `http://localhost:4200`. L’URL de l’API par défaut est `http://localhost:8080/api/v1`, définie dans `frontend/src/environments/environment.ts`.

## Configuration

Le backend accepte notamment les variables `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` et `SERVER_PORT`. Les paramètres JWT et CORS se trouvent dans `backend/src/main/resources/application.yml` et peuvent être remplacés par `JWT_SECRET`, `JWT_ACCESS_TTL`, `JWT_REFRESH_TTL` et `CORS_ALLOWED_ORIGINS`.

Pour un déploiement, configurez une clé JWT unique et forte, les identifiants de base de données, les origines CORS autorisées et l’URL d’API de l’environnement de production. Ne réutilisez pas les valeurs de développement.

## Endpoints disponibles

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/v1/auth/login` | Authentifier un utilisateur; renvoie les tokens et les informations du compte |
| `POST` | `/api/v1/auth/refresh` | Renouveler les tokens avec le refresh token |
| `POST` | `/api/v1/auth/logout` | Révoquer le refresh token |
| `POST` | `/api/v1/associations` | Créer une association (administrateur) |
| `GET` | `/api/v1/associations` | Lister les associations (administrateur) |
| `GET` | `/api/v1/associations/{id}` | Lire une association autorisée |
| `PUT` | `/api/v1/associations/{id}` | Modifier une association autorisée |
| `DELETE` | `/api/v1/associations/{id}` | Supprimer une association autorisée sans membres dépendants |
| `POST` | `/api/v1/associations/{associationId}/members` | Ajouter un membre |
| `GET` | `/api/v1/associations/{associationId}/members` | Lister les membres |
| `GET` | `/api/v1/associations/{associationId}/members/{memberId}` | Lire un membre |
| `PUT` | `/api/v1/associations/{associationId}/members/{memberId}` | Modifier un membre |
| `DELETE` | `/api/v1/associations/{associationId}/members/{memberId}` | Supprimer un membre |

Les opérations d’association et de membre sont soumises aux autorisations côté serveur. Les guards et éléments de navigation Angular améliorent l’expérience utilisateur, mais ne remplacent jamais ces contrôles backend.

## Tests et compilation

Tests backend (H2 en mémoire; PostgreSQL n’est pas requis pour cette commande) :

```bash
cd backend
mvn test
```

Compilation frontend :

```bash
cd frontend
npm install
npm run build
```

## Structure frontend

Le frontend est organisé en application Angular standalone :

- `src/app/core/` : authentification, guards, intercepteurs et services partagés;
- `src/app/features/` : connexion, tableau de bord, associations, membres et pages de modules;
- `src/app/layouts/` : layout de l’espace connecté;
- `src/environments/` : URL d’API pour développement et production.

## Sécurité et limites actuelles

Le backend renvoie actuellement le refresh token dans le corps JSON; le frontend le conserve en mémoire et l’envoie explicitement aux routes refresh/logout. Il n’est donc pas encore stocké dans un cookie `HttpOnly`, `Secure`, `SameSite`, et aucune restauration automatique de session après rechargement n’est disponible. Le stockage mémoire réduit la persistance du token, mais ne protège pas contre une compromission XSS active.

Cette version est un socle de développement. Avant une mise en production, compléter les protections de session et CSRF adaptées, vérifier les autorisations par rôle et par association, sécuriser la configuration, puis ajouter des tests d’intégration couvrant les parcours et les refus d’accès.

## Modules à compléter

Les migrations préparent des domaines tels que gouvernance, activités, réunions et finances, mais les pages correspondantes du frontend sont pour le moment informatives. Il reste à exposer et intégrer leurs API, puis à compléter les modules prévus de propositions, annonces, notifications, documents et rapports.
