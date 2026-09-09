import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Puzzle4Template } from '../Puzzle4Template'
import { PuzzleTemplate } from '../PuzzleTemplate'
import { Puzzle3Template } from '../Puzzle3Template'
import { Puzzle5Template } from '../Puzzle5Template'
import { Puzzle6Template } from '../Puzzle6Template'
import { Puzzle7Template } from '../Puzzle7Template'
import { computePuzzle7Layout } from '../../shared/puzzle7Geometry'
import type { PuzzleData } from '../../types'

describe('Puzzle Templates (puzzle, puzzle3, puzzle4, puzzle5, puzzle6 & puzzle7)', () => {
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

  it('renders Puzzle5Template with interlocking hexagons and alternating cards', () => {
    const puzzle5Data: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Improve', subtitle: 'Content 1', color: '#2c2b64', value: 'A' },
        { number: 2, title: 'Identify', subtitle: 'Content 2', color: '#3466ce', value: 'B' },
        { number: 3, title: 'Management', subtitle: 'Content 3', color: '#ff4d30', value: 'C' },
        { number: 4, title: 'Innovation', subtitle: 'Content 4', color: '#ffb703', value: 'D' },
        { number: 5, title: 'Audience', subtitle: 'Content 5', color: '#4cbfa0', value: 'E' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle5Template data={puzzle5Data} />
      </svg>,
    )

    const piece0 = container.querySelector('[data-element-id="piece-0"]')
    const piece4 = container.querySelector('[data-element-id="piece-4"]')
    expect(piece0).toBeTruthy()
    expect(piece4).toBeTruthy()

    const card0 = container.querySelector('[data-element-id="card-0"]')
    const card4 = container.querySelector('[data-element-id="card-4"]')
    expect(card0).toBeTruthy()
    expect(card4).toBeTruthy()

    expect(container.textContent).toContain('A')
    expect(container.textContent).toContain('B')
    expect(container.textContent).toContain('C')
    expect(container.textContent).toContain('D')
    expect(container.textContent).toContain('E')

    expect(container.textContent).toContain('Improve')
    expect(container.textContent).toContain('Identify')
    expect(container.textContent).toContain('Audience')
  })

  it('renders Puzzle5Template with dynamic number of pieces (e.g. 3 pieces)', () => {
    const threePiecesData: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Step 1', subtitle: 'Sub 1', color: '#2c2b64', value: 'X' },
        { number: 2, title: 'Step 2', subtitle: 'Sub 2', color: '#3466ce', value: 'Y' },
        { number: 3, title: 'Step 3', subtitle: 'Sub 3', color: '#ff4d30', value: 'Z' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle5Template data={threePiecesData} />
      </svg>,
    )

    expect(container.querySelector('[data-element-id="piece-0"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-2"]')).toBeTruthy()
    expect(container.querySelector('[data-element-id="piece-3"]')).toBeNull()
    expect(container.textContent).toContain('X')
    expect(container.textContent).toContain('Y')
    expect(container.textContent).toContain('Z')
  })

  it('renders Puzzle5Template with empty shape when no val is given and supports icon', () => {
    const dataWithIconAndEmpty: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Step 1', subtitle: 'Sub 1', color: '#2c2b64', icon: 'sliders' },
        { number: 2, title: 'Step 2', subtitle: 'Sub 2', color: '#3466ce' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle5Template data={dataWithIconAndEmpty} />
      </svg>,
    )

    const piece0 = container.querySelector('[data-element-id="piece-0"]')
    const piece1 = container.querySelector('[data-element-id="piece-1"]')

    expect(piece0?.querySelector('svg')).toBeTruthy()
    expect(piece1?.querySelector('text')).toBeNull()
  })

  it('renders Puzzle6Template with wireframe central puzzle piece, 4 corner letters and cards', () => {
    const puzzle6Data: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Identify', subtitle: 'Step 1 details', color: '#2c2b64', value: 'A' },
        { number: 2, title: 'Management', subtitle: 'Step 2 details', color: '#3466ce', value: 'B' },
        { number: 3, title: 'Innovation', subtitle: 'Step 3 details', color: '#ff4d30', value: 'C' },
        { number: 4, title: 'Improve', subtitle: 'Step 4 details', color: '#ffb703', value: 'D' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle6Template data={puzzle6Data} />
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

    expect(container.textContent).toContain('A')
    expect(container.textContent).toContain('B')
    expect(container.textContent).toContain('C')
    expect(container.textContent).toContain('D')

    expect(container.textContent).toContain('Identify')
    expect(container.textContent).toContain('Management')
    expect(container.textContent).toContain('Innovation')
    expect(container.textContent).toContain('Improve')

    const centerCard = container.querySelector('[data-element-id="center-card"]')
    expect(centerCard).toBeTruthy()
  })

  it('renders Puzzle7Template with hollow rounded square frame of 4 interlocking pieces, numbers, icons and cards', () => {
    const puzzle7Data: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Improve', subtitle: 'Step 1 details', color: '#2c2b64', value: '1', icon: 'inbox' },
        { number: 2, title: 'Innovation', subtitle: 'Step 2 details', color: '#3466ce', value: '2', icon: 'database' },
        { number: 3, title: 'Management', subtitle: 'Step 3 details', color: '#ff4d30', value: '3', icon: 'network' },
        { number: 4, title: 'Identify', subtitle: 'Step 4 details', color: '#ffb703', value: '4', icon: 'send' },
      ],
    }

    const { container } = render(
      <svg>
        <Puzzle7Template data={puzzle7Data} />
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

    expect(container.textContent).toContain('1')
    expect(container.textContent).toContain('2')
    expect(container.textContent).toContain('3')
    expect(container.textContent).toContain('4')

    expect(container.textContent).toContain('Improve')
    expect(container.textContent).toContain('Innovation')
    expect(container.textContent).toContain('Management')
    expect(container.textContent).toContain('Identify')

    const pathD = piece0?.querySelector('path')?.getAttribute('d') ?? ''
    expect(pathD).toContain('A 25 25')
    expect(pathD).toContain('A 50 50')
  })

  it('renders Puzzle, Puzzle3, Puzzle4, Puzzle6, and Puzzle7 with empty shapes when no val nor icon is given', () => {
    const emptyPiecesData: PuzzleData = {
      type: 'puzzle',
      pieces: [
        { number: 1, title: 'Piece 1', subtitle: 'Sub 1', color: '#2c2b64' },
        { number: 2, title: 'Piece 2', subtitle: 'Sub 2', color: '#3466ce', value: 'VAL_TEST' },
      ],
    }

    // PuzzleTemplate
    const p1 = render(<svg><PuzzleTemplate data={emptyPiecesData} /></svg>)
    expect(p1.container.querySelector('[data-element-id="piece-0"] text')).toBeNull()
    expect(p1.container.querySelector('[data-element-id="piece-1"] text')?.textContent).toBe('VAL_TEST')

    // Puzzle3Template
    const p3 = render(<svg><Puzzle3Template data={emptyPiecesData} /></svg>)
    expect(p3.container.querySelector('[data-element-id="piece-0"] text')).toBeNull()
    expect(p3.container.querySelector('[data-element-id="piece-1"] text')?.textContent).toBe('VAL_TEST')

    // Puzzle4Template
    const p4 = render(<svg><Puzzle4Template data={emptyPiecesData} /></svg>)
    expect(p4.container.querySelector('[data-element-id="piece-0"] text')).toBeNull()
    expect(p4.container.querySelector('[data-element-id="piece-1"] text')?.textContent).toBe('VAL_TEST')

    // Puzzle6Template
    const p6 = render(<svg><Puzzle6Template data={emptyPiecesData} /></svg>)
    // in puzzle6, letter is rendered outside the piece path group at cDef.letterX/letterY
    expect(p6.container.textContent).toContain('VAL_TEST')

    // Puzzle7Template
    const p7 = render(<svg><Puzzle7Template data={emptyPiecesData} /></svg>)
    expect(p7.container.querySelector('[data-element-id="piece-0"] text')).toBeNull()
    expect(p7.container.querySelector('[data-element-id="piece-1"] text')?.textContent).toBe('VAL_TEST')
  })

  it('renders Puzzle7Template with dynamic piece counts (2, 5, 6 and 8 pieces)', () => {
    const makeData = (count: number): PuzzleData => ({
      type: 'puzzle',
      pieces: Array.from({ length: count }, (_, i) => ({
        number: i + 1,
        title: `Item ${i + 1}`,
        subtitle: `Sub ${i + 1}`,
        color: '#3466ce',
        value: `${i + 1}`,
      })),
    })

    for (const count of [2, 5, 6, 8]) {
      const { container } = render(
        <svg>
          <Puzzle7Template data={makeData(count)} />
        </svg>,
      )
      for (let i = 0; i < count; i++) {
        expect(container.querySelector(`[data-element-id="piece-${i}"]`)).toBeTruthy()
        expect(container.querySelector(`[data-element-id="card-${i}"]`)).toBeTruthy()
      }
      expect(container.querySelector(`[data-element-id="piece-${count}"]`)).toBeNull()
    }
  })

  it('keeps the global square frame dimensions constant for any piece count in Puzzle7Template', () => {
    const counts = [2, 3, 4, 5, 6, 7, 8]
    for (const count of counts) {
      const layout = computePuzzle7Layout(count)
      const minX = Math.min(...layout.map(p => p.lineStart.x))
      const maxX = Math.max(...layout.map(p => p.lineStart.x))
      expect(minX).toBe(335)
      expect(maxX).toBe(665)
    }
  })
})
