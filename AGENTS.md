# autoDesign — Conventions de développement

## Stack
- React 19 + TypeScript 6 (strict) + Vite 8
- Zustand (state) + immer (immutabilité)
- Vitest (tests) + React Testing Library
- pptxgenjs v4 (export PPTX) + dagre (layout graphe)
- Lucide React (icônes)

## Architecture
```
src/
├── core/           # Engine pur, pas de React
│   ├── model/      # DiagramModel, Shape, Connection
│   ├── commands/   # Command Pattern (undo/redo)
│   └── validation/
├── editor/         # Canvas, ShapeRenderer, ResizeHandles, ConnectionLines
├── panels/         # ShapeLibrary, PropertiesPanel, Toolbar, MermaidEditor
├── export/         # generateSvg, generatePptx, generateImage
├── mermaid/        # parseMermaid (parser DSL)
├── store/          # diagramStore (Zustand)
├── hooks/          # Custom hooks
└── lib/            # Wrappers (interact.js, pptxgenjs)
```

## Conventions Clean Code
- Pas d'abréviations (`shape` pas `sh`, `connection` pas `conn`)
- Fonctions = verbes (`createShape`, `moveElement`)
- Booléens = `is`, `has`, `can` (`isSelected`, `hasValidDimensions`)
- Pas de `any` — jamais
- PAS de commentaires dans le code (sauf TODO.md ou doc technique)
- Pas d'effets de bord cachés (pure functions hors store/IO)
- Max ~300 lignes par fichier
- Pas de `utils`, `helpers` fourre-tout

## TDD
1. Écrire le test qui décrit le comportement
2. Écrire l'implémentation minimale
3. Refactorer (tests doivent toujours passer)
- Tests unitaires pour le core engine + commands + serialization
- Pas de tests UI pour l'instant (intégration en Phase 4)

## Commandes
```bash
npm run dev          # Dev server
npm run build        # tsc -b && vite build
npm test             # vitest run
npm run test:watch   # vitest (watch mode)
npm run lint         # oxlint
```

## Git
- Langue : français
- Format commit : `type(scope): message`
- Types : feat, fix, test, refactor, docs, style, chore
