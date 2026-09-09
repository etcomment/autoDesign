import { describe, expect, it, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Kpi2Template } from '../Kpi2Template'
import { Kpi3Template } from '../Kpi3Template'
import { useTemplateStore } from '../../store'
import type { DashboardData } from '../../types'

describe('Kpi2Template', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      selectedTemplateElementIds: new Set<string>(),
      templateElementPositions: {},
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
    })
  })

  it('should render all four interactive quadrants with banners and charts', () => {
    const data: DashboardData = {
      type: 'kpi2',
      metrics: [
        { label: 'Product 01', value: '40', category: 'Sales volume by category' },
        { label: 'Product 02', value: '25', category: 'Sales volume by category' },
        { label: 'Product 03', value: '15', category: 'Sales volume by category' },
        { label: 'Product 04', value: '20', category: 'Sales volume by category' },
        { label: 'Last month', value: '50', category: 'Last month comparison' },
        { label: 'This month', value: '75', category: 'Last month comparison' },
      ],
    }

    const { container } = render(
      <svg>
        <Kpi2Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-template="kpi2"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-2"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-3"]')).not.toBeNull()

    expect(container.textContent).toContain('Sales volume by category')
    expect(container.textContent).toContain('Last month comparison')
    expect(container.textContent).toContain('Monthly sales volume')

    expect(container.textContent).toContain('Product 01')
    expect(container.textContent).toContain('Product 02')
    expect(container.textContent).toContain('Product 03')
    expect(container.textContent).toContain('Product 04')

    expect(container.textContent).toContain('Last month')
    expect(container.textContent).toContain('This month')
    expect(container.textContent).toContain('Sales volume 50%')
    expect(container.textContent).toContain('Sales volume 75%')

    expect(container.textContent).toContain('Week 1')
    expect(container.textContent).toContain('Week 2')
    expect(container.textContent).toContain('Week 3')
    expect(container.textContent).toContain('Week 4')

    expect(container.textContent).toContain('0%')
    expect(container.textContent).toContain('100%')
  })

  it('should support color cascade on quadrant elements', () => {
    useTemplateStore.setState({
      templateElementColors: {
        'quadrant-0': '#123456',
        'quadrant-1': '#654321',
      },
    })

    const data: DashboardData = {
      type: 'kpi2',
      metrics: [],
    }

    const { container } = render(
      <svg>
        <Kpi2Template data={data} />
      </svg>
    )

    const firstBanner = container.querySelector('[data-element-id="quadrant-0"] rect[height="30"]')
    expect(firstBanner?.getAttribute('fill')).toBe('#123456')

    const secondBanner = container.querySelector('[data-element-id="quadrant-1"] rect[height="30"]')
    expect(secondBanner?.getAttribute('fill')).toBe('#654321')
  })

  it('should render reliably with empty or incomplete data', () => {
    const emptyData: DashboardData = {
      type: 'kpi2',
      metrics: [],
    }

    const { container } = render(
      <svg>
        <Kpi2Template data={emptyData} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="quadrant-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-2"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-3"]')).not.toBeNull()
    expect(container.textContent).toContain('Product 01')
    expect(container.textContent).toContain('Sales volume 50%')
  })

  it('should not render a white background rectangle or a global slide title', () => {
    const data: DashboardData = {
      type: 'kpi2',
      title: 'Global Slide Title KPI 2',
      metrics: [],
    }

    const { container } = render(
      <svg>
        <Kpi2Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[fill="white"][width="900"]')).toBeNull()
    expect(container.textContent).not.toContain('Global Slide Title KPI 2')
  })
})

describe('Kpi3Template', () => {
  beforeEach(() => {
    useTemplateStore.setState({
      selectedTemplateElementIds: new Set<string>(),
      templateElementPositions: {},
      templateElementColors: {},
      templateStrokeColors: {},
      templateStrokeWidths: {},
    })
  })

  it('should render all four interactive quadrants with titles and charts', () => {
    const data: DashboardData = {
      type: 'kpi3',
      metrics: [
        { label: 'OPERATIONS', value: '50', description: 'MIGSO-PCUBED content' },
        { label: 'ProductS', value: '16', description: 'MIGSO-PCUBED content' },
        { label: 'REVENUE', value: '4.5', description: 'MIGSO-PCUBED content' },
        { label: 'Manufacturing', value: '4', description: 'MIGSO-PCUBED content' },
      ],
    }

    const { container } = render(
      <svg>
        <Kpi3Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-template="kpi3"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-2"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-3"]')).not.toBeNull()

    expect(container.textContent).toContain('OPERATIONS')
    expect(container.textContent).toContain('ProductS')
    expect(container.textContent).toContain('REVENUE')
    expect(container.textContent).toContain('Manufacturing')

    expect(container.querySelectorAll('path').length).toBeGreaterThan(0)
    expect(container.querySelectorAll('circle').length).toBeGreaterThan(0)
  })

  it('should support color cascade on quadrant title elements', () => {
    useTemplateStore.setState({
      templateElementColors: {
        'quadrant-0': '#ff00ff',
      },
    })

    const data: DashboardData = {
      type: 'kpi3',
      metrics: [
        { label: 'OPERATIONS', value: '50', description: 'Test description' },
      ],
    }

    const { container } = render(
      <svg>
        <Kpi3Template data={data} />
      </svg>
    )

    const operationsTitle = container.querySelector('[data-element-id="quadrant-0"] text')
    expect(operationsTitle?.getAttribute('fill')).toBe('#ff00ff')
  })

  it('should render reliably with empty data', () => {
    const emptyData: DashboardData = {
      type: 'kpi3',
      metrics: [],
    }

    const { container } = render(
      <svg>
        <Kpi3Template data={emptyData} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="quadrant-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-2"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="quadrant-3"]')).not.toBeNull()
    expect(container.textContent).toContain('OPERATIONS')
    expect(container.textContent).toContain('Manufacturing')
  })

  it('should not render a white background rectangle or a global slide title', () => {
    const data: DashboardData = {
      type: 'kpi3',
      title: 'Global Slide Title KPI 3',
      metrics: [],
    }

    const { container } = render(
      <svg>
        <Kpi3Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[fill="white"][width="900"]')).toBeNull()
    expect(container.textContent).not.toContain('Global Slide Title KPI 3')
  })
})
