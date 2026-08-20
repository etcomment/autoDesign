import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap5Template } from '../Roadmap5Template'
import type { RoadmapData } from '../../types'

describe('Roadmap5Template', () => {
  it('should render without crashing with default data', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Milestone 1', subtitle: 'Desc 1', date: '2024' },
        { title: 'Milestone 2', subtitle: 'Desc 2', date: '2025' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="start-badge"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(1)
    expect(container.querySelectorAll('[data-element-id^="year-"]')).toHaveLength(1)
  })

  it('should adapt dynamically to N milestones with dates, icons and values', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      startLabel: 'GO',
      milestones: [
        { title: 'Discovery Phase', subtitle: 'Detailed scoping', date: '2024', icon: 'search', value: '01' },
        { title: 'Prototyping', subtitle: 'Fast wireframing', date: '2025', icon: 'gear', percent: '50%' },
        { title: 'Development', subtitle: 'Core implementation', date: '2026', icon: 'code', value: '03' },
        { title: 'Testing', subtitle: 'QA validation', date: '2027', icon: 'check', value: '04' },
        { title: 'Release', subtitle: 'Global launch', date: '2028', icon: 'rocket', value: '05' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-element-id^="year-"]')).toHaveLength(4)
    expect(container.textContent).toContain('GO')
    expect(container.textContent).toContain('Discovery Phase')
    expect(container.textContent).toContain('2028')
  })

  it('should dynamically update when a milestone is added in DSL', () => {
    const initialData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Discovery', subtitle: 'Understanding user needs', date: '2024' },
        { title: 'Prototyping', subtitle: 'Building rapid prototypes', date: '2025' },
        { title: 'Development', subtitle: 'Engineering core modules', date: '2026' },
      ],
    }
    const { container, rerender } = render(<svg><Roadmap5Template data={initialData} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(3)

    // User adds 4th milestone in DSL:
    const updatedData: RoadmapData = {
      type: 'roadmap',
      milestones: [
        ...initialData.milestones,
        { title: 'Release', subtitle: 'Production deployment and monitoring', date: '2027' },
      ],
    }
    rerender(<svg><Roadmap5Template data={updatedData} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(4)
    expect(container.textContent).toContain('Release')
    expect(container.textContent).toContain('Production deployment')
    expect(container.textContent).toContain('monitoring')
    expect(container.textContent).toContain('2027')
  })
})
