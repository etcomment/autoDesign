import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap4Template } from '../Roadmap4Template'
import type { RoadmapData } from '../../types'

describe('Roadmap4Template', () => {
  it('should render without crashing with default data', () => {
    const data: RoadmapData = {
      title: 'Roadmap Test',
      milestones: [
        { title: 'Milestone 1', subtitle: 'Desc 1' },
        { title: 'Milestone 2', subtitle: 'Desc 2' },
      ],
    }
    const { container } = render(<svg><Roadmap4Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="main-title"]')).not.toBeNull()
  })

  it('should adapt dynamically to N steps and milestones', () => {
    const data: RoadmapData = {
      title: 'Dynamic Roadmap',
      steps: [
        { title: 'Etape 1' },
        { title: 'Etape 2' },
        { title: 'Etape 3' },
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
