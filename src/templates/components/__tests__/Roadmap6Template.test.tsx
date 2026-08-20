import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Roadmap6Template } from '../Roadmap6Template'
import type { RoadmapData } from '../../types'

describe('Roadmap6Template', () => {
  it('should render without crashing with default data', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      milestones: [
        { title: 'Setup env', subtitle: 'Infrastructure', date: '2024' },
        { title: 'Login page', subtitle: 'Auth module', date: '2024' },
      ],
    }
    const { container } = render(<svg><Roadmap6Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="chevron-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="group-label-"]')).toHaveLength(1)
  })

  it('should render quarters, chevrons, icons, dates, and dynamic connectors for N milestones', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      quarters: [{ label: '2024' }, { label: '2025' }, { label: '2026' }],
      milestones: [
        { title: 'Setup env', subtitle: 'Infrastructure', date: '2024', icon: 'server' },
        { title: 'Login page', subtitle: 'Auth module', date: '2024', icon: 'key' },
        { title: 'Dashboard', subtitle: 'Main UI', date: '2025', icon: 'chart' },
        { title: 'API layer', subtitle: 'Backend REST', date: '2025', icon: 'code' },
        { title: 'Tests', subtitle: 'QA coverage', date: '2026', icon: 'check' },
        { title: 'Launch', subtitle: 'Go live', date: '2026', icon: 'rocket' },
      ],
    }
    const { container } = render(<svg><Roadmap6Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="group-label-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="chevron-"]')).toHaveLength(6)
    expect(container.querySelectorAll('[data-element-id^="card-"]')).toHaveLength(6)
    expect(container.textContent).toContain('2024')
    expect(container.textContent).toContain('2025')
    expect(container.textContent).toContain('2026')
    expect(container.textContent).toContain('Setup env')
    expect(container.textContent).toContain('Infrastructure')
    expect(container.textContent).toContain('Launch')
  })

  it('should not render any global title or white background rectangle', () => {
    const data: RoadmapData = {
      type: 'roadmap',
      title: 'Ignored Global Slide Title',
      milestones: [
        { title: 'Step 1', subtitle: 'Sub 1', date: '2024' },
      ],
    }
    const { container } = render(<svg><Roadmap6Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="main-title"]')).toBeNull()
    expect(container.querySelector('rect[width="1000"][height="600"]')).toBeNull()
    expect(container.querySelector('rect[fill="white"][width="1000"]')).toBeNull()
  })
})
