import { describe, it, expect } from 'vitest'
import {
  equalAreaBoundaries,
  buildSectorPath,
  getRingPoint,
  SMOOTH_OUTER_CONTOUR,
  SMOOTH_INNER_CONTOUR,
} from '../ringGeometry'
import { RING_CENTER, RING_START_ANGLE, RING_END_ANGLE, RING_GAP_WIDTH } from '../ringGeometry'

function contourRadii(contour: readonly (readonly [number, number])[]): number[] {
  return contour.map(([x, y]) => Math.hypot(x - RING_CENTER.x, y - RING_CENTER.y))
}

function mean(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

describe('contours lisses pour N ≠ 6', () => {
  it('le contour exterieur lisse a un rayon constant', () => {
    const radii = contourRadii(SMOOTH_OUTER_CONTOUR)
    const average = mean(radii)
    for (const radius of radii) {
      expect(Math.abs(radius - average)).toBeLessThan(0.01)
    }
  })

  it('le contour interieur lisse a un rayon constant', () => {
    const radii = contourRadii(SMOOTH_INNER_CONTOUR)
    const average = mean(radii)
    for (const radius of radii) {
      expect(Math.abs(radius - average)).toBeLessThan(0.01)
    }
  })

  it('equalAreaBoundaries sur un anneau circulaire repartit les angles uniformement', () => {
    const boundaries = equalAreaBoundaries(11, SMOOTH_OUTER_CONTOUR, SMOOTH_INNER_CONTOUR)
    expect(boundaries[0]).toBe(RING_START_ANGLE)
    expect(boundaries[boundaries.length - 1]).toBe(RING_END_ANGLE)
    expect(boundaries.length).toBe(12)
    const spans = boundaries.slice(1).map((end, i) => end - boundaries[i]!)
    const reference = spans[0]!
    for (const span of spans) {
      expect(Math.abs(span - reference)).toBeLessThan(0.5)
    }
  })

  it('buildSectorPath sur contours lisses produit des chemins fermes pour chaque tranche', () => {
    const boundaries = equalAreaBoundaries(11, SMOOTH_OUTER_CONTOUR, SMOOTH_INNER_CONTOUR)
    for (let i = 0; i < boundaries.length - 1; i += 1) {
      const d = buildSectorPath(boundaries[i]!, boundaries[i + 1]!, RING_GAP_WIDTH, SMOOTH_OUTER_CONTOUR, SMOOTH_INNER_CONTOUR)
      expect(d.startsWith('M ')).toBe(true)
      expect(d.endsWith(' Z')).toBe(true)
    }
  })

  it('getRingPoint avec contours lisses place le contenu entre les bords', () => {
    const boundaries = equalAreaBoundaries(11, SMOOTH_OUTER_CONTOUR, SMOOTH_INNER_CONTOUR)
    const bisector = (boundaries[1]! + boundaries[2]!) / 2
    const point = getRingPoint(bisector, 0.5, SMOOTH_OUTER_CONTOUR, SMOOTH_INNER_CONTOUR)
    const inner = mean(contourRadii(SMOOTH_INNER_CONTOUR))
    const outer = mean(contourRadii(SMOOTH_OUTER_CONTOUR))
    const radius = Math.hypot(point.x - RING_CENTER.x, point.y - RING_CENTER.y)
    expect(radius).toBeGreaterThan(inner)
    expect(radius).toBeLessThan(outer)
  })
})
