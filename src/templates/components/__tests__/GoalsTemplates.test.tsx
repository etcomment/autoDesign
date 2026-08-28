import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { GoalsTemplate } from '../GoalsTemplate'
import { Goals2Template } from '../Goals2Template'
import { Goals3Template } from '../Goals3Template'
import { Goals4Template } from '../Goals4Template'
import { useTemplateStore } from '../../store'
import type { GoalsData } from '../../types'
import { TemplateElementProperties } from '../../../panels/properties/TemplateElementProperties'

describe('Goals Templates Suite (Slides 119-122)', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
      templateElementPositions: {},
      templateElementRotations: {},
      selectedTemplateElementIds: new Set(),
      templateData: null,
    })
  })

  describe('GoalsTemplate (Slide 119 - Goal 1)', () => {
    const defaultData: GoalsData = {
      type: 'goals',
      centerGoal: 'Vision 2026',
      metrics: [
        { label: 'Titre 1', value: 'Description 1', color: '#2c2b64' },
        { label: 'Titre 2', value: 'Description 2', color: '#2563eb' },
        { label: 'Titre 3', value: 'Description 3', color: '#ea580c' },
        { label: 'Titre 4', value: 'Description 4', color: '#eab308' },
      ],
    }

    it('1. Rendu sans crash et éléments cibles et nœuds présents', () => {
      const { container } = render(<svg><GoalsTemplate data={defaultData} /></svg>)
      expect(container.querySelector('[data-element-id="target"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="arrow-shaft"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="node-0"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="text-0"]')).not.toBeNull()
      expect(container.textContent).toContain('Titre 1')
      expect(container.textContent).toContain('Description 1')
    })

    it('2. Cascade des couleurs et styles personnalisés', () => {
      useTemplateStore.setState({
        templateElementColors: {
          'node-0': '#10b981',
          'text-0': '#f8fafc',
        },
        templateStrokeColors: {
          'text-0': '#2c2b64',
        },
      })
      const { container } = render(<svg><GoalsTemplate data={defaultData} /></svg>)
      const circle = container.querySelector('[data-element-id="node-0"] circle')
      expect(circle?.getAttribute('fill')).toBe('#10b981')

      const textRect = container.querySelector('[data-element-id="text-0"] rect')
      expect(textRect?.getAttribute('fill')).toBe('#f8fafc')
      expect(textRect?.getAttribute('stroke')).toBe('#2c2b64')
    })

    it('3. Édition bidirectionnelle depuis le panneau de propriétés', () => {
      useTemplateStore.setState({
        activeTemplate: 'goals',
        templateData: defaultData,
        selectedTemplateElementIds: new Set(['text-0']),
      })

      const { container } = render(<TemplateElementProperties />)
      const textarea = container.querySelector('textarea')
      expect(textarea).not.toBeNull()
      expect(textarea?.value).toBe('Titre 1')

      fireEvent.change(textarea!, { target: { value: 'Nouveau Titre' } })
      const updated = useTemplateStore.getState().templateData as GoalsData
      expect(updated.metrics[0]!.label).toBe('Nouveau Titre')
    })
  })

  describe('Goals2Template (Slide 120 - Goal 2)', () => {
    const defaultData: GoalsData = {
      type: 'goals',
      centerGoal: 'Target 2026',
      metrics: [
        { label: 'Objectif 1', value: 'Description 1', color: '#2c2b64' },
        { label: 'Objectif 2', value: 'Description 2', color: '#2563eb' },
        { label: 'Objectif 3', value: 'Description 3', color: '#ea580c' },
        { label: 'Objectif 4', value: 'Description 4', color: '#eab308' },
        { label: 'Objectif 5', value: 'Description 5', color: '#10b981' },
      ],
    }

    it('1. Rendu avec 5 flèches rayonnantes et cible centrale', () => {
      const { container } = render(<svg><Goals2Template data={defaultData} /></svg>)
      expect(container.querySelector('[data-element-id="target"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="arrow-0"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="arrow-4"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="text-4"]')).not.toBeNull()
      expect(container.textContent).toContain('Objectif 1')
      expect(container.textContent).toContain('Objectif 5')
    })

    it('2. Mise à jour des textes et sélection', () => {
      useTemplateStore.setState({
        activeTemplate: 'goals2',
        templateData: defaultData,
        selectedTemplateElementIds: new Set(['text-1']),
      })

      const { container } = render(<TemplateElementProperties />)
      const textareas = container.querySelectorAll('textarea')
      expect(textareas.length).toBeGreaterThanOrEqual(1)

      fireEvent.change(textareas[0]!, { target: { value: 'Objectif Modifié' } })
      const updated = useTemplateStore.getState().templateData as GoalsData
      expect(updated.metrics[1]!.label).toBe('Objectif Modifié')
    })
  })

  describe('Goals3Template (Slide 121 - Goal 3)', () => {
    const defaultData: GoalsData = {
      type: 'goals',
      centerGoal: 'KPIs 2026',
      metrics: [
        { label: 'KPI 1', value: 'Desc 1', color: '#2c2b64' },
        { label: 'KPI 2', value: 'Desc 2', color: '#2563eb' },
        { label: 'KPI 3', value: 'Desc 3', color: '#ea580c' },
        { label: 'KPI 4', value: 'Desc 4', color: '#eab308' },
      ],
    }

    it('1. Rendu conforme cible gauche et flèches d impact', () => {
      const { container } = render(<svg><Goals3Template data={defaultData} /></svg>)
      expect(container.querySelector('[data-element-id="target"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="arrow-0"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="text-0"]')).not.toBeNull()
      expect(container.textContent).toContain('KPI 1')
    })
  })

  describe('Goals4Template (Slide 122 - Goal 4)', () => {
    const defaultData: GoalsData = {
      type: 'goals',
      centerGoal: 'Progress',
      metrics: [
        { label: 'Quad 1', value: 'Desc 1', color: '#ea580c' },
        { label: 'Quad 2', value: 'Desc 2', color: '#2c2b64' },
        { label: 'Quad 3', value: 'Desc 3', color: '#eab308' },
        { label: 'Quad 4', value: 'Desc 4', color: '#2563eb' },
      ],
    }

    it('1. Rendu couronne segmentée 4 quadrants et fléchettes 3D', () => {
      const { container } = render(<svg><Goals4Template data={defaultData} /></svg>)
      expect(container.querySelector('[data-element-id="target"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="badge-0"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="badge-3"]')).not.toBeNull()
      expect(container.querySelector('[data-element-id="text-0"]')).not.toBeNull()
      expect(container.textContent).toContain('Quad 1')
      expect(container.textContent).toContain('Quad 4')
    })

    it('2. Édition bidirectionnelle sur le badge/texte de quadrant', () => {
      useTemplateStore.setState({
        activeTemplate: 'goals4',
        templateData: defaultData,
        selectedTemplateElementIds: new Set(['text-2']),
      })

      const { container } = render(<TemplateElementProperties />)
      const textareas = container.querySelectorAll('textarea')
      expect(textareas.length).toBeGreaterThanOrEqual(1)

      fireEvent.change(textareas[0]!, { target: { value: 'Nouveau Quad 3' } })
      const updated = useTemplateStore.getState().templateData as GoalsData
      expect(updated.metrics[2]!.label).toBe('Nouveau Quad 3')
    })
  })
})
