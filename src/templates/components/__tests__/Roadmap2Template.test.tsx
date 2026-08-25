import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap2Template } from '../Roadmap2Template'
import type { RoadmapData } from '../../types'

describe('Roadmap2Template', () => {
  it('should render with progress matching year date and transparent card backgrounds', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      progress: '2024',
      lanes: [
        { label: 'Phase One', color: '#23255a' },
        { label: 'Phase Two', color: '#2d62ed' },
        { label: 'Phase Three', color: '#ff4a2b' },
      ],
      milestones: [
        { title: 'Initiate', subtitle: 'Project kickoff', date: '2022', lane: 'Phase One' },
        { title: 'Plan', subtitle: 'Detailed design', date: '2023', lane: 'Phase One' },
        { title: 'Develop', subtitle: 'Core features', date: '2024', lane: 'Phase Two' },
        { title: 'Test', subtitle: 'QA & validation', date: '2025', lane: 'Phase Two' },
        { title: 'Deliver', subtitle: 'Production release', date: '2026', lane: 'Phase Three' },
      ],
    }

    const { container } = render(
      <svg>
        <Roadmap2Template data={data} />
      </svg>
    )

    // Dots and years
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="year-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="text-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="phase-"]')).toHaveLength(3)

    // Connectors should not have strokeDasharray
    const connLine = container.querySelector('[data-element-id="conn-0"] line')
    expect(connLine?.getAttribute('stroke-dasharray')).toBeNull()

    // Card background should be none / transparent
    const cardRect = container.querySelector('[data-element-id="text-0"] rect')
    expect(cardRect?.getAttribute('fill')).toBe('none')

    // Timeline line with progress
    const timeline = container.querySelector('[data-element-id="timeline-line"]')
    expect(timeline).not.toBeNull()
  })
})
