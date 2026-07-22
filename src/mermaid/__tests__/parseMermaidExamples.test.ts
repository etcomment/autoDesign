import { describe, it, expect } from 'vitest'
import { parseMermaid } from '../parseMermaid'

describe('parseMermaid — exemples utilisateur', () => {
  it('parse le diagramme de séquence', () => {
    const dsl = `sequenceDiagram
    autonumber
    Client->>Serveur: Requête POST /login
    Serveur->>BDD: Vérification identifiants
    BDD-->>Serveur: OK
    Serveur-->>Client: Token JWT`

    const { model, diagramType } = parseMermaid(dsl)
    expect(diagramType).toBe('sequence')
    expect(model.shapes).toHaveLength(3)
    expect(model.connections).toHaveLength(4)
  })

  it('parse le diagramme de classe', () => {
    const dsl = `classDiagram
    class Utilisateur {
        +String nom
        +String email
        +connecter()
    }
    class Admin {
        +Array permissions
        +banir()
    }
    Utilisateur <|-- Admin`

    const { model, diagramType } = parseMermaid(dsl)
    expect(diagramType).toBe('class')
    expect(model.shapes).toHaveLength(2)
    expect(model.connections).toHaveLength(1)
  })

  it('parse le diagramme d etat', () => {
    const dsl = `stateDiagram-v2
    [*] --> Inactif
    Inactif --> EnCours : Démarrer`

    const { model, diagramType } = parseMermaid(dsl)
    expect(diagramType).toBe('state')
    expect(model.shapes.length).toBeGreaterThanOrEqual(2)
    expect(model.connections.length).toBeGreaterThanOrEqual(1)
  })

  it('parse le diagramme ER avec cardinalités', () => {
    const dsl = `erDiagram
    UTILISATEUR ||--o{ COMMANDE : passe
    COMMANDE ||--|{ LIGNE_COMMANDE : contient
    PRODUIT ||--o{ LIGNE_COMMANDE : inclut`

    const { model, diagramType } = parseMermaid(dsl)
    expect(diagramType).toBe('er')
    expect(model.shapes).toHaveLength(4)
    expect(model.connections).toHaveLength(3)
  })

  it('parse le Gantt avec dates et dependances', () => {
    const dsl = `gantt
    title Planning du projet
    dateFormat YYYY-MM-DD
    section Conception
        Cahier des charges :a1, 2026-08-01, 7d
    section Dév
        Backend           :a2, after a1, 10d
        Frontend          :a3, after a1, 12d`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('gantt')
    const data = diagramData as { title: string; sections: Record<string, { name: string; id?: string; start?: string; duration?: number; after?: string }[]> }
    expect(data.title).toBe('Planning du projet')
    expect(Object.keys(data.sections)).toContain('Conception')
    expect(data.sections['Dév']).toHaveLength(2)
    expect(data.sections['Dév']?.[0]?.after).toBe('a1')
    expect(data.sections['Dév']?.[0]?.duration).toBe(10)
  })

  it('parse le mindmap', () => {
    const dsl = `mindmap
  root((Projet AI))
    Frontend
      React
      Tailwind`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('mindmap')
    const root = (diagramData as { root: { text: string; children: { text: string; children: { text: string }[] }[] } }).root
    expect(root.text).toBe('Projet AI')
    expect(root.children).toHaveLength(1)
    expect(root.children[0]?.children).toHaveLength(2)
  })

  it('parse le GitGraph', () => {
    const dsl = `gitGraph
    commit
    branch feature
    checkout feature
    commit id: "Ajout feature"
    checkout main
    merge feature
    commit id: "Release 1.0"`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('gitGraph')
    const data = diagramData as { commits: { id: string; message: string }[] }
    expect(data.commits.length).toBeGreaterThanOrEqual(2)
  })

  it('parse le Pie Chart', () => {
    const dsl = `pie title Répartition du temps
    "Codage" : 40
    "Réunions" : 25`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('pie')
    const data = diagramData as { title: string; slices: { label: string; value: number }[] }
    expect(data.title).toBe('Répartition du temps')
    expect(data.slices).toHaveLength(2)
  })

  it('parse le Quadrant Chart', () => {
    const dsl = `quadrantChart
    title Priorité des tâches
    x-axis Faible effort --> Fort effort
    y-axis Faible impact --> Fort impact
    quadrant-1 À faire absolument
    quadrant-2 Planifier
    Tâche A: [0.3, 0.8]`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('quadrant')
    const data = diagramData as { title: string; quadrantLabels: string[]; quadrants: { label: string; x: number; y: number }[] }
    expect(data.title).toBe('Priorité des tâches')
    expect(data.quadrantLabels[0]).toBe('À faire absolument')
    expect(data.quadrants).toHaveLength(1)
  })

  it('parse le User Journey', () => {
    const dsl = `journey
    title Parcours d'achat
    section Navigation
      Trouver le produit: 5: Client`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('userJourney')
    const data = diagramData as { title: string; sections: { title: string; tasks: { name: string; score: number }[] }[] }
    expect(data.title).toBe("Parcours d'achat")
    expect(data.sections[0]?.tasks[0]?.score).toBe(5)
  })

  it('parse le Timeline', () => {
    const dsl = `timeline
    title Historique
    2024 : Lancement V1
         : 100 premiers clients`

    const { diagramType, diagramData } = parseMermaid(dsl)
    expect(diagramType).toBe('timeline')
    const data = diagramData as { title: string; events: { date: string; title: string }[] }
    expect(data.title).toBe('Historique')
    expect(data.events.length).toBe(2)
    expect(data.events[0]?.title).toBe('Lancement V1')
    expect(data.events[1]?.title).toBe('100 premiers clients')
  })
})
