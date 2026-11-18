# AssociationManager

Application de gestion d’association avec **Spring Boot 3.4**, **Java 21**, **Angular 19** et **PostgreSQL 16**.

## Backend — état et démarrage

Le backend fournit actuellement une première tranche fonctionnelle : gestion CRUD des associations et de leurs membres, validations de requêtes, réponses d'erreur cohérentes, schéma PostgreSQL versionné avec Flyway et contrôle de santé.

### Prérequis
- Java 21
- Maven 3.9+
- Docker et Docker Compose

### Lancer l'API étape par étape

1. Depuis la racine, créer la configuration locale :
   ```bash
   cp .env.example .env
   ```
2. Démarrer PostgreSQL :
   ```bash
   docker compose up -d postgres
   ```
3. Lancer l'API :
   ```bash
   cd backend
   mvn spring-boot:run
   ```
4. Vérifier : `GET http://localhost:8080/api/health`

Flyway applique automatiquement les migrations au démarrage. La configuration par défaut est destinée au développement local ; ne pas utiliser les identifiants locaux en production.

### Configuration de la base

Variables reconnues par Spring : `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `SERVER_PORT`.
Par défaut, l'API se connecte à `jdbc:postgresql://localhost:5432/association_manager`.

### API disponible

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/v1/associations` | Créer une association |
| `GET` | `/api/v1/associations` | Lister les associations |
| `GET` | `/api/v1/associations/{id}` | Lire une association |
| `PUT` | `/api/v1/associations/{id}` | Modifier une association |
| `DELETE` | `/api/v1/associations/{id}` | Supprimer une association sans membres |
| `POST` | `/api/v1/associations/{associationId}/members` | Ajouter un membre |
| `GET` | `/api/v1/associations/{associationId}/members` | Lister les membres |
| `GET` | `/api/v1/associations/{associationId}/members/{memberId}` | Lire un membre |
| `PUT` | `/api/v1/associations/{associationId}/members/{memberId}` | Modifier un membre |
| `DELETE` | `/api/v1/associations/{associationId}/members/{memberId}` | Supprimer un membre |

Exemple de création d’association :
```bash
curl -X POST http://localhost:8080/api/v1/associations \
  -H 'Content-Type: application/json' \
  -d '{"name":"Association Exemple","email":"contact@example.org","description":"Association locale"}'
```

### Tests
```bash
cd backend
mvn test
```
Les tests utilisent une base H2 en mémoire et ne nécessitent pas PostgreSQL.

## Étapes backend suivantes
1. Authentification et autorisations (JWT, utilisateurs, rôles/permissions).
2. Bureaux, volets, élections et activités.
3. Propositions, commentaires et notifications.
4. Cotisations, collectes, contributions et paiements.
5. Documents, reporting et tests d'intégration PostgreSQL.

> **Sécurité :** l'authentification n'est pas encore implémentée. Cette version est un socle de développement et ne doit pas être exposée sur Internet ni utilisée en production.
