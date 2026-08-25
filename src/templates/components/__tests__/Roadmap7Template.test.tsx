import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap7Template } from '../Roadmap7Template'
import type { RoadmapData } from '../../types'

describe('Roadmap7Template', () => {
  it('should render pure vertical diagram without background rect or hardcoded title', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: '2023', subtitle: '458', date: '2023' },
        { title: '2024', subtitle: '285', date: '2024' },
        { title: '2025', subtitle: '853', date: '2025' },
      ],
    }

    const { container } = render(
      <svg>
        <Roadmap7Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[fill="white"]')).toBeNull()
    expect(container.querySelector('[data-element-id="timeline"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-element-id^="date-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="dot-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="conn-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="bubble-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="desc-"]')).toHaveLength(3)
  })

  it('should render icons, explicit values, and multiline text wrapping', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        {
          title: 'Project Kickoff with long descriptive title',
          subtitle: 'Detailed description of the initial discovery phase',
          value: '01',
          date: 'Q1 2024',
          icon: 'rocket',
          color: '#3366cc',
        },
        {
          title: 'Design & Architecture',
          subtitle: 'Core systems specifications',
          value: '02',
          date: 'Q2 2024',
          icon: 'target',
          color: '#ff5338',
        },
      ],
    }

    const { container } = render(
      <svg>
        <Roadmap7Template data={data} />
      </svg>
    )

    expect(container.querySelectorAll('tspan').length).toBeGreaterThan(0)
    expect(container.textContent).toContain('01')
    expect(container.textContent).toContain('02')
    expect(container.textContent).toContain('Q1 2024')
    expect(container.textContent).toContain('Q2 2024')
  })

  it('should handle single milestone without crashing', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Solo Phase', subtitle: 'Single element test', date: '2026' },
      ],
    }

    const { container } = render(
      <svg>
        <Roadmap7Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="timeline"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="bubble-0"]')).not.toBeNull()
  })
})
