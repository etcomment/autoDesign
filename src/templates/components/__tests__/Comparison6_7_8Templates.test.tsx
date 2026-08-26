import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { Comparison6Template } from '../Comparison6Template'
import { Comparison7Template } from '../Comparison7Template'
import { Comparison8Template } from '../Comparison8Template'
import type { Comparison6Data, Comparison7Data, Comparison8Data } from '../../types'

describe('Comparison6Template', () => {
  it('should render header with Option 01, Option 02, and VS separator', () => {
    const data: Comparison6Data = {
      type: 'comparison6',
      leftTitle: 'Option 01',
      leftSubtitle: 'Left description text',
      rightTitle: 'Option 02',
      rightSubtitle: 'Right description text',
      aspects: [
        { label: 'Aspect 01', leftPercent: 75, rightPercent: 50 },
        { label: 'Aspect 02', leftPercent: 25, rightPercent: 100 },
      ],
    }
    const { container } = render(<svg><Comparison6Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="header-left"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="header-vs"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="header-right"]')).not.toBeNull()
    expect(container.textContent).toContain('Option 01')
    expect(container.textContent).toContain('VS')
    expect(container.textContent).toContain('Option 02')
    expect(container.textContent).toContain('75%')
    expect(container.textContent).toContain('50%')
    expect(container.textContent).toContain('Aspect 01')
    expect(container.textContent).toContain('Aspect 02')
  })

  it('should not render global white background or hardcoded slide title', () => {
    const data: Comparison6Data = {
      type: 'comparison6',
      title: 'Global Slide Title',
      aspects: [{ label: 'Aspect 01', leftPercent: 50, rightPercent: 50 }],
    }
    const { container } = render(<svg><Comparison6Template data={data} /></svg>)
    expect(container.querySelector('rect[fill="white"][width="800"]')).toBeNull()
    expect(container.textContent).not.toContain('Global Slide Title')
  })
})

describe('Comparison7Template', () => {
  it('should render PROS and CONS central hexagons with connectors and item badges', () => {
    const data: Comparison7Data = {
      type: 'comparison7',
      leftTitle: 'PROS',
      rightTitle: 'CONS',
      pros: [
        { title: 'Fast delivery' },
        { title: 'Cost effective' },
      ],
      cons: [
        { title: 'Limited customization' },
        { title: 'Requires training' },
      ],
    }
    const { container } = render(<svg><Comparison7Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="hexagon-pros"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="hexagon-cons"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-element-id^="pro-badge-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="con-badge-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="pro-card-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="con-card-"]')).toHaveLength(2)
    expect(container.textContent).toContain('PROS')
    expect(container.textContent).toContain('CONS')
    expect(container.textContent).toContain('Fast delivery')
    expect(container.textContent).toContain('Limited customization')
  })

  it('should not render global white background or hardcoded slide title', () => {
    const data: Comparison7Data = {
      type: 'comparison7',
      title: 'Ignored Title',
      pros: ['Advantage 1'],
      cons: ['Drawback 1'],
    }
    const { container } = render(<svg><Comparison7Template data={data} /></svg>)
    expect(container.querySelector('rect[fill="white"][width="800"]')).toBeNull()
    expect(container.textContent).not.toContain('Ignored Title')
  })
})

describe('Comparison8Template', () => {
  it('should render 2-column table with headers and items', () => {
    const data: Comparison8Data = {
      type: 'comparison8',
      leftTitle: 'Plan A',
      rightTitle: 'Plan B',
      leftItems: ['Cloud hosting', 'Auto-scaling'],
      rightItems: ['On-premise', 'Manual scaling'],
    }
    const { container } = render(<svg><Comparison8Template data={data} /></svg>)
    expect(container.querySelector('[data-element-id="header-left"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="header-right"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-element-id^="left-item-"]')).toHaveLength(2)
    expect(container.querySelectorAll('[data-element-id^="right-item-"]')).toHaveLength(2)
    expect(container.textContent).toContain('Plan A')
    expect(container.textContent).toContain('Plan B')
    expect(container.textContent).toContain('Cloud hosting')
    expect(container.textContent).toContain('On-premise')
  })
})
