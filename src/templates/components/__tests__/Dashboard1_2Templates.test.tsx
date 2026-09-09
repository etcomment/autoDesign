import { describe, expect, it } from 'vitest'
import { act, render } from '@testing-library/react'
import { DashboardTemplate } from '../DashboardTemplate'
import { Dashboard2Template } from '../Dashboard2Template'
import { useTemplateStore } from '../../store'
import type { DashboardData } from '../../types'

describe('DashboardTemplate (Slide 80)', () => {
  it('renders all 7 cards with default fallback data and timeline labels', () => {
    const data: DashboardData = {
      type: 'dashboard',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <DashboardTemplate data={data} />
      </svg>,
    )

    for (let i = 0; i < 7; i += 1) {
      const card = container.querySelector(`[data-element-id="card-${i}"]`)
      expect(card).not.toBeNull()
    }

    expect(container.textContent).toContain('Visitors')
    expect(container.textContent).toContain('Comments')
    expect(container.textContent).toContain('Users')
    expect(container.textContent).toContain('Files')
    expect(container.textContent).toContain('Page views')
    expect(container.textContent).toContain('Clicks')
    expect(container.textContent).toContain('Revenue')
    expect(container.textContent).toContain('100,000')
    expect(container.textContent).toContain('£100,000.00')
    expect(container.textContent).toContain('2014')
    expect(container.textContent).toContain('2019')
  })

  it('renders custom metrics and series when provided', () => {
    const data: DashboardData = {
      type: 'dashboard',
      metrics: [
        { label: 'Site Traffic', value: '50k', color: '#112233', series: [10, 20, 30, 40, 50, 60] },
        { label: 'Feedback', value: '42,000', color: '#445566' },
        { label: 'Members', value: '99,000', color: '#778899' },
        { label: 'Documents', value: '12,000', color: '#aabbcc' },
        { label: 'Impressions', value: '80k', color: '#ddeeff', series: [20, 30, 40, 50, 60, 70] },
        { label: 'Taps', value: '5k', color: '#ff00aa', series: [40, 30, 20, 10] },
        { label: 'Earnings', value: '$999,999.00', color: '#00ffaa' },
      ],
    }
    const { container } = render(
      <svg>
        <DashboardTemplate data={data} />
      </svg>,
    )

    expect(container.textContent).toContain('Site Traffic')
    expect(container.textContent).toContain('Feedback')
    expect(container.textContent).toContain('42,000')
    expect(container.textContent).toContain('Members')
    expect(container.textContent).toContain('99,000')
    expect(container.textContent).toContain('Documents')
    expect(container.textContent).toContain('12,000')
    expect(container.textContent).toContain('Impressions')
    expect(container.textContent).toContain('Taps')
    expect(container.textContent).toContain('Earnings')
    expect(container.textContent).toContain('$999,999.00')
  })

  it('applies color cascade from templateElementColors in store', () => {
    act(() => {
      useTemplateStore.setState({
        templateElementColors: {
          'card-0': '#123456',
          'card-1': '#654321',
        },
      })
    })

    const data: DashboardData = {
      type: 'dashboard',
      metrics: [],
    }
    const { container, unmount } = render(
      <svg>
        <DashboardTemplate data={data} />
      </svg>,
    )

    const card0Rect = container.querySelector('[data-element-id="card-0"] rect')
    const card1Rect = container.querySelector('[data-element-id="card-1"] rect')

    expect(card0Rect?.getAttribute('fill')).toBe('#123456')
    expect(card1Rect?.getAttribute('fill')).toBe('#654321')

    unmount()
    act(() => {
      useTemplateStore.setState({ templateElementColors: {} })
    })
  })

  it('does not render global full-bleed white background or hardcoded slide title', () => {
    const data: DashboardData = {
      type: 'dashboard',
      title: 'Global Slide Title Should Not Render',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <DashboardTemplate data={data} />
      </svg>,
    )

    expect(container.querySelector('rect[fill="white"][width="1000"]')).toBeNull()
    expect(container.textContent).not.toContain('Global Slide Title Should Not Render')
  })
})

describe('Dashboard2Template (Slide 81)', () => {
  it('renders all key widgets, map, kpi cards, charts, and donuts with default data', () => {
    const data: DashboardData = {
      type: 'dashboard2',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard2Template data={data} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="map-area"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="widget-line-chart"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="widget-bar-chart"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="widget-stacked-chart"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="bottom-header"]')).not.toBeNull()

    for (let i = 0; i < 4; i += 1) {
      expect(container.querySelector(`[data-element-id="kpi-card-${i}"]`)).not.toBeNull()
      expect(container.querySelector(`[data-element-id="donut-card-${i}"]`)).not.toBeNull()
    }

    expect(container.textContent).toContain('87%')
    expect(container.textContent).toContain('36%')
    expect(container.textContent).toContain('24%')
    expect(container.textContent).toContain('18%')
    expect(container.textContent).toContain('MIGSO-')
    expect(container.textContent).toContain('PCUBED')
    expect(container.textContent).toContain('Sample Text')
    expect(container.textContent).toContain('Type your text here')
    expect(container.textContent).toContain('100%')
    expect(container.textContent).toContain('0%')
  })

  it('handles custom KPI metrics and colors', () => {
    const data: DashboardData = {
      type: 'dashboard2',
      metrics: [
        { label: 'Alpha', value: '95%', color: '#111111' },
        { label: 'Beta', value: '50%', color: '#222222' },
        { label: 'Gamma', value: '30%', color: '#333333' },
        { label: 'Delta', value: '15%', color: '#444444' },
      ],
    }
    const { container } = render(
      <svg>
        <Dashboard2Template data={data} />
      </svg>,
    )

    expect(container.textContent).toContain('95%')
    expect(container.textContent).toContain('50%')
    expect(container.textContent).toContain('30%')
    expect(container.textContent).toContain('15%')

    const kpi0Rect = container.querySelector('[data-element-id="kpi-card-0"] rect')
    expect(kpi0Rect?.getAttribute('fill')).toBe('#111111')
  })

  it('supports store element color overrides', () => {
    act(() => {
      useTemplateStore.setState({
        templateElementColors: {
          'kpi-card-0': '#0099ff',
          'donut-card-0': '#ff9900',
        },
      })
    })

    const data: DashboardData = {
      type: 'dashboard2',
      metrics: [],
    }
    const { container, unmount } = render(
      <svg>
        <Dashboard2Template data={data} />
      </svg>,
    )

    const kpiRect = container.querySelector('[data-element-id="kpi-card-0"] rect')
    expect(kpiRect?.getAttribute('fill')).toBe('#0099ff')

    unmount()
    act(() => {
      useTemplateStore.setState({ templateElementColors: {} })
    })
  })

  it('resists empty data without crashing', () => {
    const data: DashboardData = {
      type: 'dashboard2',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard2Template data={data} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="map-area"]')).not.toBeNull()
  })
})
