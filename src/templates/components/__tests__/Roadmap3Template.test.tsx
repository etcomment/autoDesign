import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap3Template } from '../Roadmap3Template'
import { useTemplateStore } from '../../store'
import type { RoadmapData } from '../../types'

describe('Roadmap3Template — Checklist de Conformité', () => {
  it('1. Transparence & Cadrage Global : ne doit pas contenir de fond opaque ni de titre global hardcodé', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }, { label: '2025' }],
      milestones: [
        { title: 'Alpha', subtitle: 'Desc Alpha', date: '2024' },
        { title: 'Beta', subtitle: 'Desc Beta', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)

    const backgroundRect = Array.from(container.querySelectorAll('rect')).find(
      r => r.getAttribute('width') === '1000' && r.getAttribute('height') === '600'
    )
    expect(backgroundRect).toBeUndefined()

    expect(container.textContent).not.toContain('Roadmap 3')
    expect(container.textContent).not.toContain('Roadmap3')
  })

  it('2. Conformité DSL & Données : tolère les listes vides et rend les champs du DSL', () => {
    const emptyData: RoadmapData = { type: 'roadmap', milestones: [] }
    const { container: emptyContainer } = render(<svg><Roadmap3Template data={emptyData} /></svg>)
    expect(emptyContainer.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(0)

    const data: RoadmapData = {
      type: 'roadmap',
      lanes: [
        { label: 'Recherche', color: '#23255a' },
        { label: 'Lancement', color: '#2d62ed' },
      ],
      quarters: [{ label: '2024' }, { label: '2025' }, { label: '2026' }],
      milestones: [
        { title: 'Cadrage Initial', subtitle: 'Livrables V1', date: '2024', lane: 'Recherche' },
        { title: 'Go Live', subtitle: 'Déploiement prod', date: '2026', lane: 'Lancement' },
      ],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)
    expect(container.textContent).toContain('Cadrage Initial')
    expect(container.textContent).toContain('Livrables V1')
    expect(container.textContent).toContain('Go Live')
    expect(container.textContent).toContain('Déploiement prod')
    expect(container.textContent).toContain('2024')
    expect(container.textContent).toContain('2026')
  })

  it('3. Géométrie & N-Éléments : espacements dynamiques et absence de NaN', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [
        { label: '2020' }, { label: '2021' }, { label: '2022' }, { label: '2023' },
        { label: '2024' }, { label: '2025' }, { label: '2026' }, { label: '2027' },
      ],
      milestones: [
        { title: 'M1', date: '2020' },
        { title: 'M2', date: '2022' },
        { title: 'M3', date: '2025' },
        { title: 'M4', date: '2027' },
      ],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(8)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(4)

    const paths = Array.from(container.querySelectorAll('path'))
    for (const p of paths) {
      expect(p.getAttribute('d')).not.toContain('NaN')
    }
    const lines = Array.from(container.querySelectorAll('line'))
    for (const l of lines) {
      expect(l.getAttribute('x1')).not.toContain('NaN')
      expect(l.getAttribute('y1')).not.toContain('NaN')
      expect(l.getAttribute('x2')).not.toContain('NaN')
      expect(l.getAttribute('y2')).not.toContain('NaN')
    }
  })

  it('4. Découpage Multi-Lignes : découpe le texte long en tspans avec dy et x explicites', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2026' }],
      milestones: [
        {
          title: 'Titre Très Long Qui Doit Passer Sur Plusieurs Lignes Automatiquement',
          subtitle: 'Description détaillée avec un long paragraphe expliquant la démarche et les résultats attendus dans le projet.',
          date: '2026',
        },
      ],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)
    const tspans = container.querySelectorAll('[data-element-id="card-0"] tspan')
    expect(tspans.length).toBeGreaterThanOrEqual(4)

    for (const tsp of tspans) {
      expect(tsp.getAttribute('x')).not.toBeNull()
      expect(tsp.getAttribute('dy')).not.toBeNull()
    }
  })

  it('5. Auto-Resize Textes : conserve 140px jusqu à 6 lignes, grandit au-delà et réduit immédiatement à la suppression', () => {
    const standardData: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2026' }],
      milestones: [
        {
          title: 'Titre Standard',
          subtitle: 'Ligne 1\nLigne 2\nLigne 3\nLigne 4',
          date: '2026',
        },
      ],
    }
    const { container, rerender } = render(<svg><Roadmap3Template data={standardData} /></svg>)
    const cardPathStandard = container.querySelector('[data-element-id="card-0"] path')?.getAttribute('d') || ''
    expect(cardPathStandard).toContain('190')

    const longData: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2026' }],
      milestones: [
        {
          title: 'Titre Long Sur Deux Lignes Complètes',
          subtitle: 'Description très longue 1\nDescription très longue 2\nDescription très longue 3\nDescription très longue 4\nDescription très longue 5\nDescription très longue 6',
          date: '2026',
        },
      ],
    }
    rerender(<svg><Roadmap3Template data={longData} /></svg>)
    const cardPathLong = container.querySelector('[data-element-id="card-0"] path')?.getAttribute('d') || ''
    const matchLongY = cardPathLong.match(/L \d+ (\d+(\.\d+)?)/g)
    expect(matchLongY).not.toBeNull()
    const maxY = Math.max(...(matchLongY?.map(m => parseFloat(m.replace('L ', '').split(' ')[1]!)) || [0]))
    expect(maxY).toBeGreaterThan(190)

    rerender(<svg><Roadmap3Template data={standardData} /></svg>)
    const cardPathShrunk = container.querySelector('[data-element-id="card-0"] path')?.getAttribute('d') || ''
    expect(cardPathShrunk).toContain('190')
  })

  it('6. Interactivité & Canvas : attribue data-element-id, permet drag/resize et affiche les handles', () => {
    useTemplateStore.setState({
      selectedTemplateElementIds: new Set(['card-0']),
    })

    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }, { label: '2025' }],
      milestones: [
        { title: 'Card 0', subtitle: 'Desc 0', date: '2024' },
        { title: 'Card 1', subtitle: 'Desc 1', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)

    expect(container.querySelector('[data-element-id="card-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="dot-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="year-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="vline-0"]')).not.toBeNull()

    // Handles de sélection sur card-0 (bordures bleues #2196F3 des poignées de redimensionnement)
    const handles = container.querySelectorAll('[data-element-id="card-0"] rect[stroke="#2196F3"]')
    expect(handles.length).toBe(4)
  })

  it('7. Connecteurs & Ancrages Élastiques : la ligne vline se connecte dynamiquement à la pointe de flèche', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }],
      milestones: [{ title: 'Jalon', subtitle: 'Description', date: '2024' }],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)

    const vline = container.querySelector('[data-element-id="vline-0"] line')
    expect(vline).not.toBeNull()
    expect(vline?.getAttribute('y1')).toBe('144.5')
    expect(vline?.getAttribute('y2')).toBe('320')
  })

  it('8. Cascade des Couleurs : respecte UI > DSL color > Phase/Lane > MIGSO_PALETTE', () => {
    const dslData: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }],
      milestones: [{ title: 'Jalon Rouge', color: '#ff0055', date: '2024' }],
    }
    const { container, rerender } = render(<svg><Roadmap3Template data={dslData} /></svg>)
    expect(container.querySelector('[data-element-id="card-0"] path')?.getAttribute('fill')).toBe('#ff0055')

    useTemplateStore.setState({
      templateElementColors: { 'card-0': '#123456' },
    })
    rerender(<svg><Roadmap3Template data={dslData} /></svg>)
    expect(container.querySelector('[data-element-id="card-0"] path')?.getAttribute('fill')).toBe('#123456')

    useTemplateStore.setState({ templateElementColors: {} })
  })

  it('9. Synchronisation Store Zustand : conserve les positions personnalisées', () => {
    useTemplateStore.setState({
      templateElementPositions: {
        'card-0': { x: 350, y: 80, width: 230, height: 140 },
      },
    })
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }],
      milestones: [{ title: 'Jalon Déplacé', date: '2024' }],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)
    const cardPath = container.querySelector('[data-element-id="card-0"] path')?.getAttribute('d')
    expect(cardPath).toContain('M 350 80')

    useTemplateStore.setState({ templateElementPositions: {} })
  })

  it('10. Qualité & Icônes : support des icônes optionnelles sans générer d erreur', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }, { label: '2025' }],
      milestones: [
        { title: 'Jalon avec icône', subtitle: 'Desc', date: '2024', icon: 'rocket' },
        { title: 'Jalon sans icône', subtitle: 'Desc', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap3Template data={data} /></svg>)
    const card0 = container.querySelector('[data-element-id="card-0"]')
    expect(card0?.querySelector('svg, path[stroke]')).not.toBeNull()

    const card1 = container.querySelector('[data-element-id="card-1"]')
    expect(card1?.textContent).toContain('Jalon sans icône')
  })

  it('11. Panneau Propriétés & Édition Bidirectionnelle des Textes : préfixe reconnu et synchronisation', () => {
    useTemplateStore.setState({
      activeTemplate: 'roadmap3',
      templateData: {
        type: 'roadmap',
        milestones: [{ title: 'Titre Original', subtitle: 'Sous-titre Original', date: '2024' }],
      },
      selectedTemplateElementIds: new Set(['card-0']),
    })

    const initialData = useTemplateStore.getState().templateData as RoadmapData
    const { container, rerender } = render(<svg><Roadmap3Template data={initialData} /></svg>)
    expect(container.textContent).toContain('Titre Original')
    expect(container.textContent).toContain('Sous-titre Original')

    useTemplateStore.getState().updateTemplateData({
      type: 'roadmap',
      milestones: [{ title: 'Nouveau Titre', subtitle: 'Nouvelle Desc', date: '2024' }],
    })

    const updatedData = useTemplateStore.getState().templateData as RoadmapData
    rerender(<svg><Roadmap3Template data={updatedData} /></svg>)
    expect(container.textContent).toContain('Nouveau Titre')
    expect(container.textContent).toContain('Nouvelle Desc')
  })
})
