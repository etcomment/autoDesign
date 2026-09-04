import { describe, it, expect } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Puzzle2Template } from '../Puzzle2Template'
import type { PuzzleData } from '../../types'
import { PIECE_PATHS, DOT_CENTERS, translatePiecePath, PIECE_BOXES } from '../../shared/puzzle2Geometry'

const basePieces = [
  { number: 1, title: 'Identify', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#2c2b64' },
  { number: 2, title: 'Improve', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#3466ce' },
  { number: 3, title: 'Innovation', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#ff5338' },
  { number: 4, title: 'Management', subtitle: 'MIGSO-PCUBED content and words to be added here as required', color: '#ffc000' },
]

describe('Puzzle2Template', () => {
  it('affiche les numéros à la place des icônes quand le DSL n\'en définit pas', () => {
    const data = { type: 'puzzle2', pieces: basePieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    expect((html.match(/data-icon/g) ?? []).length).toBe(0)
    expect((html.match(/fill="white"/g) ?? []).length).toBe(4)
    expect(html).toContain('>1</text>')
    expect(html).toContain('>4</text>')
  })

  it('affiche l\'icône DSL centrée en blanc quand elle est résolvable', () => {
    const pieces = [
      { ...basePieces[0]!, icon: 'clock' },
      { ...basePieces[1]!, icon: 'gear' },
      { ...basePieces[2]!, icon: 'briefcase' },
      { ...basePieces[3]!, icon: 'people' },
    ]
    const data = { type: 'puzzle2', pieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    expect((html.match(/data-icon/g) ?? []).length).toBe(4)
    expect(html).not.toContain(`d="${PIECE_PATHS[3]}" style="display:none"`)
  })

  it('gère N pièces avec leurs cartes, points et icônes correspondantes', () => {
    const pieces = [
      ...basePieces.map((p, i) => ({ ...p!, icon: ['clock', 'gear', 'briefcase', 'people'][i] })),
      { number: 5, title: 'Cinquième', color: '#5cc29d', icon: 'rocket' },
      { number: 6, title: 'Sixième', color: '#f27798', icon: 'gear' },
    ]
    const data = { type: 'puzzle2', pieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    expect((html.match(/data-element-id="piece-/g) ?? []).length).toBe(6)
    expect((html.match(/data-element-id="dot-/g) ?? []).length).toBe(6)
    expect((html.match(/data-element-id="card-/g) ?? []).length).toBe(6)
    expect((html.match(/data-icon/g) ?? []).length).toBe(6)
    expect(html).toContain('Cinquième')
    expect(html).toContain('Sixième')
  })

  it('gère 2 et 3 pièces avec cartes et points complets', () => {
    const data2 = { type: 'puzzle2', pieces: basePieces.slice(0, 2) } as unknown as PuzzleData
    const html2 = renderToString(<Puzzle2Template data={data2} />)
    expect((html2.match(/data-element-id="piece-/g) ?? []).length).toBe(2)
    expect((html2.match(/data-element-id="dot-/g) ?? []).length).toBe(2)
    expect((html2.match(/data-element-id="card-/g) ?? []).length).toBe(2)

    const data3 = { type: 'puzzle2', pieces: basePieces.slice(0, 3) } as unknown as PuzzleData
    const html3 = renderToString(<Puzzle2Template data={data3} />)
    expect((html3.match(/data-element-id="piece-/g) ?? []).length).toBe(3)
    expect((html3.match(/data-element-id="dot-/g) ?? []).length).toBe(3)
    expect((html3.match(/data-element-id="card-/g) ?? []).length).toBe(3)
  })

  it('rend les positions extraites pour points et cartes à 4 pièces', () => {
    const data = { type: 'puzzle2', pieces: basePieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    const dot = DOT_CENTERS[0]!
    expect(html).toContain(`cx="${dot.x}"`)
    expect(html).toContain('16.7')
    expect(html).toContain('14.6')
    expect(html).toContain(`d="${PIECE_PATHS[0]}"`)
  })

  it('résout les icônes Lucide et les variantes kebab-case', () => {
    const pieces = [
      { ...basePieces[0]!, icon: 'rocket' },
      { ...basePieces[1]!, icon: 'pie-chart' },
      { ...basePieces[2]!, icon: 'server' },
      { ...basePieces[3]!, icon: 'credit-card' },
    ]
    const data = { type: 'puzzle2', pieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    expect((html.match(/data-icon/g) ?? []).length).toBe(4)
  })

  it('respecte les règles de transparence absolue sans rect de fond ni titre global', () => {
    const data = { type: 'puzzle2', pieces: basePieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    expect(html.startsWith('<g>')).toBe(true)
    expect(html).not.toContain('<rect')
    expect(html).not.toContain('Brain')
    expect(html).not.toContain('Puzzle 2')
  })

  it('ne crash pas si la liste de pieces est vide ou non definie', () => {
    const emptyData = { type: 'puzzle2', pieces: [] } as unknown as PuzzleData
    const htmlEmpty = renderToString(<Puzzle2Template data={emptyData} />)
    expect(htmlEmpty).toBe('<g></g>')

    const undefinedData = { type: 'puzzle2' } as unknown as PuzzleData
    const htmlUndefined = renderToString(<Puzzle2Template data={undefinedData} />)
    expect(htmlUndefined).toBe('<g></g>')
  })

  it('decoupe les titres et sous-titres longs avec tspan et coordonnees x explicites', () => {
    const longPieces = [
      {
        number: 1,
        title: 'Titre Extrêmement Long Qui Doit Passer Sur Plusieurs Lignes Obligatoirement',
        subtitle: 'Une description détaillée qui doit elle aussi être découpée en plusieurs lignes distinctes',
        color: '#2c2b64',
      },
    ]
    const data = { type: 'puzzle2', pieces: longPieces } as unknown as PuzzleData
    const html = renderToString(<Puzzle2Template data={data} />)
    expect((html.match(/<tspan/g) ?? []).length).toBeGreaterThan(3)
    expect(html).toContain('dy="0"')
    expect(html).toContain('dy="18"')
  })
})
