import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { BudgetTemplate } from '../BudgetTemplate'
import { Budget2Template } from '../Budget2Template'
import { Budget3Template } from '../Budget3Template'
import { Budget4Template } from '../Budget4Template'
import { Budget5Template } from '../Budget5Template'
import type { BudgetData } from '../../types'

describe('Budget Templates Redesign (Slides 21-25)', () => {
  describe('BudgetTemplate (Slide 21 - Budget 1 Columns)', () => {
    const data: BudgetData = {
      type: 'budget',
      title: 'Budget Overview',
      totalLabel: 'Total',
      totalAmount: '£100,000',
      items: [
        { label: 'Budget', amount: '£50,000', color: '#1a2249', bullets: ['Staff allocation', 'Equipment costs'] },
        { label: 'Spending', amount: '£30,000', color: '#2b63d9', bullets: ['Actual expenses Q1', 'Vendor invoices'] },
        { label: 'Saving', amount: '£20,000', color: '#ff5338', bullets: ['Cost reduction', 'Optimized license'] },
      ],
    }

    it('renders 3 columns with pill header badges, square bullets, and bottom amounts', () => {
      const { container } = render(
        <svg>
          <BudgetTemplate data={data} />
        </svg>
      )

      expect(container.querySelector('[data-element-id="item-0"]')).toBeInTheDocument()
      expect(container.querySelector('[data-element-id="item-1"]')).toBeInTheDocument()
      expect(container.querySelector('[data-element-id="item-2"]')).toBeInTheDocument()

      expect(container.textContent).toContain('Budget')
      expect(container.textContent).toContain('Spending')
      expect(container.textContent).toContain('Saving')

      expect(container.textContent).toContain('£50,000')
      expect(container.textContent).toContain('£30,000')
      expect(container.textContent).toContain('£20,000')

      expect(container.textContent).toContain('Staff allocation')
      expect(container.textContent).toContain('Cost reduction')

      const whiteBackground = container.querySelector('rect[fill="white"], rect[fill="#ffffff"]')
      expect(whiteBackground).toBeNull()
    })
  })

  describe('Budget2Template (Slide 22 - Budget 2 Horizontal Bars)', () => {
    const data: BudgetData = {
      type: 'budget2',
      totalLabel: 'Total',
      totalAmount: '100%',
      items: [
        { label: '2015', percentage: 50, percent: '50%', color: '#1a2249' },
        { label: '2016', percentage: 60, percent: '60%', color: '#2b63d9' },
        { label: '2017', percentage: 67, percent: '67%', color: '#ff5338' },
        { label: '2018', percentage: 72, percent: '72%', color: '#ffb100' },
        { label: '2019', percentage: 80, percent: '80%', color: '#4ebe96' },
      ],
    }

    it('renders horizontal bars with year labels on left, progress track, and percentage on right', () => {
      const { container } = render(
        <svg>
          <Budget2Template data={data} />
        </svg>
      )

      expect(container.textContent).toContain('2015')
      expect(container.textContent).toContain('2019')
      expect(container.textContent).toContain('50%')
      expect(container.textContent).toContain('80%')

      const items = container.querySelectorAll('[data-element-id^="item-"]')
      expect(items.length).toBe(5)
    })
  })

  describe('Budget3Template (Slide 23 - Budget 3 Triangular Cones)', () => {
    const data: BudgetData = {
      type: 'budget3',
      totalLabel: 'Total',
      totalAmount: '£76,100',
      items: [
        { label: 'JANUARY', amount: '£17,300', percentage: 70, color: '#1a2249' },
        { label: 'FEBRUARY', amount: '£7,600', percentage: 30, color: '#2b63d9' },
        { label: 'MARCH', amount: '£15,200', percentage: 60, color: '#ff5338' },
        { label: 'APRIL', amount: '£4,000', percentage: 16, color: '#ffb100' },
        { label: 'MAY', amount: '£25,000', percentage: 100, color: '#1a2249' },
        { label: 'JUNE', amount: '£2,000', percentage: 8, color: '#2b63d9' },
        { label: 'JULY', amount: '£5,000', percentage: 20, color: '#ff5338' },
      ],
    }

    it('renders triangular cones with rings at apex, amounts above, and months below baseline', () => {
      const { container } = render(
        <svg>
          <Budget3Template data={data} />
        </svg>
      )

      expect(container.textContent).toContain('JANUARY')
      expect(container.textContent).toContain('MAY')
      expect(container.textContent).toContain('£17,300')
      expect(container.textContent).toContain('£25,000')

      const cones = container.querySelectorAll('polygon')
      expect(cones.length).toBe(7)

      const rings = container.querySelectorAll('circle')
      expect(rings.length).toBeGreaterThanOrEqual(7)
    })
  })

  describe('Budget4Template (Slide 24 - Budget 4 Donut Gauges)', () => {
    const data: BudgetData = {
      type: 'budget4',
      totalLabel: 'Average',
      totalAmount: '60%',
      items: [
        { label: 'Your title 01', subtitle: 'Detailed text for item 1', percentage: 72, percent: '72%', color: '#1a2249' },
        { label: 'Your title 02', subtitle: 'Detailed text for item 2', percentage: 68, percent: '68%', color: '#2b63d9' },
        { label: 'Your title 03', subtitle: 'Detailed text for item 3', percentage: 56, percent: '56%', color: '#ff5338' },
        { label: 'Your title 04', subtitle: 'Detailed text for item 4', percentage: 44, percent: '44%', color: '#ffb100' },
      ],
    }

    it('renders 4 circular donut gauges with center percentage, title and description', () => {
      const { container } = render(
        <svg>
          <Budget4Template data={data} />
        </svg>
      )

      expect(container.textContent).toContain('Your title 01')
      expect(container.textContent).toContain('Your title 04')
      expect(container.textContent).toContain('72%')
      expect(container.textContent).toContain('44%')
      expect(container.textContent).toContain('Detailed text')
      expect(container.textContent).toContain('for item 1')

      const gauges = container.querySelectorAll('[data-element-id^="item-"]')
      expect(gauges.length).toBe(4)
    })
  })

  describe('Budget5Template (Slide 25 - Budget 5 Financial Table)', () => {
    const data: BudgetData = {
      type: 'budget5',
      totalLabel: 'Total costs',
      totalAmount: '£50,000.00',
      columns: ['Cost type', 'Planned (£)', 'Actual (£)', 'Variance (£)'],
      items: [
        { label: 'Staff Costs (Internal)', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
        { label: 'Services (External)', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
        { label: 'Material', planned: '£5,000.00', actual: '£3,000.00', variance: '£2,000.00' },
      ],
    }

    it('renders a structured financial table with column accent pills, data rows and total row', () => {
      const { container } = render(
        <svg>
          <Budget5Template data={data} />
        </svg>
      )

      expect(container.textContent).toContain('Cost type')
      expect(container.textContent).toContain('Planned (£)')
      expect(container.textContent).toContain('Actual (£)')
      expect(container.textContent).toContain('Variance (£)')

      expect(container.textContent).toContain('Staff Costs (Internal)')
      expect(container.textContent).toContain('Services (External)')
      expect(container.textContent).toContain('Total costs')
      expect(container.textContent).toContain('£50,000.00')

      const rows = container.querySelectorAll('[data-element-id^="item-"]')
      expect(rows.length).toBe(3)
    })
  })
})
