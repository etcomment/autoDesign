# autoDesign API Headless (Génération par DSL)

L'API autoDesign permet de générer des diagrammes et templates visuels à partir de code DSL sans ouvrir d'interface graphique. Elle produit directement des fichiers **SVG**, **HTML**, **PNG** ou **PPTX**.

Le serveur API est complètement isolé du frontend et peut être exécuté dans n'importe quel environnement Node.js / Docker / CI-CD.

---

## 🚀 Démarrage du serveur

```bash
# Démarrage standard (port 3001 par défaut)
npm run server

# Démarrage avec rechargement automatique (mode dev)
npm run server:dev

# Personnaliser le port d'écoute
PORT=8080 npm run server
```

---

## 📡 Endpoints de l'API

### 1. `POST /api/render` ou `POST /api/render/:format`

Génère et renvoie le fichier rendu dans le format souhaité.

#### Formats supportés
| Format | Content-Type | Description |
|---|---|---|
| `svg` *(défaut)* | `image/svg+xml` | Rendu vectoriel pur, scalable et transparent |
| `png` | `image/png` | Image rasterisée haute résolution via `@resvg/resvg-js` |
| `pptx` | `application/vnd.openxmlformats-...` | Présentation PowerPoint 16:9 widescreen |
| `html` | `text/html` | Page HTML5 autonome avec conteneur centré et responsive |

#### Paramètres acceptés
- **`dsl`** *(obligatoire)* : Le code DSL du template (ex: `@roadmap`, `@puzzle`, `@dashboard`, ou directement sans le `@`).
- **`format`** *(optionnel)* : `svg`, `png`, `pptx`, ou `html`.
- **`width`** *(optionnel)* : Largeur cible en pixels (pour SVG, PNG ou conteneur).
- **`height`** *(optionnel)* : Hauteur cible en pixels.

---

## 💡 Exemples d'appels `curl`

### Exemple 1 : Requête JSON avec sortie PNG

```bash
curl -X POST http://localhost:3001/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "dsl": "@roadmap \"Roadmap 2026\"\n  milestone \"Lancement\" \"Q1 2026\"\n  milestone \"API Headless\" \"Q2 2026\"",
    "format": "png"
  }' \
  --output roadmap.png
```

### Exemple 2 : Raccourci d'URL pour PPTX

```bash
curl -X POST http://localhost:3001/api/render/pptx \
  -H "Content-Type: application/json" \
  -d '{
    "dsl": "@puzzle \"Stratégie Entreprise\"\n  piece \"Vision\" \"Objectifs long terme\"\n  piece \"Exécution\" \"Déploiement terrain\""
  }' \
  --output strategie.pptx
```

### Exemple 3 : Envoi direct d'un fichier DSL brut (`text/plain`)

```bash
# Envoi d'un fichier .dsl existant avec paramètre d'URL
curl -X POST "http://localhost:3001/api/render?format=svg" \
  -H "Content-Type: text/plain" \
  --data-binary @mon_schema.dsl \
  -o diagramme.svg
```

### Exemple 4 : Génération d'une page HTML autonome

```bash
curl -X POST http://localhost:3001/api/render/html \
  -H "Content-Type: application/json" \
  -d '{
    "dsl": "@dashboard \"KPI Q3\"\n  metric \"Utilisateurs\" \"45,000\" #2b63d9 chart:line\n  metric \"Revenus\" \"120,000 €\" #2ecc71 chart:stat"
  }' \
  --output dashboard.html
```

---

## 📋 Métadonnées et catalogue

### `GET /api/templates`
Renvoie la liste exhaustive des templates disponibles avec leur description, catégorie et un exemple de code DSL complet.

```bash
curl http://localhost:3001/api/templates
```

### `GET /api/templates/:type`
Renvoie les détails et un snippet DSL prêt à l'emploi pour un template donné (ex: `roadmap`, `puzzle7`, `dashboard`, etc.).

```bash
curl http://localhost:3001/api/templates/dashboard
```

### `GET /health`
Vérification de l'état de santé du serveur API.

```bash
curl http://localhost:3001/health
# {"status":"ok","service":"autoDesign API","timestamp":"..."}
```

---

## 🧪 Tests automatiques

Pour exécuter tous les tests unitaires et d'intégration de l'API :

```bash
npx vitest run server/
```
