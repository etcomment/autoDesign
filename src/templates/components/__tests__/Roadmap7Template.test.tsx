import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap7Template } from '../Roadmap7Template'
import { useTemplateStore } from '../../store'
import type { RoadmapData } from '../../types'

describe('Roadmap7Template — Checklist de Conformité', () => {
  it('1. Transparence & Cadrage Global : pas de fond opaque ni de titre global hardcodé', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Jalon 1', subtitle: 'Desc 1', date: '2023' },
        { title: 'Jalon 2', subtitle: 'Desc 2', date: '2024' },
      ],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)

    const bg = Array.from(container.querySelectorAll('rect')).find(
      r => r.getAttribute('width') === '1000' && r.getAttribute('height') === '600'
    )
    expect(bg).toBeUndefined()

    expect(container.textContent).not.toContain('Roadmap 7')
    expect(container.textContent).not.toContain('Roadmap7')
  })

  it('2. Conformité DSL & Données : tolère les listes vides et rend fidèlement les champs du DSL sans magie', () => {
    const emptyData: RoadmapData = { type: 'roadmap', milestones: [] }
    const { container: emptyContainer } = render(<svg><Roadmap7Template data={emptyData} /></svg>)
    expect(emptyContainer.querySelector('[data-element-id="timeline"]')).not.toBeNull()
    expect(emptyContainer.querySelectorAll('[data-element-id^="bubble-"]')).toHaveLength(0)

    const fullData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Cadrage Initial', subtitle: 'Périmètre & objectifs', date: '2023', value: '01' },
        { title: 'Déploiement', subtitle: 'Mise en production', date: '2024', value: '02' },
      ],
    }
    const { container } = render(<svg><Roadmap7Template data={fullData} /></svg>)
    expect(container.textContent).toContain('Cadrage Initial')
    expect(container.textContent).toContain('Périmètre & objectifs')
    expect(container.textContent).toContain('2023')
    expect(container.textContent).toContain('01')
    expect(container.textContent).toContain('Déploiement')
    expect(container.textContent).toContain('02')
  })

  it('3. Géométrie & N-Éléments : espacements dynamiques et absence de NaN', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Étape 1', date: '2023' },
        { title: 'Étape 2', date: '2024' },
        { title: 'Étape 3', date: '2025' },
        { title: 'Étape 4', date: '2026' },
      ],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="bubble-"]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-element-id^="conn-"]')).toHaveLength(4)

    const polygons = Array.from(container.querySelectorAll('polygon'))
    for (const poly of polygons) {
      expect(poly.getAttribute('points')).not.toContain('NaN')
    }
  })

  it('4. Découpage Multi-Lignes : découpe le texte long en tspans avec dy et x', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        {
          title: 'Titre D Étape Très Long Qui Doit Passer Sur Plusieurs Lignes',
          subtitle: 'Description de projet détaillée avec un paragraphe long pour vérifier le découpage multi-lignes.',
          date: '2024',
        },
      ],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)
    const tspans = container.querySelectorAll('[data-element-id="desc-0"] tspan')
    expect(tspans.length).toBeGreaterThanOrEqual(3)

    for (const tsp of tspans) {
      expect(tsp.getAttribute('x')).not.toBeNull()
      expect(tsp.getAttribute('dy')).not.toBeNull()
    }
  })

  it('5. Auto-Resize des Textes : dimensionnement dynamique proportionnel au nombre de lignes et réduction immédiate', () => {
    const standardData: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Court', subtitle: 'Desc', date: '2024' }],
    }
    const { container, rerender } = render(<svg><Roadmap7Template data={standardData} /></svg>)
    expect(container.querySelector('[data-element-id="desc-0"]')).not.toBeNull()

    const longData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        {
          title: 'Titre Long Sur Plusieurs Lignes',
          subtitle: 'Ligne 1\nLigne 2\nLigne 3\nLigne 4\nLigne 5\nLigne 6',
          date: '2024',
        },
      ],
    }
    rerender(<svg><Roadmap7Template data={longData} /></svg>)
    const tspansLong = container.querySelectorAll('[data-element-id="desc-0"] tspan')
    expect(tspansLong.length).toBeGreaterThanOrEqual(7)

    rerender(<svg><Roadmap7Template data={standardData} /></svg>)
    const tspansShrunk = container.querySelectorAll('[data-element-id="desc-0"] tspan')
    expect(tspansShrunk.length).toBeLessThan(4)
  })

  it('6. Interactivité & Canvas : attribue data-element-id, drag/resize et handles', () => {
    useTemplateStore.setState({
      selectedTemplateElementIds: new Set(['bubble-0']),
    })

    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Étape 1', subtitle: 'Desc 1', date: '2024' },
      ],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)

    expect(container.querySelector('[data-element-id="timeline"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="date-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="dot-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="conn-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="bubble-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="desc-0"]')).not.toBeNull()

    const handles = container.querySelectorAll('[data-element-id="bubble-0"] rect[stroke="#2196F3"]')
    expect(handles.length).toBe(4)

    useTemplateStore.setState({ selectedTemplateElementIds: new Set() })
  })

  it('7. Connecteurs & Ancrages Dynamiques : polygone conn-i orienté entre le dot et la bulle', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Jalon 1', date: '2024' }],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)

    const polygon = container.querySelector('[data-element-id="conn-0"] polygon')
    expect(polygon).not.toBeNull()
    const pts = polygon?.getAttribute('points') || ''
    expect(pts.length).toBeGreaterThan(0)
    expect(pts).not.toContain('NaN')
  })

  it('8. Cascade des Couleurs : UI > DSL color > MIGSO_PALETTE + support fill/stroke sur zones de texte', () => {
    const dslData: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Bulle Verte', color: '#10b981', date: '2024' }],
    }
    const { container, rerender } = render(<svg><Roadmap7Template data={dslData} /></svg>)
    expect(container.querySelector('[data-element-id="bubble-0"] circle')?.getAttribute('fill')).toBe('#10b981')

    useTemplateStore.setState({
      templateElementColors: {
        'bubble-0': '#ec4899',
        'desc-0': '#f1f5f9',
      },
      templateStrokeColors: {
        'desc-0': '#2c2b64',
      },
      templateStrokeWidths: {
        'desc-0': 2,
      },
    })
    rerender(<svg><Roadmap7Template data={dslData} /></svg>)
    expect(container.querySelector('[data-element-id="bubble-0"] circle')?.getAttribute('fill')).toBe('#ec4899')

    const descRect = container.querySelector('[data-element-id="desc-0"] rect')
    expect(descRect?.getAttribute('fill')).toBe('#f1f5f9')
    expect(descRect?.getAttribute('stroke')).toBe('#2c2b64')
    expect(descRect?.getAttribute('stroke-width')).toBe('2')

    useTemplateStore.setState({
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
    })
  })

  it('9. Synchronisation Store Zustand : conserve les positions utilisateur', () => {
    useTemplateStore.setState({
      templateElementPositions: {
        'bubble-0': { x: 340, y: 150, width: 92, height: 92 },
      },
    })
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [{ title: 'Bulle Déplacée', date: '2024' }],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)
    const bubbleCircle = container.querySelector('[data-element-id="bubble-0"] circle')
    expect(bubbleCircle?.getAttribute('cx')).toBe('386')
    expect(bubbleCircle?.getAttribute('cy')).toBe('196')

    useTemplateStore.setState({ templateElementPositions: {} })
  })

  it('10. Qualité & Icônes : support des icônes dynamiques sans masquer le titre', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Étape avec icône', subtitle: 'Description détaillée', date: '2024', icon: 'rocket', value: 'A' },
        { title: 'Étape sans icône', subtitle: 'Description détaillée', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap7Template data={data} /></svg>)
    const bubble0 = container.querySelector('[data-element-id="bubble-0"]')
    expect(bubble0?.querySelector('svg, path[stroke]')).not.toBeNull()
    expect(container.textContent).toContain('Étape avec icône')

    const bubble1 = container.querySelector('[data-element-id="bubble-1"]')
    expect(bubble1?.textContent).toContain('2')
    expect(container.textContent).toContain('Étape sans icône')
  })

  it('11. Panneau Propriétés & Édition Bidirectionnelle des Textes : préfixe reconnu et synchronisation', () => {
    useTemplateStore.setState({
      activeTemplate: 'roadmap7',
      templateData: {
        type: 'roadmap',
        milestones: [{ title: 'Titre Original', subtitle: 'Sous-titre Original', date: '2024' }],
      },
      selectedTemplateElementIds: new Set(['desc-0']),
    })

    const initialData = useTemplateStore.getState().templateData as RoadmapData
    const { container, rerender } = render(<svg><Roadmap7Template data={initialData} /></svg>)
    expect(container.textContent).toContain('Titre Original')
    expect(container.textContent).toContain('Sous-titre Original')

    // Simulation de modification depuis le panneau de propriétés
    useTemplateStore.getState().updateTemplateData({
      type: 'roadmap',
      milestones: [{ title: 'Titre Modifié Propriétés', subtitle: 'Sous-titre Modifié Propriétés', date: '2024' }],
    })

    const updatedData = useTemplateStore.getState().templateData as RoadmapData
    rerender(<svg><Roadmap7Template data={updatedData} /></svg>)
    expect(container.textContent).toContain('Titre Modifié Propriétés')
    expect(container.textContent).toContain('Sous-titre Modifié Propriétés')
  })
})
