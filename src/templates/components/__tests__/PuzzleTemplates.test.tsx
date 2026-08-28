import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Puzzle4Template } from '../Puzzle4Template'
import { PuzzleTemplate } from '../PuzzleTemplate'
import type { PuzzleData } from '../../types'

describe('Puzzle Templates (Slide 180)', () => {
  const sampleData: PuzzleData = {
    type: 'puzzle',
    pieces: [
      { number: '1', title: 'Identify', subtitle: 'Step 1 details', color: '#2c2b64' },
      { number: '2', title: 'Innovation', subtitle: 'Step 2 details', color: '#3466ce' },
      { number: '3', title: 'Management', subtitle: 'Step 3 details', color: '#ff4d30' },
      { number: '4', title: 'Improve', subtitle: 'Step 4 details', color: '#ffb703' },
    ],
  }

  describe('Puzzle4Template', () => {
    it('renders 4 puzzle pieces with numbers 1, 2, 3, 4', () => {
      const { container } = render(
        <svg>
          <Puzzle4Template data={sampleData} />
        </svg>
      )

      expect(container.textContent).toContain('1')
      expect(container.textContent).toContain('2')
      expect(container.textContent).toContain('3')
      expect(container.textContent).toContain('4')
    })

    it('renders 4 side text cards with titles and subtitles', () => {
      const { container } = render(
        <svg>
          <Puzzle4Template data={sampleData} />
        </svg>
      )

      expect(container.textContent).toContain('Identify')
      expect(container.textContent).toContain('Innovation')
      expect(container.textContent).toContain('Management')
      expect(container.textContent).toContain('Improve')
      expect(container.textContent).toContain('Step 1 details')
    })

    it('renders 4 dashed connector lines and 4 interlocking piece paths', () => {
      const { container } = render(
        <svg>
          <Puzzle4Template data={sampleData} />
        </svg>
      )

      const lines = container.querySelectorAll('line')
      expect(lines.length).toBe(4)

      const paths = container.querySelectorAll('path')
      expect(paths.length).toBe(4)
    })
  })

  describe('PuzzleTemplate', () => {
    it('renders 4 puzzle pieces conforming to Slide 180 layout', () => {
      const { container } = render(
        <svg>
          <PuzzleTemplate data={sampleData} />
        </svg>
      )

      expect(container.textContent).toContain('1')
      expect(container.textContent).toContain('2')
      expect(container.textContent).toContain('3')
      expect(container.textContent).toContain('4')
      expect(container.textContent).toContain('Identify')
      expect(container.textContent).toContain('Improve')
    })
  })
})
