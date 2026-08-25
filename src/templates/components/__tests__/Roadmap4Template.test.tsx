import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap4Template } from '../Roadmap4Template'
import type { RoadmapData } from '../../types'

describe('Roadmap4Template', () => {
  it('should render without crashing with default data', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      title: 'Roadmap Test',
      milestones: [
        { title: 'Milestone 1', subtitle: 'Desc 1' },
        { title: 'Milestone 2', subtitle: 'Desc 2' },
      ],
    }
    const { container } = render(<svg><Roadmap4Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="step-body-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="main-title"]')).toBeNull()
  })

  it('should adapt dynamically to N steps and milestones', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      title: 'Dynamic Roadmap',
      steps: [
        { number: 1, title: 'Etape 1' },
        { number: 2, title: 'Etape 2' },
        { number: 3, title: 'Etape 3' },
      ],
      milestones: [
        { title: 'Milestone 1', subtitle: 'Subtitle 1' },
        { title: 'Milestone 2', subtitle: 'Subtitle 2' },
        { title: 'Milestone 3', subtitle: 'Subtitle 3' },
      ],
    }
    const { container } = render(<svg><Roadmap4Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="step-body-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="milestone-"]')).toHaveLength(3)
  })
})
