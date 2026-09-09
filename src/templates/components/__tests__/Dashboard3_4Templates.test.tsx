import { describe, expect, it } from 'vitest'
import { render, act } from '@testing-library/react'
import { Dashboard3Template } from '../Dashboard3Template'
import { Dashboard4Template } from '../Dashboard4Template'
import { useTemplateStore } from '../../store'
import type { DashboardData } from '../../types'

describe('Dashboard3Template', () => {
  it('should render all interactive elements with default data', () => {
    const data: DashboardData = {
      type: 'dashboard3',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard3Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="top-kpi-summary"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="top-area-chart"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-middle-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-middle-pie"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-middle-line"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-bottom-hbar"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-bottom-kpi"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-bottom-bar"]')).not.toBeNull()

    expect(container.textContent).toContain('73%')
    expect(container.textContent).toContain('Your title')
    expect(container.textContent).toContain('Sample Text')
  })

  it('should render custom metric values when provided', () => {
    const data: DashboardData = {
      type: 'dashboard3',
      metrics: [
        { label: 'Conversion', value: '88%' },
        { label: 'Retention', value: '92%' },
        { label: 'Growth', value: '45%' },
      ],
    }
    const { container } = render(
      <svg>
        <Dashboard3Template data={data} />
      </svg>
    )

    expect(container.textContent).toContain('88%')
    expect(container.textContent).toContain('92%')
    expect(container.textContent).toContain('45%')
  })

  it('should support color cascade and store selection', () => {
    act(() => {
      useTemplateStore.setState({
        templateElementColors: { 'top-kpi-summary': '#00ff00' },
        templateStrokeColors: { 'card-middle-bar': '#ff0000' },
        templateStrokeWidths: { 'card-middle-bar': 3 },
        selectedTemplateElementIds: new Set(['card-middle-bar']),
      })
    })

    const data: DashboardData = {
      type: 'dashboard3',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard3Template data={data} />
      </svg>
    )

    const topSummaryText = container.querySelector('[data-element-id="top-kpi-summary"] text')
    expect(topSummaryText?.getAttribute('fill')).toBe('#00ff00')

    const midBarRect = container.querySelector('[data-element-id="card-middle-bar"] rect')
    expect(midBarRect?.getAttribute('stroke')).toBe('#ff0000')
    expect(midBarRect?.getAttribute('stroke-width')).toBe('3')

    act(() => {
      useTemplateStore.setState({
        templateElementColors: {},
        templateStrokeColors: {},
        templateStrokeWidths: {},
        selectedTemplateElementIds: new Set(),
      })
    })
  })

  it('should not render global white background or hardcoded slide title', () => {
    const data: DashboardData = {
      type: 'dashboard3',
      title: 'Global Slide Title',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard3Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[width="960"][height="540"]')).toBeNull()
    expect(container.textContent).not.toContain('Global Slide Title')
  })
})

describe('Dashboard4Template', () => {
  it('should render all interactive elements with default data', () => {
    const data: DashboardData = {
      type: 'dashboard4',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard4Template data={data} />
      </svg>
    )

    expect(container.querySelector('[data-element-id="card-business"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-industry"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-categories"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-activities"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-aesthetics"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-navigation"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-speed"]')).not.toBeNull()
    expect(container.querySelector('[data-element-id="card-searchability"]')).not.toBeNull()

    expect(container.textContent).toContain('Your business')
    expect(container.textContent).toContain('Industry average')
    expect(container.textContent).toContain('6/10')
    expect(container.textContent).toContain('8/10')
    expect(container.textContent).toContain('Latest activities')
    expect(container.textContent).toContain('Technology')
    expect(container.textContent).toContain('Accessibility')
    expect(container.textContent).toContain('Security')
    expect(container.textContent).toContain('Aesthetics')
    expect(container.textContent).toContain('Navigation')
    expect(container.textContent).toContain('Speed')
    expect(container.textContent).toContain('Searchability')
  })

  it('should render custom metric values when provided', () => {
    const data: DashboardData = {
      type: 'dashboard4',
      metrics: [
        { label: 'Your business', value: '7/10' },
        { label: 'Industry average', value: '9/10' },
      ],
    }
    const { container } = render(
      <svg>
        <Dashboard4Template data={data} />
      </svg>
    )

    expect(container.textContent).toContain('7/10')
    expect(container.textContent).toContain('9/10')
  })

  it('should support color cascade and store selection', () => {
    act(() => {
      useTemplateStore.setState({
        templateElementColors: { 'card-business': '#00bbff' },
        templateStrokeColors: { 'card-industry': '#ff5500' },
        templateStrokeWidths: { 'card-industry': 4 },
        selectedTemplateElementIds: new Set(['card-industry']),
      })
    })

    const data: DashboardData = {
      type: 'dashboard4',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard4Template data={data} />
      </svg>
    )

    const industryRect = container.querySelector('[data-element-id="card-industry"] rect')
    expect(industryRect?.getAttribute('stroke')).toBe('#ff5500')
    expect(industryRect?.getAttribute('stroke-width')).toBe('4')

    act(() => {
      useTemplateStore.setState({
        templateElementColors: {},
        templateStrokeColors: {},
        templateStrokeWidths: {},
        selectedTemplateElementIds: new Set(),
      })
    })
  })

  it('should not render global white background or hardcoded slide title', () => {
    const data: DashboardData = {
      type: 'dashboard4',
      title: 'Global Slide Title',
      metrics: [],
    }
    const { container } = render(
      <svg>
        <Dashboard4Template data={data} />
      </svg>
    )

    expect(container.querySelector('rect[width="960"][height="540"]')).toBeNull()
    expect(container.textContent).not.toContain('Global Slide Title')
  })
})
