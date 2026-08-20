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
    expect(container.querySelectorAll('[data-element-id^="year-"]')).toHaveLength(2)
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
    expect(container.querySelectorAll('[data-element-id^="year-"]')).toHaveLength(5)
    expect(container.textContent).toContain('GO')
    expect(container.textContent).toContain('Discovery Phase')
    expect(container.textContent).toContain('2028')
  })

  it('should not render any hardcoded global title or white background rectangle', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      title: 'Ignored Global Slide Title',
      milestones: [
        { title: 'M1', subtitle: 'Sub 1', date: '2024' },
      ],
    }
    const { container } = render(<svg><Roadmap5Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="main-title"]')).toBeNull()
    expect(container.querySelector('rect[fill="white"][width="1000"]')).toBeNull()
  })
})
