import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Puzzle4Template } from '../Puzzle4Template'
import { PuzzleTemplate } from '../PuzzleTemplate'
import { Puzzle3Template } from '../Puzzle3Template'
import type { PuzzleData } from '../../types'

describe('Puzzle Templates (puzzle, puzzle3 & puzzle4)', () => {
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

  it('renders PuzzleTemplate with circular geometry and dynamic cards', () => {
    const { container } = render(
      <svg>
        <PuzzleTemplate data={defaultData} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="piece-0"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-1"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-2"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-3"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="card-0"]')).toBeTruthy()
  })

  it('renders PuzzleTemplate with dynamic number of pieces (e.g. 3 pieces, 6 pieces)', () => {
    const threePiecesData: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'One', subtitle: 'Sub 1', color: '#2c2b64' },
        { number: 2, title: 'Two', subtitle: 'Sub 2', color: '#3466ce' },
        { number: 3, title: 'Three', subtitle: 'Sub 3', color: '#ff4d30' },
      ],
    }

    const { container } = render(
      <svg>
        <PuzzleTemplate data={threePiecesData} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="piece-0"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-1"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-2"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-3"]')).toBeNull()
    expect(container.textContent).toContain('One')
    expect(container.textContent).toContain('Two')
    expect(container.textContent).toContain('Three')
  })

  it('renders Puzzle3Template with annular donut geometry and side cards', () => {
    const { container } = render(
      <svg>
        <Puzzle3Template data={defaultData} />
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
    const card3 = container.querySelector('[data-element-id="card-3"]')
    expect(card0).toBeTruthy()
    expect(card3).toBeTruthy()

    expect(container.textContent).toContain('Identify')
    expect(container.textContent).toContain('Innovation')
    expect(container.textContent).toContain('Management')
    expect(container.textContent).toContain('Improve')

    const pathD = piece0?.querySelector('path')?.getAttribute('d') ?? ''
    expect(pathD).toContain('A 175.00 175.00')
    expect(pathD).toContain('A 75.00 75.00')
  })

  it('renders Puzzle3Template with dynamic number of pieces (e.g. 5 pieces)', () => {
    const fivePiecesData: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'One', subtitle: 'Sub 1', color: '#2c2b64' },
        { number: 2, title: 'Two', subtitle: 'Sub 2', color: '#3466ce' },
        { number: 3, title: 'Three', subtitle: 'Sub 3', color: '#ff4d30' },
        { number: 4, title: 'Four', subtitle: 'Sub 4', color: '#ffb703' },
        { number: 5, title: 'Five', subtitle: 'Sub 5', color: '#4cbfa0' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle3Template data={fivePiecesData} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="piece-0"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-4"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-5"]')).toBeNull()
    expect(container.textContent).toContain('One')
    expect(container.textContent).toContain('Five')
  })
})
