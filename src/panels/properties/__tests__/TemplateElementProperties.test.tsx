import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { TemplateElementProperties } from '../TemplateElementProperties'
import { Roadmap7Template } from '../../../templates/components/Roadmap7Template'
import { useTemplateStore } from '../../../templates/store'
import type { RoadmapData } from '../../../templates/types'

describe('TemplateElementProperties — Édition Bidirectionnelle des Textes', () => {
  it('met à jour le titre et le sous-titre dans le store et dans le SVG lors de la saisie dans le panneau', () => {
    const initialData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Titre Initial', subtitle: 'Description Initiale', date: '2024', value: '01' },
        { title: 'Étape 2', subtitle: 'Desc 2', date: '2025', value: '02' },
      ],
    }

    useTemplateStore.setState({
      activeTemplate: 'roadmap7',
      templateData: initialData,
      selectedTemplateElementIds: new Set(['desc-0']),
    })

    const Wrapper = () => {
      const currentData = useTemplateStore(s => s.templateData as RoadmapData)
      return (
        <div>
          <div data-testid="properties-panel">
            <TemplateElementProperties />
          </div>
          <svg>
            <Roadmap7Template data={currentData} />
          </svg>
        </div>
      )
    }

    const { container, getByPlaceholderText } = render(<Wrapper />)

    // Vérifier l'affichage initial
    expect(container.textContent).toContain('Titre Initial')
    expect(container.textContent).toContain('Description Initiale')

    // Trouver les champs dans le panneau
    const titleInput = getByPlaceholderText('Titre...') as HTMLTextAreaElement
    const subtitleInput = getByPlaceholderText('Description...') as HTMLTextAreaElement

    expect(titleInput.value).toBe('Titre Initial')
    expect(subtitleInput.value).toBe('Description Initiale')

    // Modifier le titre
    fireEvent.change(titleInput, { target: { value: 'Nouveau Titre Modifié' } })

    // Modifier la description
    fireEvent.change(subtitleInput, { target: { value: 'Nouvelle Description Longue Modifiée' } })

    // Vérifier que le store a été mis à jour
    const updatedData = useTemplateStore.getState().templateData as RoadmapData
    expect(updatedData.milestones?.[0]?.title).toBe('Nouveau Titre Modifié')
    expect(updatedData.milestones?.[0]?.subtitle).toBe('Nouvelle Description Longue Modifiée')

    // Vérifier que le rendu SVG contient les nouveaux textes
    expect(container.textContent).toContain('Nouveau Titre Modifié')
    expect(container.textContent).toContain('Nouvelle Description Longue Modifiée')
  })

  it('permet de modifier la date d un jalon lorsqu on sélectionne l élément date-i', () => {
    const initialData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Jalon 1', subtitle: 'Desc', date: '2024' },
      ],
    }

    useTemplateStore.setState({
      activeTemplate: 'roadmap7',
      templateData: initialData,
      selectedTemplateElementIds: new Set(['date-0']),
    })

    const Wrapper = () => {
      const currentData = useTemplateStore(s => s.templateData as RoadmapData)
      return (
        <div>
          <TemplateElementProperties />
          <svg>
            <Roadmap7Template data={currentData} />
          </svg>
        </div>
      )
    }

    const { container, getByPlaceholderText } = render(<Wrapper />)

    const dateInput = getByPlaceholderText('Titre...') as HTMLTextAreaElement
    expect(dateInput.value).toBe('2024')

    fireEvent.change(dateInput, { target: { value: 'Q3 2025' } })

    const updatedData = useTemplateStore.getState().templateData as RoadmapData
    expect(updatedData.milestones?.[0]?.date).toBe('Q3 2025')
    expect(container.textContent).toContain('Q3 2025')
  })

  it('propose l option Transparent dans la palette et met à jour le fill/stroke', () => {
    useTemplateStore.setState({
      activeTemplate: 'roadmap7',
      templateData: {
        type: 'roadmap',
        milestones: [{ title: 'Jalon 1', subtitle: 'Desc', date: '2024' }],
      },
      selectedTemplateElementIds: new Set(['desc-0']),
      templateElementColors: {},
    })

    const { getAllByTitle } = render(<TemplateElementProperties />)

    const transparentButtons = getAllByTitle('Transparent')
    expect(transparentButtons.length).toBeGreaterThanOrEqual(2)

    fireEvent.click(transparentButtons[0]!)
    expect(useTemplateStore.getState().templateElementColors['desc-0']).toBe('transparent')

    fireEvent.click(transparentButtons[1]!)
    expect(useTemplateStore.getState().templateStrokeColors['desc-0']).toBe('transparent')
  })
})
