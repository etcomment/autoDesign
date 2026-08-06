import { describe, it, expect } from 'vitest'
import {
  equalAreaBoundaries,
  buildSectorPath,
  getRingPoint,
  OUTER_CONTOUR,
  INNER_CONTOUR,
} from '../ringGeometry'
import { RING_CENTER, RING_START_ANGLE, RING_END_ANGLE, RING_GAP_WIDTH } from '../ringGeometry'

function contourRadii(contour: readonly (readonly [number, number])[]): number[] {
  return contour.map(([x, y]) => Math.hypot(x - RING_CENTER.x, y - RING_CENTER.y))
}

function firstSlice(boundaries: number[]): string {
  return buildSectorPath(boundaries[0]!, boundaries[1]!, RING_GAP_WIDTH, OUTER_CONTOUR, INNER_CONTOUR)
}

function lastSlice(boundaries: number[]): string {
  return buildSectorPath(
    boundaries[boundaries.length - 2]!,
    boundaries[boundaries.length - 1]!,
    RING_GAP_WIDTH,
    OUTER_CONTOUR,
    INNER_CONTOUR,
  )
}

describe('anneau exact pour tout N', () => {
  const counts = [2, 5, 6, 7, 8, 11, 16]

  it('equalAreaBoundaries couvre exactement l arc de l anneau', () => {
    for (const count of counts) {
      const boundaries = equalAreaBoundaries(count)
      expect(boundaries[0]).toBe(RING_START_ANGLE)
      expect(boundaries[boundaries.length - 1]).toBe(RING_END_ANGLE)
      expect(boundaries.length).toBe(count + 1)
    }
  })

  it('le bas du premier bloc est identique quel que soit N (cape START_CAP_OUTER)', () => {
    const starts = counts.map(count => firstSlice(equalAreaBoundaries(count)))
    for (const d of starts) {
      expect(d.startsWith('M 39.26,195.70 38.66,195.06')).toBe(true)
    }
  })

  it('le bas du dernier bloc est identique quel que soit N (cape END_CAP_OUTER)', () => {
    const ends = counts.map(count => lastSlice(equalAreaBoundaries(count)))
    for (const d of ends) {
      expect(d).toContain('176.89,195.47 L 162.08,180.65')
    }
  })

  it('le premier bloc se referme avec la courbe de cape issue de dessin-2.svg', () => {
    for (const count of counts) {
      const d = firstSlice(equalAreaBoundaries(count))
      expect(d).toContain('68.85,165.80 L 54.08487,180.74859')
      expect(d.endsWith('39.25919,195.70138 Z')).toBe(true)
    }
  })

  it('chaque tranche produit un chemin ferme', () => {
    for (const count of counts) {
      const boundaries = equalAreaBoundaries(count)
      for (let i = 0; i < boundaries.length - 1; i += 1) {
        const d = buildSectorPath(boundaries[i]!, boundaries[i + 1]!, RING_GAP_WIDTH, OUTER_CONTOUR, INNER_CONTOUR)
        expect(d.startsWith('M ')).toBe(true)
        expect(d.endsWith(' Z')).toBe(true)
      }
    }
  })

  it('getRingPoint place le contenu entre les bords du contour exact', () => {
    const innerMin = Math.min(...contourRadii(INNER_CONTOUR))
    const outerMax = Math.max(...contourRadii(OUTER_CONTOUR))
    for (const count of counts) {
      const boundaries = equalAreaBoundaries(count)
      const bisector = (boundaries[1]! + boundaries[2]!) / 2
      for (const fraction of [0.1, 0.5, 0.9]) {
        const point = getRingPoint(bisector, fraction, OUTER_CONTOUR, INNER_CONTOUR)
        const radius = Math.hypot(point.x - RING_CENTER.x, point.y - RING_CENTER.y)
        expect(radius).toBeGreaterThanOrEqual(innerMin)
        expect(radius).toBeLessThanOrEqual(outerMax)
      }
    }
  })
})
