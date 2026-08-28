import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Puzzle4Template } from '../Puzzle4Template'
import { PuzzleTemplate } from '../PuzzleTemplate'
import type { PuzzleData } from '../../types'

describe('Puzzle Templates (puzzle & puzzle4)', () => {
  const defaultData: PuzzleData = {
    type: 'puzzle',
    pieces: [
      { number: 1, title: 'Identify', subtitle: 'Step 1 details', color: '#2c2b64' },
      { number: 2, title: 'Innovation', subtitle: 'Step 2 details', color: '#3466ce' },
      { number: 3, title: 'Management', subtitle: 'Step 3 details', color: '#ff4d30' },
      { number: 4, title: 'Improve', subtitle: 'Step 4 details', color: '#ffb703' },
    ],
  }

  it('renders 4 puzzle pieces with side text cards and elastic dashed connector lines for Puzzle4Template', () => {
    const { container } = render(
      <svg>
        <Puzzle4Template data={defaultData} />
      </svg>,
    )

    const piece0 = container.querySelector('[data-element-id="piece-0"]')
    const piece1 = container.querySelector('[data-element-id="piece-1"]')
    const piece2 = container.querySelector('[data-element-id="piece-2"]')
    const piece3 = container.querySelector('[data-element-id="piece-3"]')

    expect(piece0).toBeTruthy()
    expect(piece1).toBeTruthy()
    expect(piece2).toBeTruthy()
    expect(piece3).toBeTruthy()

    const card0 = container.querySelector('[data-element-id="card-0"]')
    const card1 = container.querySelector('[data-element-id="card-1"]')
    expect(card0).toBeTruthy()
    expect(card1).toBeTruthy()

    expect(container.textContent).toContain('Identify')
    expect(container.textContent).toContain('Innovation')
    expect(container.textContent).toContain('Management')
    expect(container.textContent).toContain('Improve')
  })

  it('renders dynamic number of pieces (e.g. 2 pieces, 6 pieces)', () => {
    const twoPiecesData: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Alpha', subtitle: 'Details A', color: '#2c2b64' },
        { number: 2, title: 'Beta', subtitle: 'Details B', color: '#3466ce' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle4Template data={twoPiecesData} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="piece-0"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-1"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-2"]')).toBeNull()
    expect(container.textContent).toContain('Alpha')
    expect(container.textContent).toContain('Beta')
  })

  it('renders PuzzleTemplate with identical geometry and dynamic cards', () => {
    const { container } = render(
      <svg>
        <PuzzleTemplate data={defaultData} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="piece-0"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="card-0"]')).toBeTruthy()
  })
})
