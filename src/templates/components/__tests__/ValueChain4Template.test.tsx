import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ValueChain4Template } from '../ValueChain4Template'
import type { ValueChain4Data } from '../../types'

describe('ValueChain4Template', () => {
  it('should render without crashing with default data', () => {
    const data: ValueChain4Data = {
      type: 'valueChain4',
      primary: [
        { title: 'Strategy to portfolio', subtitle: 'Plan' },
        { title: 'Requirement to deploy', subtitle: 'Build' },
        { title: 'Request to fulfill', subtitle: 'Deliver' },
        { title: 'Detect to correct', subtitle: 'Run' },
      ],
      support: [
        { title: 'Governance risk & compliance' },
        { title: 'Sourcing & vendor' },
        { title: 'Intelligence & reporting' },
        { title: 'Finance & assets' },
        { title: 'Resource & project' },
      ],
      upperLabel: 'Value streams',
      lowerLabel: 'Supporting activities',
      centerLabel: 'Reference architecture',
      rightLabel: 'Efficiency\n& Agility',
    }
    const { container } = render(<svg><ValueChain4Template data={data} /></svg>)
    expect(container.querySelectorAll('[data-element-id^="upper-block-"]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-element-id^="lower-bar-"]')).toHaveLength(5)
    expect(container.querySelector('[data-element-id="upper-label"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="lower-label"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="center-arrow"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="right-chevron"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="right-label"]')).not.toBeNull()
    expect(container.textContent).toContain('Strategy')
    expect(container.textContent).toContain('portfolio')
    expect(container.textContent).toContain('Plan')
    expect(container.textContent).toContain('Reference architecture')
    expect(container.textContent).toContain('Governance risk & compliance')
    expect(container.textContent).toContain('Efficiency')
  })
})
