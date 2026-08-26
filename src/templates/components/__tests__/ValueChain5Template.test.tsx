import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ValueChain5Template } from '../ValueChain5Template'
import type { ValueChain5Data } from '../../types'

describe('ValueChain5Template', () => {
  it('should render without crashing with default data', () => {
    const data: ValueChain5Data = {
      type: 'valueChain5',
      leftBlocks: [
        { title: 'Left 1' },
        { title: 'Left 2' },
        { title: 'Left 3' },
      ],
      centerBars: [
        { title: 'Bar 1' },
        { title: 'Bar 2' },
        { title: 'Bar 3' },
        { title: 'Bar 4' },
        { title: 'Bar 5' },
        { title: 'Bar 6' },
      ],
      rightChevrons: [
        { title: 'Chevron 1', subtitle: 'Sub 1' },
        { title: 'Chevron 2', subtitle: 'Sub 2' },
      ],
    }
    const { container } = render(<svg><ValueChain5Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="left-block-"]')).toHaveLength(3)
    expect(container.querySelectorAll('[data-element-id^="center-bar-"]')).toHaveLength(6)
    expect(container.querySelector('[data-element-id="right-chevron-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="right-chevron-1"]')).not.toBeNull()
    expect(container.textContent).toContain('Left 1')
    expect(container.textContent).toContain('Bar 1')
    expect(container.textContent).toContain('Chevron 1')
    expect(container.textContent).toContain('Chevron 2')
  })
})
