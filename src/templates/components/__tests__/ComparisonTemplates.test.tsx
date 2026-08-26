import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Comparison4Template } from '../Comparison4Template'
import { Comparison5Template } from '../Comparison5Template'
import type { ComparisonData, Comparison5Data } from '../../types'

describe('Comparison4Template', () => {
  it('should render interlaced loops, badges A/B, side discs and percentages', () => {
    const data: ComparisonData = {
      type: 'comparison',
      title: 'Your title',
      items: [
        { label: 'Option A', left: '57%', right: '', icon: 'laptop', subtitle: 'MIGSO-PCUBED content and words to be added here as required' },
        { label: 'Option B', left: '', right: '43%', icon: 'lightbulb' },
      ],
    }

    const { container } = render(
      <svg>
        <Comparison4Template data={data} />
      </svg>
    )

    // Interactive elements
    expect(container.querySelector('[data-element-id="center-card"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="badge-a"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="badge-b"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="disc-a"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="disc-b"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="stat-a"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="stat-b"]')).not.toBeNull()

    expect(container.textContent).toContain('Your title')
    expect(container.textContent).toContain('57%')
    expect(container.textContent).toContain('43%')
    expect(container.textContent).toContain('A')
    expect(container.textContent).toContain('B')
  })
})

describe('Comparison5Template', () => {
  it('should render chevron headers, bicolor circle, vertical axis and item pill cards', () => {
    const data: Comparison5Data = {
      type: 'comparison5',
      leftOption: 'Option 01',
      rightOption: 'Option 02',
      leftItems: [
        { text: 'MIGSO-PCUBED item 1', icon: 'leaf' },
        { text: 'MIGSO-PCUBED item 2', icon: 'trophy' },
      ],
      rightItems: [
        { text: 'MIGSO-PCUBED item 3', icon: 'leaf' },
        { text: 'MIGSO-PCUBED item 4', icon: 'trophy' },
      ],
    }

    const { container } = render(
      <svg>
        <Comparison5Template data={data} />
      </svg>
    )

    // Header & central elements
    expect(container.querySelector('[data-element-id="header-left"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="header-right"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="center-circle"]')).not.toBeNull()

    // Pill cards
    expect(container.querySelectorAll('[data-element-id^="left-item-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="right-item-"]')).toHaveLength(2)

    expect(container.textContent).toContain('Option 01')
    expect(container.textContent).toContain('Option 02')
    expect(container.textContent).toContain('MIGSO-PCUBED item 1')
    expect(container.textContent).toContain('MIGSO-PCUBED item 4')
  })
})
