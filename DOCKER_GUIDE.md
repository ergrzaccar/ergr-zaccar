# 🐳 Guide de Déploiement Docker — ERGR Zaccar

Ce guide détaille la mise en production du portail web et du service backend de l'**ERGR Zaccar** à l'aide de Docker et Docker Compose.

---

## 🏗️ Architecture des Conteneurs

L'application est orchestrée en deux services indépendants et optimisés :

1. **`ergr-frontend` (Nginx:Alpine)** :
   - Compile le frontend React 19 / TypeScript en fichiers statiques minimisés (`npm run build`).
   - Sert les pages ultra-rapidement avec compression Gzip activée.
   - Intègre les en-têtes de sécurité HTTP (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
   - Gère le cache des images et assets pendant 1 an.
   - Fait office de **Reverse Proxy** pour relayer de manière transparente les requêtes `/api/*` vers le backend.
   - Écoute sur le **port 80** standard.

2. **`ergr-backend` (Node.js 20:Alpine)** :
   - Exécute le serveur Express pour la gestion des formulaires de contact et de recrutement.
   - Gère l'upload sécurisé des CVs au format PDF (jusqu'à 10 Mo).
   - Assure l'envoi direct des e-mails vers **`zaccar.informatique@gmail.com`** via Google SMTP.
   - Sauvegarde les archives dans un **volume persistant Docker** (`inbox_data`) afin de ne jamais perdre de soumission lors des mises à jour de conteneurs.

---

## 🚀 Démarrage Rapide sur un Serveur (VPS / Dédié)

### 1. Prérequis
- Avoir installé **Docker** et **Docker Compose** sur le serveur.
  *(Sur Ubuntu/Debian : `apt update && apt install -y docker.io docker-compose-v2`)*

### 2. Cloner le Dépôt
```bash
git clone https://github.com/ergrzaccar/ergr-zaccar.git
cd ergr-zaccar
```

### 3. Configurer les Variables d'Environnement
Copiez le modèle et vérifiez vos identifiants :
```bash
cp .env.example .env
nano .env
```
Assurez-vous que les lignes suivantes sont présentes :
```env
PORT=5000
RECIPIENT_EMAIL=zaccar.informatique@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=zaccar.informatique@gmail.com
SMTP_PASS=gept cjlp kgdx qsvj
APP_NAME=ERGR Zaccar
```

### 4. Lancer les Conteneurs
```bash
docker compose up -d --build
```
> Le site est instantanément accessible sur le port **80** (ex : `http://votre-ip-ou-domaine.dz`).

---

## 🛠️ Commandes Utiles d'Exploitation

| Action | Commande |
|---|---|
| **Voir l'état des conteneurs** | `docker compose ps` |
| **Voir les logs en direct** | `docker compose logs -f` |
| **Voir les logs du backend (e-mails)** | `docker compose logs -f backend` |
| **Arrêter les conteneurs** | `docker compose down` |
| **Redémarrer les conteneurs** | `docker compose restart` |
| **Mettre à jour après un git pull** | `git pull && docker compose up -d --build` |

---

## 💾 Sauvegarde des Données

Les dossiers de candidature et messages archivés sont stockés dans le volume Docker persistant `inbox_data`.
Pour sauvegarder les archives sur votre machine :
```bash
docker run --rm -v projet_inbox_data:/data -v $(pwd):/backup alpine tar czf /backup/inbox_backup.tar.gz /data
```
