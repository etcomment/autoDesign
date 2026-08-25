import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap2Template } from '../Roadmap2Template'
import type { RoadmapData } from '../../types'

describe('Roadmap2Template', () => {
  it('should render with anterior origin point, MIGSO red active track, and transparent cards', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      progress: '2024',
      lanes: [
        { label: 'Phase One', color: '#2c2b64' },
        { label: 'Phase Two', color: '#3366cc' },
        { label: 'Phase Three', color: '#ff5338' },
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

    // 6 dots (1 origin + 5 milestones)
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(6)
    expect(container.querySelectorAll('[data-element-id^="year-"]')).toHaveLength(6)
    // 5 text cards and 5 connectors
    expect(container.querySelectorAll('[data-element-id^="text-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="conn-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="phase-"]')).toHaveLength(3)

    // Origin year should be 2021
    const originYear = container.querySelector('[data-element-id="year-0"] text')
    expect(originYear?.textContent).toBe('2021')

    // Active track line should be MIGSO red (#ff5338)
    const activeLine = container.querySelector('[data-element-id="timeline-line"] line:first-of-type')
    expect(activeLine?.getAttribute('stroke')).toBe('#ff5338')

    // Connectors should not have strokeDasharray
    const connLine = container.querySelector('[data-element-id="conn-0"] line')
    expect(connLine?.getAttribute('stroke-dasharray')).toBeNull()

    // Card background should be none / transparent
    const cardRect = container.querySelector('[data-element-id="text-0"] rect')
    expect(cardRect?.getAttribute('fill')).toBe('none')
  })
})
