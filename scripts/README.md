# 🧠 autoDesign — Pipeline de Fine-Tuning & Inférence LLM (Text-to-DSL)

Ce dossier contient tous les outils pour générer les données d'entraînement, fine-tuner un petit LLM (SLM) avec **Unsloth (QLoRA 4-bit)** et l'exécuter localement avec **Ollama**.

---

## 📁 Contenu du dossier `scripts/`

- [`generate_dataset.ts`](./generate_dataset.ts) : Générateur de dataset synthétique avec **validation syntaxique 100% garantie** via le parser officiel du projet (`parseTemplateDsl`).
- [`train_unsloth.py`](./train_unsloth.py) : Script d'entraînement Python (QLoRA 4-bit avec Unsloth) optimisé pour GPU 8 Go (ex: RTX 4060 Ti) avec export automatique vers GGUF.
- [`Modelfile`](./Modelfile) : Fichier de configuration Ollama pour charger le modèle fine-tuné et configurer son template ChatML et ses hyperparamètres d'inférence.
- [`data/`](./data/) : Dossier recevant le dataset d'entraînement JSONL (`autodesign_train_dataset.jsonl`).

---

## 🚀 Guide Pas-à-Pas

### Étape 1 : Générer le Dataset d'entraînement

Générez 3 000 exemples (ou le nombre souhaité) au format standard ChatML :

```bash
npm run dataset:generate
# ou avec un nombre personnalisé :
npx tsx scripts/generate_dataset.ts 5000
```

> Le fichier produit se trouvera dans `scripts/data/autodesign_train_dataset.jsonl`.

---

### Étape 2 : Préparer l'environnement Python pour Unsloth

Dans un environnement Python 3.10+ (de préférence avec `venv` ou `conda`) :

```bash
# 1. Créer et activer l'environnement virtuel
python3 -m venv .venv-unsloth
source .venv-unsloth/bin/activate

# 2. Installer PyTorch avec support CUDA
pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 3. Installer Unsloth et les dépendances d'entraînement
pip install "unsloth[cu121-torch240] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps trl peft accelerate bitsandbytes datasets
```

---

### Étape 3 : Lancer le Fine-Tuning

Lancez l'entraînement :

```bash
python scripts/train_unsloth.py
```

* **VRAM consommée** : ~3,5 à 4,5 Go (parfait pour votre RTX 4060 Ti 8 Go).
* **Durée** : ~5 à 15 minutes.
* **Résultat** : Un modèle quantifié `autodesign_model_q4_k_m.gguf` est automatiquement créé à la racine du projet ou dans `scripts/`.

---

### Étape 4 : Déployer et tester dans Ollama

1. **Créer le modèle dans Ollama** :
```bash
ollama create autodesign -f scripts/Modelfile
```

2. **Tester en ligne de commande** :
```bash
ollama run autodesign "Crée une roadmap produit 2026 en 4 étapes : Audit, MVP, Beta, Launch avec des icônes"
```

3. **Utiliser via l'API HTTP locale d'Ollama** :
```bash
curl http://localhost:11434/api/generate -d '{
  "model": "autodesign",
  "prompt": "Génère un processus de recrutement en 4 étapes avec les icônes",
  "stream": false
}'
```
