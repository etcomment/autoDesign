import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Puzzle2Template } from '../Puzzle2Template'
import type { PuzzleData } from '../../types'
import { PIECE_PATHS, ICON_PATHS, DOT_CENTERS } from '../../shared/puzzle2Geometry'

const data = {
  type: 'puzzle2',
  pieces: [
    { number: 1, title: 'Identify', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#2c2b64' },
    { number: 2, title: 'Improve', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#3466ce' },
    { number: 3, title: 'Innovation', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#ff5338' },
    { number: 4, title: 'Management', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#ffc000' },
  ],
} as unknown as PuzzleData

describe('Puzzle2Template', () => {
  it('rend 4 pieces diamant avec leurs icônes blanches extraites de la slide', () => {
    const html = renderToString(<Puzzle2Template data={data} />)
    expect(html).toContain(`d="${PIECE_PATHS[0]}"`)
    expect(html).toContain(`d="${PIECE_PATHS[3]}"`)
    expect((html.match(/fill="white"/g) ?? []).length).toBe(4)
    expect((html.match(/<circle/g) ?? []).length).toBe(4)
    expect(html).toContain('>Identify</text>')
    expect(html).toContain('>Management</text>')
    expect(html).toContain('MIGSO-PCUBED')
  })

  it('utilise les positions extraites pour points et cartes', () => {
    const html = renderToString(<Puzzle2Template data={data} />)
    const dot = DOT_CENTERS[0]!
    expect(html).toContain(`cx="${dot.x}"`)
    expect(html).toContain('16.7')
    expect(html).toContain('14.6')
    expect(ICON_PATHS).toHaveLength(4)
  })

  it('honore une icône DSL résolvable au centre de la pièce', () => {
    const withIcon = {
      ...data,
      pieces: [{ ...data.pieces[0], icon: 'gear' }, ...data.pieces.slice(1)],
    } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={withIcon} />)
    expect((html.match(/data-icon/g) ?? []).length).toBe(1)
  })
})
