# AssociationManager

Application de gestion d’association construite avec **Spring Boot**, **Angular** et **PostgreSQL**. Le projet est mis en place progressivement : cette première étape fournit le socle technique et un contrôle de santé de l’API.

## Étape 1 — Démarrer le socle

### Prérequis
- Java 21
- Maven 3.9+
- Docker et Docker Compose
- Node.js 20.19+ et npm 10+ (pour le frontend Angular)

### 1. Configurer l’environnement

```bash
cp .env.example .env
```

Les valeurs fournies sont réservées au développement local. Ne les utilisez pas en production.

### 2. Démarrer PostgreSQL

```bash
docker compose up -d postgres
```

### 3. Démarrer l’API

```bash
cd backend
mvn spring-boot:run
```

Vérifier l’API : `http://localhost:8080/api/health`

### 4. Démarrer l’interface Angular

```bash
cd frontend
npm install
npm start
```

Ouvrir `http://localhost:4200`.

### Tests du backend

```bash
cd backend
mvn test
```

## Étapes suivantes
1. Définir et valider le modèle de données de l’association.
2. Implémenter les migrations PostgreSQL et les entités métier.
3. Ajouter l’authentification et les rôles/permissions.
4. Développer les fonctionnalités métier et leurs API.
5. Relier les écrans Angular à l’API, puis compléter les tests et le déploiement.
