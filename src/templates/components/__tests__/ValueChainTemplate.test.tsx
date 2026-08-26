import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ValueChainTemplate } from '../ValueChainTemplate'
import { ValueChain2Template } from '../ValueChain2Template'
import type { ValueChainData } from '../../types'

describe('ValueChainTemplate', () => {
  it('should render default activities when empty lists are provided', () => {
    const data: ValueChainData = {
      type: 'valueChain',
      primary: [],
      support: [],
    }

    const { container } = render(
      <svg>
        <ValueChainTemplate data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="axis-support"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="axis-primary"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="margin-wedge"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-element-id^="support-"]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-element-id^="primary-"]')).toHaveLength(5)
    expect(container.textContent).toContain('Support activities')
    expect(container.textContent).toContain('Primary activities')
    expect(container.textContent).toContain('Margin')
  })
})

describe('ValueChain2Template', () => {
  it('should render primary at top, support at bottom with double arrow', () => {
    const data: ValueChainData = {
      type: 'valueChain',
      primary: [],
      support: [],
    }

    const { container } = render(
      <svg>
        <ValueChain2Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="axis-support"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="axis-primary"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="margin-wedge"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-element-id^="primary-"]')).toHaveLength(5)
    expect(container.querySelectorAll('[data-element-id^="support-"]')).toHaveLength(4)
    expect(container.textContent).toContain('SUPPORT ACTIVITIES')
    expect(container.textContent).toContain('Primary activities')
    expect(container.textContent).toContain('Values')
  })
})
