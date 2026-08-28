import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap5Template } from '../Roadmap5Template'
import { useTemplateStore } from '../../store'
import type { RoadmapData } from '../../types'

describe('Roadmap5Template — Checklist de Conformité', () => {
  it('1. Transparence & Cadrage Global : pas de fond opaque ni de titre global hardcodé', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Step 1', subtitle: 'Desc 1', date: '2024' },
        { title: 'Step 2', subtitle: 'Desc 2', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)

    const bg = Array.from(container.querySelectorAll('rect')).find(
      r => r.getAttribute('width') === '1000' && r.getAttribute('height') === '600'
    )
    expect(bg).toBeUndefined()

    expect(container.textContent).not.toContain('Roadmap 5')
    expect(container.textContent).not.toContain('Roadmap5')
  })

  it('2. Conformité DSL & Données : tolère les données vides et rend startLabel, current, progress et les jalons', () => {
    const emptyData: RoadmapData = { type: 'roadmap', milestones: [] }
    const { container: emptyContainer } = render(<svg><Roadmap5Template data={emptyData} /></svg>)
    expect(emptyContainer.querySelector('[data-element-id="start-badge"]')).not.toBeNull()
    expect(emptyContainer.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(0)

    const fullData: RoadmapData = {
      type: 'roadmap',
      startLabel: 'DEPART',
      progress: '2025',
      quarters: [{ label: '2024' }, { label: '2025' }, { label: '2026' }],
      milestones: [
        { title: 'Alpha Phase', subtitle: 'Detailed architecture', date: '2024' },
        { title: 'Beta Phase', subtitle: 'Field testing', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={fullData} /></svg>)
    expect(container.textContent).toContain('DEPART')
    expect(container.textContent).toContain('Alpha Phase')
    expect(container.textContent).toContain('Detailed architecture')
    expect(container.textContent).toContain('2024')
    expect(container.textContent).toContain('2026')
  })

  it('3. Géométrie & N-Éléments : espacements dynamiques des dots et absence de NaN', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'M1', date: '2020' },
        { title: 'M2', date: '2021' },
        { title: 'M3', date: '2022' },
        { title: 'M4', date: '2023' },
        { title: 'M5', date: '2024' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    // 5 milestones + 1 terminal dot
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(6)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(5)

    const lines = Array.from(container.querySelectorAll('line'))
    for (const l of lines) {
      expect(l.getAttribute('x1')).not.toContain('NaN')
      expect(l.getAttribute('y1')).not.toContain('NaN')
      expect(l.getAttribute('x2')).not.toContain('NaN')
      expect(l.getAttribute('y2')).not.toContain('NaN')
    }
  })

  it('4. Découpage Multi-Lignes : découpe le texte long en tspans avec dy et x', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        {
          title: 'Titre Très Long Qui S Étend Sur Plusieurs Lignes',
          subtitle: 'Description de projet détaillée avec du contenu textuel long à afficher proprement sur plusieurs lignes distinctes.',
          date: '2024',
        },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    const tspans = container.querySelectorAll('[data-element-id="card-0"] tspan')
    expect(tspans.length).toBeGreaterThanOrEqual(4)

    for (const tsp of tspans) {
      expect(tsp.getAttribute('x')).not.toBeNull()
      expect(tsp.getAttribute('dy')).not.toBeNull()
    }
  })

  it('5. Auto-Resize des Textes : hauteur nominale pour textes standards, extension pour textes longs et réduction immédiate', () => {
    const standardData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        {
          title: 'Standard',
          subtitle: 'Ligne 1\nLigne 2',
          date: '2024',
        },
      ],
    }
    const { container, rerender } = render(<svg><Roadmap5Template data={standardData} /></svg>)
    expect(container.querySelector('[data-element-id="card-0"]')).not.toBeNull()

    const longData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        {
          title: 'Titre Long Sur Deux Lignes Complètes',
          subtitle: 'Ligne 1\nLigne 2\nLigne 3\nLigne 4\nLigne 5\nLigne 6\nLigne 7\nLigne 8',
          date: '2024',
        },
      ],
    }
    rerender(<svg><Roadmap5Template data={longData} /></svg>)
    const tspansLong = container.querySelectorAll('[data-element-id="card-0"] tspan')
    expect(tspansLong.length).toBeGreaterThanOrEqual(9)

    // Réduction immédiate
    rerender(<svg><Roadmap5Template data={standardData} /></svg>)
    const tspansShrunk = container.querySelectorAll('[data-element-id="card-0"] tspan')
    expect(tspansShrunk.length).toBeLessThan(5)
  })

  it('6. Interactivité & Canvas : attribue data-element-id, drag/resize et handles', () => {
    useTemplateStore.setState({
      selectedTemplateElementIds: new Set(['card-0']),
    })

    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Card 0', subtitle: 'Desc 0', date: '2024' },
        { title: 'Card 1', subtitle: 'Desc 1', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)

    expect(container.querySelector('[data-element-id="start-badge"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="dot-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="year-0"]')).not.toBeNull()

    const handles = container.querySelectorAll('[data-element-id="card-0"] rect[stroke="#2196F3"]')
    expect(handles.length).toBe(4)

    useTemplateStore.setState({ selectedTemplateElementIds: new Set() })
  })

  it('7. Connecteurs & Ancrages Dynamiques : la tige stem-i s ancre au centre du jalon dot-i', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Jalon', subtitle: 'Description', date: '2024' }],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)

    const stem = container.querySelector('line[stroke-width="4"]')
    expect(stem).not.toBeNull()
    expect(stem?.getAttribute('y1')).not.toBeNull()
    expect(stem?.getAttribute('y2')).not.toBeNull()
  })

  it('8. Cascade des Couleurs : UI > DSL color > Default palette', () => {
    const dslData: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Milestone 01', color: '#e11d48', date: '2024' }],
    }
    const { container, rerender } = render(<svg><Roadmap5Template data={dslData} /></svg>)
    expect(container.querySelector('[data-element-id="card-0"] text')?.getAttribute('fill')).toBe('#e11d48')

    useTemplateStore.setState({
      templateElementColors: { 'card-0': '#10b981' },
    })
    rerender(<svg><Roadmap5Template data={dslData} /></svg>)
    expect(container.querySelector('[data-element-id="card-0"] text')?.getAttribute('fill')).toBe('#10b981')

    useTemplateStore.setState({ templateElementColors: {} })
  })

  it('9. Synchronisation Store Zustand : conserve les positions utilisateur', () => {
    useTemplateStore.setState({
      templateElementPositions: {
        'card-0': { x: 400, y: 150, width: 230, height: 120 },
      },
    })
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Déplacé', date: '2024' }],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    const titleG = container.querySelector('[data-element-id="card-0"] g')
    expect(titleG?.getAttribute('transform')).toContain('translate(400, 170)')

    useTemplateStore.setState({ templateElementPositions: {} })
  })

  it('10. Qualité & Icônes : support des icônes dynamiques', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Jalon avec icône', subtitle: 'Desc', date: '2024', icon: 'rocket' },
        { title: 'Jalon sans icône', subtitle: 'Desc', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    const card0 = container.querySelector('[data-element-id="card-0"]')
    expect(card0?.querySelector('svg, path[stroke]')).not.toBeNull()

    const card1 = container.querySelector('[data-element-id="card-1"]')
    expect(card1?.textContent).toContain('Jalon sans icône')
  })

  it('11. Panneau Propriétés & Édition Bidirectionnelle des Textes : préfixe reconnu et synchronisation', () => {
    useTemplateStore.setState({
      activeTemplate: 'roadmap5',
      templateData: {
        type: 'roadmap',
        milestones: [{ title: 'Titre Original', subtitle: 'Sous-titre Original', date: '2024' }],
      },
      selectedTemplateElementIds: new Set(['card-0']),
    })

    const initialData = useTemplateStore.getState().templateData as RoadmapData
    const { container, rerender } = render(<svg><Roadmap5Template data={initialData} /></svg>)
    expect(container.textContent).toContain('Titre Original')
    expect(container.textContent).toContain('Sous-titre Original')

    useTemplateStore.getState().updateTemplateData({
      type: 'roadmap',
      milestones: [{ title: 'Nouveau Titre', subtitle: 'Nouvelle Desc', date: '2024' }],
    })

    const updatedData = useTemplateStore.getState().templateData as RoadmapData
    rerender(<svg><Roadmap5Template data={updatedData} /></svg>)
    expect(container.textContent).toContain('Nouveau Titre')
    expect(container.textContent).toContain('Nouvelle Desc')
  })
})
