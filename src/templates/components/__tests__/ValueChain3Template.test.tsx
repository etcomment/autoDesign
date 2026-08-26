import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ValueChain3Template } from '../ValueChain3Template'
import type { ValueChain3Data } from '../../types'

describe('ValueChain3Template', () => {
  it('should render top bar, 5 chevrons, bottom bar, and footer text', () => {
    const data: ValueChain3Data = {
      type: 'valueChain3',
      topBar: 'Product Design',
      bottomBar: 'Marketing & Sales',
      footerText: 'MIGSO-PCUBED content and words to be added here as required',
      items: [
        { title: 'Logistics', color: '#1a2249' },
        { title: 'Purchasing', color: '#2b63d9' },
        { title: 'Manufacturing', color: '#ff5338' },
        { title: 'Distribution', color: '#ffb100' },
        { title: 'Service', color: '#48bb95' },
      ],
    }

    const { container } = render(
      <svg>
        <ValueChain3Template data={data} />
      </svg>
    )

    const topBar = container.querySelector('[data-element-id="top-bar"]')
    expect(topBar).not.toBeNull()
    expect(topBar?.textContent).toContain('Product Design')

    const bottomBar = container.querySelector('[data-element-id="bottom-bar"]')
    expect(bottomBar).not.toBeNull()
    expect(bottomBar?.textContent).toContain('Marketing & Sales')

    const chevrons = container.querySelectorAll('[data-element-id^="chevron-"]')
    expect(chevrons).toHaveLength(5)

    const chevronTitles = Array.from(chevrons).map(ch => ch.querySelector('text')?.textContent)
    expect(chevronTitles).toEqual(['Logistics', 'Purchasing', 'Manufacturing', 'Distribution', 'Service'])

    const chevron1Path = container.querySelector('[data-element-id="chevron-0"] path')
    expect(chevron1Path?.getAttribute('fill')).toBe('#1a2249')

    const chevron3Path = container.querySelector('[data-element-id="chevron-2"] path')
    expect(chevron3Path?.getAttribute('fill')).toBe('#ff5338')

    const footer = container.querySelector('[data-element-id="footer-text"]')
    expect(footer).not.toBeNull()
    expect(footer?.textContent).toContain('MIGSO-PCUBED content and words to be added here as required')
  })
})
