import { describe, expect, it } from 'vitest'
import { render, act } from '@testing-library/react'
import { Dashboard5Template } from '../Dashboard5Template'
import { Kpi1Template } from '../Kpi1Template'
import { useTemplateStore } from '../../store'
import type { DashboardData } from '../../types'

describe('Dashboard5Template', () => {
  it('should render all interactive elements with default data', () => {
    const data: DashboardData = {
      type: 'dashboard5',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard5Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="pictogram-grid"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="top-badges"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="area-chart"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="bottom-concentric-arcs"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="bottom-histogram"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="bottom-horizontal-bars"]')).not.toBeNull()

    for (let index = 0; index < 6; index += 1) {
      expect(container.querySelector(`[data-element-id="node-${index}"]`)).not.toBeNull()
    }

    expect(container.textContent).toContain('01')
    expect(container.textContent).toContain('02')
    expect(container.textContent).toContain('03')
    expect(container.textContent).toContain('04')
    expect(container.textContent).toContain('05')
    expect(container.textContent).toContain('06')
    expect(container.textContent).toContain('Your title')
    expect(container.textContent).toContain('27%')
    expect(container.textContent).toContain('35%')
    expect(container.textContent).toContain('50%')
    expect(container.textContent).toContain('30')
    expect(container.textContent).toContain('19')
    expect(container.textContent).toContain('18')
    expect(container.textContent).toContain('28')
  })

  it('should render custom metric values and titles when provided', () => {
    const data: DashboardData = {
      type: 'dashboard5',
      metrics: [
        { label: 'Europe Deployment', value: '01', description: 'Deployment completed' },
        { label: 'Americas Hub', value: '02', description: 'Expanding infrastructure' },
      ],
    }
    const { container } = render(
      <svg>
        <Dashboard5Template data={data} />
      </svg>
    )

    expect(container.textContent).toContain('Europe Deployment')
    expect(container.textContent).toContain('Deployment completed')
    expect(container.textContent).toContain('Americas Hub')
    expect(container.textContent).toContain('Expanding infrastructure')
  })

  it('should support color cascade and store selection', () => {
    act(() => {
      useTemplateStore.setState({
        templateElementColors: {
          'node-0': '#123456',
          'bottom-arc-0': '#abcdef',
        },
        templateStrokeColors: { 'node-1': '#ff0000' },
        templateStrokeWidths: { 'node-1': 3 },
        selectedTemplateElementIds: new Set(['node-1']),
      })
    })

    const data: DashboardData = {
      type: 'dashboard5',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard5Template data={data} />
      </svg>
    )

    const node0Circle = container.querySelector('[data-element-id="node-0"] circle[r="34"]')
    expect(node0Circle?.getAttribute('fill')).toBe('#123456')

    const node1Border = container.querySelector('[data-element-id="node-1"] rect')
    expect(node1Border?.getAttribute('stroke')).toBe('#ff0000')
    expect(node1Border?.getAttribute('stroke-width')).toBe('3')

    act(() => {
      useTemplateStore.setState({
        templateElementColors: {},
        templateStrokeColors: {},
        templateStrokeWidths: {},
        selectedTemplateElementIds: new Set(),
      })
    })
  })

  it('should resist empty and undefined metrics data', () => {
    const dataEmpty: DashboardData = {
      type: 'dashboard5',
      metrics: [],
    }
    const { container: containerEmpty } = render(
      <svg>
        <Dashboard5Template data={dataEmpty} />
      </svg>
    )
    expect(containerEmpty.querySelectorAll('[data-element-id^="node-"]').length).toBe(6)

    const dataUndefined = {
      type: 'dashboard5',
    } as unknown as DashboardData
    const { container: containerUndefined } = render(
      <svg>
        <Dashboard5Template data={dataUndefined} />
      </svg>
    )
    expect(containerUndefined.querySelectorAll('[data-element-id^="node-"]').length).toBe(6)
  })

  it('should not render global white background or hardcoded slide title', () => {
    const data: DashboardData = {
      type: 'dashboard5',
      title: 'Dashboard 5 Global Title',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard5Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[width="960"][height="540"]')).toBeNull()
    expect(container.textContent).not.toContain('Dashboard 5 Global Title')
  })
})

describe('Kpi1Template', () => {
  it('should render all 5 gauges with default fallback data', () => {
    const data: DashboardData = {
      type: 'kpi1',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Kpi1Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="metric-0"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="metric-1"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="metric-2"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="metric-3"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="metric-4"]')).not.toBeNull()

    expect(container.textContent).toContain('Leadership')
    expect(container.textContent).toContain('Talent')
    expect(container.textContent).toContain('Market')
    expect(container.textContent).toContain('Strategy')
    expect(container.textContent).toContain('Culture')
    expect(container.textContent).toContain('MIGSO-PCUBED')
    expect(container.textContent).toContain('content and words')
  })

  it('should render custom metric titles, values and descriptions', () => {
    const data: DashboardData = {
      type: 'kpi1',
      metrics: [
        { label: 'Executive Team', value: '42', description: 'Custom executive score' },
        { label: 'Engineering', value: '88', description: 'Engineering productivity' },
      ],
    }
    const { container } = render(
      <svg>
        <Kpi1Template data={data} />
      </svg>
    )

    expect(container.textContent).toContain('Executive Team')
    expect(container.textContent).toContain('Custom executive score')
    expect(container.textContent).toContain('Engineering')
    expect(container.textContent).toContain('Engineering productivity')
  })

  it('should support color cascade and element selection', () => {
    act(() => {
      useTemplateStore.setState({
        templateElementColors: { 'metric-0': '#e0245e' },
        templateStrokeColors: { 'metric-0': '#1da1f2' },
        templateStrokeWidths: { 'metric-0': 3 },
        selectedTemplateElementIds: new Set(['metric-0']),
      })
    })

    const data: DashboardData = {
      type: 'kpi1',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Kpi1Template data={data} />
      </svg>
    )

    const titleText = container.querySelector('[data-element-id="metric-0"] text')
    expect(titleText?.getAttribute('fill')).toBe('#e0245e')

    const strokeRect = container.querySelector('[data-element-id="metric-0"] rect')
    expect(strokeRect?.getAttribute('stroke')).toBe('#1da1f2')
    expect(strokeRect?.getAttribute('stroke-width')).toBe('3')

    act(() => {
      useTemplateStore.setState({
        templateElementColors: {},
        templateStrokeColors: {},
        templateStrokeWidths: {},
        selectedTemplateElementIds: new Set(),
      })
    })
  })

  it('should resist empty and undefined metrics data', () => {
    const dataEmpty: DashboardData = {
      type: 'kpi1',
      metrics: [],
    }
    const { container: containerEmpty } = render(
      <svg>
        <Kpi1Template data={dataEmpty} />
      </svg>
    )
    expect(containerEmpty.querySelectorAll('[data-element-id^="metric-"]').length).toBe(5)

    const dataUndefined = {
      type: 'kpi1',
    } as unknown as DashboardData
    const { container: containerUndefined } = render(
      <svg>
        <Kpi1Template data={dataUndefined} />
      </svg>
    )
    expect(containerUndefined.querySelectorAll('[data-element-id^="metric-"]').length).toBe(5)
  })

  it('should not render global white background or hardcoded slide title', () => {
    const data: DashboardData = {
      type: 'kpi1',
      title: 'KPI 1 Global Title',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Kpi1Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[width="960"][height="540"]')).toBeNull()
    expect(container.textContent).not.toContain('KPI 1 Global Title')
  })
})
