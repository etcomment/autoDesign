import { makePuzzle7PiecePath, type PiecePathBounds } from './puzzle7Paths'

export { makePuzzle7PiecePath }

export interface Puzzle7PieceLayout {
  index: number
  path: string
  iconCenter: { x: number; y: number }
  numCenter: { x: number; y: number }
  isStraight: boolean
  cardDirection: 'left' | 'right' | 'top' | 'bottom'
  lineStart: { x: number; y: number }
  defaultDot: { x: number; y: number }
  defaultCard: { x: number; y: number; width: number; height: number }
  bbox: { x: number; y: number; width: number; height: number }
}

export function computePuzzle7Layout(
  count: number,
  cx: number = 500,
  cy: number = 260,
): Puzzle7PieceLayout[] {
  const n = Math.min(8, Math.max(2, count))

  const Rout = 180
  const Rin = 90
  const rOutCorner = 50
  const rInCorner = 25

  const scale = ((Rout - Rin) / 142.02) * 1.05
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU
  const tabProtrusion = 33.4 * scaleV

  const segHalf = 60

  const bounds: PiecePathBounds = {
    Xout_L: cx - Rout,
    Xout_R: cx + Rout,
    Yout_T: cy - Rout,
    Yout_B: cy + Rout,
    Xin_L: cx - Rin,
    Xin_R: cx + Rin,
    Yin_T: cy - Rin,
    Yin_B: cy + Rin,
    xcut_TL: n >= 5 ? cx - segHalf : cx,
    xcut_TR: n >= 5 ? cx + segHalf : cx,
    xcut_BR: n >= 6 ? cx + segHalf : cx,
    xcut_BL: n >= 6 ? cx - segHalf : cx,
    ycut_TL: n >= 8 ? cy - segHalf : cy,
    ycut_TR: n >= 7 ? cy - segHalf : cy,
    ycut_BR: n >= 7 ? cy + segHalf : cy,
    ycut_BL: n >= 8 ? cy + segHalf : cy,
    rOutCorner,
    rInCorner,
    scaleU,
    scaleV,
    baseHalf,
  }

  if (n === 2) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('half_left', bounds),
        iconCenter: { x: cx - 135, y: cy - 50 },
        numCenter: { x: cx - 135, y: cy + 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy },
        defaultDot: { x: 190, y: cy },
        defaultCard: { x: 40, y: cy - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout + tabProtrusion, height: 2 * Rout },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('half_right', bounds),
        iconCenter: { x: cx + 135, y: cy - 50 },
        numCenter: { x: cx + 135, y: cy + 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 820, y: cy - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: bounds.Yout_T, width: Rout + tabProtrusion, height: 2 * Rout },
      },
    ]
  }

  if (n === 3) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: cx - 120, y: cy - 125 },
        numCenter: { x: cx - 55, y: cy - 125 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - 85 },
        defaultDot: { x: 190, y: cy - 85 },
        defaultCard: { x: 40, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('half_right', bounds),
        iconCenter: { x: cx + 135, y: cy - 50 },
        numCenter: { x: cx + 135, y: cy + 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 820, y: cy - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: bounds.Yout_T, width: Rout + tabProtrusion, height: 2 * Rout },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: cx - 120, y: cy + 125 },
        numCenter: { x: cx - 120, y: cy + 55 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + 85 },
        defaultDot: { x: 190, y: cy + 85 },
        defaultCard: { x: 40, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 4) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: cx - 120, y: cy - 125 },
        numCenter: { x: cx - 55, y: cy - 125 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - 85 },
        defaultDot: { x: 190, y: cy - 85 },
        defaultCard: { x: 40, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: cx + 120, y: cy - 125 },
        numCenter: { x: cx + 120, y: cy - 55 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy - 85 },
        defaultDot: { x: 810, y: cy - 85 },
        defaultCard: { x: 820, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: cx, y: bounds.Yout_T, width: Rout, height: Rout + tabProtrusion },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: cx + 120, y: cy + 125 },
        numCenter: { x: cx + 55, y: cy + 125 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy + 85 },
        defaultDot: { x: 810, y: cy + 85 },
        defaultCard: { x: 820, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: cy, width: Rout + tabProtrusion, height: Rout },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: cx - 120, y: cy + 125 },
        numCenter: { x: cx - 120, y: cy + 55 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + 85 },
        defaultDot: { x: 190, y: cy + 85 },
        defaultCard: { x: 40, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 5) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: cx - 135, y: cy - 135 },
        numCenter: { x: cx - 80, y: cy - 135 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - 85 },
        defaultDot: { x: 190, y: cy - 85 },
        defaultCard: { x: 40, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        iconCenter: { x: cx - 22, y: cy - 135 },
        numCenter: { x: cx + 22, y: cy - 135 },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: 65 },
        defaultCard: { x: cx - 75, y: 14, width: 150, height: 48 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: cx + 135, y: cy - 135 },
        numCenter: { x: cx + 80, y: cy - 135 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy - 85 },
        defaultDot: { x: 810, y: cy - 85 },
        defaultCard: { x: 820, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: cx + 120, y: cy + 125 },
        numCenter: { x: cx + 55, y: cy + 125 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy + 85 },
        defaultDot: { x: 810, y: cy + 85 },
        defaultCard: { x: 820, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: cy, width: Rout + tabProtrusion, height: Rout },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: cx - 120, y: cy + 125 },
        numCenter: { x: cx - 120, y: cy + 55 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + 85 },
        defaultDot: { x: 190, y: cy + 85 },
        defaultCard: { x: 40, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 6) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: cx - 135, y: cy - 135 },
        numCenter: { x: cx - 80, y: cy - 135 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - 85 },
        defaultDot: { x: 190, y: cy - 85 },
        defaultCard: { x: 40, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        iconCenter: { x: cx - 22, y: cy - 135 },
        numCenter: { x: cx + 22, y: cy - 135 },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: 65 },
        defaultCard: { x: cx - 75, y: 14, width: 150, height: 48 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: cx + 135, y: cy - 135 },
        numCenter: { x: cx + 80, y: cy - 135 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy - 85 },
        defaultDot: { x: 810, y: cy - 85 },
        defaultCard: { x: 820, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: cx + 135, y: cy + 135 },
        numCenter: { x: cx + 80, y: cy + 135 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy + 85 },
        defaultDot: { x: 810, y: cy + 85 },
        defaultCard: { x: 820, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.xcut_BR - tabProtrusion, y: cy, width: Rout - segHalf + tabProtrusion, height: Rout },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('bottom', bounds),
        iconCenter: { x: cx + 22, y: cy + 135 },
        numCenter: { x: cx - 22, y: cy + 135 },
        isStraight: true,
        cardDirection: 'bottom',
        lineStart: { x: cx, y: bounds.Yout_B },
        defaultDot: { x: cx, y: 455 },
        defaultCard: { x: cx - 75, y: 458, width: 150, height: 48 },
        bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 5,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: cx - 135, y: cy + 135 },
        numCenter: { x: cx - 80, y: cy + 135 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + 85 },
        defaultDot: { x: 190, y: cy + 85 },
        defaultCard: { x: 40, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 7) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: cx - 135, y: cy - 135 },
        numCenter: { x: cx - 80, y: cy - 135 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - 85 },
        defaultDot: { x: 190, y: cy - 85 },
        defaultCard: { x: 40, y: cy - 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        iconCenter: { x: cx - 22, y: cy - 135 },
        numCenter: { x: cx + 22, y: cy - 135 },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: 65 },
        defaultCard: { x: cx - 75, y: 14, width: 150, height: 48 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: cx + 135, y: cy - 135 },
        numCenter: { x: cx + 80, y: cy - 135 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: 140 },
        defaultDot: { x: 810, y: 140 },
        defaultCard: { x: 820, y: 105, width: 140, height: 70 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout - segHalf + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('right', bounds),
        iconCenter: { x: cx + 135, y: cy - 22 },
        numCenter: { x: cx + 135, y: cy + 22 },
        isStraight: true,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 820, y: cy - 35, width: 140, height: 70 },
        bbox: { x: bounds.Xin_R, y: bounds.ycut_TR - tabProtrusion, width: Rin, height: 2 * segHalf + tabProtrusion },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: cx + 135, y: cy + 135 },
        numCenter: { x: cx + 80, y: cy + 135 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: 380 },
        defaultDot: { x: 810, y: 380 },
        defaultCard: { x: 820, y: 345, width: 140, height: 70 },
        bbox: { x: bounds.xcut_BR - tabProtrusion, y: bounds.ycut_BR, width: Rout - segHalf + tabProtrusion, height: Rout - segHalf },
      },
      {
        index: 5,
        path: makePuzzle7PiecePath('bottom', bounds),
        iconCenter: { x: cx + 22, y: cy + 135 },
        numCenter: { x: cx - 22, y: cy + 135 },
        isStraight: true,
        cardDirection: 'bottom',
        lineStart: { x: cx, y: bounds.Yout_B },
        defaultDot: { x: cx, y: 455 },
        defaultCard: { x: cx - 75, y: 458, width: 150, height: 48 },
        bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 6,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: cx - 135, y: cy + 135 },
        numCenter: { x: cx - 80, y: cy + 135 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + 85 },
        defaultDot: { x: 190, y: cy + 85 },
        defaultCard: { x: 40, y: cy + 85 - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
    ]
  }

  return [
    {
      index: 0,
      path: makePuzzle7PiecePath('tl', bounds),
      iconCenter: { x: cx - 135, y: cy - 135 },
      numCenter: { x: cx - 80, y: cy - 135 },
      isStraight: false,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: 140 },
      defaultDot: { x: 190, y: 140 },
      defaultCard: { x: 40, y: 105, width: 140, height: 70 },
      bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout - segHalf + tabProtrusion },
    },
    {
      index: 1,
      path: makePuzzle7PiecePath('top', bounds),
      iconCenter: { x: cx - 22, y: cy - 135 },
      numCenter: { x: cx + 22, y: cy - 135 },
      isStraight: true,
      cardDirection: 'top',
      lineStart: { x: cx, y: bounds.Yout_T },
      defaultDot: { x: cx, y: 65 },
      defaultCard: { x: cx - 75, y: 14, width: 150, height: 48 },
      bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
    },
    {
      index: 2,
      path: makePuzzle7PiecePath('tr', bounds),
      iconCenter: { x: cx + 135, y: cy - 135 },
      numCenter: { x: cx + 80, y: cy - 135 },
      isStraight: false,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: 140 },
      defaultDot: { x: 810, y: 140 },
      defaultCard: { x: 820, y: 105, width: 140, height: 70 },
      bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout - segHalf + tabProtrusion },
    },
    {
      index: 3,
      path: makePuzzle7PiecePath('right', bounds),
      iconCenter: { x: cx + 135, y: cy - 22 },
      numCenter: { x: cx + 135, y: cy + 22 },
      isStraight: true,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: cy },
      defaultDot: { x: 810, y: cy },
      defaultCard: { x: 820, y: cy - 35, width: 140, height: 70 },
      bbox: { x: bounds.Xin_R, y: bounds.ycut_TR - tabProtrusion, width: Rin, height: 2 * segHalf + tabProtrusion },
    },
    {
      index: 4,
      path: makePuzzle7PiecePath('br', bounds),
      iconCenter: { x: cx + 135, y: cy + 135 },
      numCenter: { x: cx + 80, y: cy + 135 },
      isStraight: false,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: 380 },
      defaultDot: { x: 810, y: 380 },
      defaultCard: { x: 820, y: 345, width: 140, height: 70 },
      bbox: { x: bounds.xcut_BR - tabProtrusion, y: bounds.ycut_BR, width: Rout - segHalf + tabProtrusion, height: Rout - segHalf },
    },
    {
      index: 5,
      path: makePuzzle7PiecePath('bottom', bounds),
      iconCenter: { x: cx + 22, y: cy + 135 },
      numCenter: { x: cx - 22, y: cy + 135 },
      isStraight: true,
      cardDirection: 'bottom',
      lineStart: { x: cx, y: bounds.Yout_B },
      defaultDot: { x: cx, y: 455 },
      defaultCard: { x: cx - 75, y: 458, width: 150, height: 48 },
      bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: 2 * segHalf + tabProtrusion, height: Rin },
    },
    {
      index: 6,
      path: makePuzzle7PiecePath('bl', bounds),
      iconCenter: { x: cx - 135, y: cy + 135 },
      numCenter: { x: cx - 80, y: cy + 135 },
      isStraight: false,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: 380 },
      defaultDot: { x: 190, y: 380 },
      defaultCard: { x: 40, y: 345, width: 140, height: 70 },
      bbox: { x: bounds.Xout_L, y: bounds.ycut_BL - tabProtrusion, width: Rout - segHalf, height: Rout - segHalf + tabProtrusion },
    },
    {
      index: 7,
      path: makePuzzle7PiecePath('left', bounds),
      iconCenter: { x: cx - 135, y: cy - 22 },
      numCenter: { x: cx - 135, y: cy + 22 },
      isStraight: true,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: cy },
      defaultDot: { x: 190, y: cy },
      defaultCard: { x: 40, y: cy - 35, width: 140, height: 70 },
      bbox: { x: bounds.Xout_L, y: bounds.ycut_TL - tabProtrusion, width: Rin, height: 2 * segHalf + tabProtrusion },
    },
  ]
}
