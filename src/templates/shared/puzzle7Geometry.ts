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

  let Rout = 185
  let Rin = 90
  let Lx = 0
  let Ly = 0

  if (n === 5) {
    Rout = 175
    Rin = 85
    Lx = 120
    Ly = 0
  } else if (n === 6) {
    Rout = 170
    Rin = 85
    Lx = 130
    Ly = 0
  } else if (n >= 7) {
    Rout = 165
    Rin = 80
    Lx = 120
    Ly = 60
  }

  const rOutCorner = 50
  const rInCorner = 25

  const scale = ((Rout - Rin) / 142.02) * 1.05
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU
  const tabProtrusion = 33.4 * scaleV

  const w_half = Rout + Lx / 2
  const h_half = Rout + Ly / 2
  const w_inner = Rin + Lx / 2
  const h_inner = Rin + Ly / 2

  const bounds: PiecePathBounds = {
    Xout_L: cx - w_half,
    Xout_R: cx + w_half,
    Yout_T: cy - h_half,
    Yout_B: cy + h_half,
    Xin_L: cx - w_inner,
    Xin_R: cx + w_inner,
    Yin_T: cy - h_inner,
    Yin_B: cy + h_inner,
    xcut_TL: n >= 5 ? cx - Lx / 2 : cx,
    xcut_TR: n >= 5 ? cx + Lx / 2 : cx,
    xcut_BR: n === 6 || n >= 7 ? cx + Lx / 2 : cx,
    xcut_BL: n === 6 || n >= 7 ? cx - Lx / 2 : cx,
    ycut_TL: n >= 8 ? cy - Ly / 2 : cy,
    ycut_TR: n >= 7 ? cy - Ly / 2 : cy,
    ycut_BR: n >= 7 ? cy + Ly / 2 : cy,
    ycut_BL: n >= 8 ? cy + Ly / 2 : cy,
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
        iconCenter: { x: bounds.Xin_L - 30, y: cy - 60 },
        numCenter: { x: bounds.Xin_L - 30, y: cy + 60 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy },
        defaultDot: { x: 190, y: cy },
        defaultCard: { x: 45, y: cy - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: w_half + tabProtrusion, height: 2 * h_half },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('half_right', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: cy - 60 },
        numCenter: { x: bounds.Xin_R + 30, y: cy + 60 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 825, y: cy - 42, width: 130, height: 85 },
        bbox: { x: cx - tabProtrusion, y: bounds.Yout_T, width: w_half + tabProtrusion, height: 2 * h_half },
      },
    ]
  }

  if (n === 4) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: cx - 130, y: cy - 135 },
        numCenter: { x: cx - 55, y: cy - 135 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: cx - Rout, y: cy - 135 },
        defaultDot: { x: 190, y: cy - 135 },
        defaultCard: { x: 45, y: cy - 135 - 42, width: 130, height: 85 },
        bbox: { x: cx - Rout, y: cy - Rout, width: Rout + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: cx + 130, y: cy - 135 },
        numCenter: { x: cx + 130, y: cy - 55 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: cx + Rout, y: cy - 135 },
        defaultDot: { x: 810, y: cy - 135 },
        defaultCard: { x: 825, y: cy - 135 - 42, width: 130, height: 85 },
        bbox: { x: cx, y: cy - Rout, width: Rout, height: Rout + tabProtrusion },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: cx + 130, y: cy + 135 },
        numCenter: { x: cx + 55, y: cy + 135 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: cx + Rout, y: cy + 135 },
        defaultDot: { x: 810, y: cy + 135 },
        defaultCard: { x: 825, y: cy + 135 - 42, width: 130, height: 85 },
        bbox: { x: cx - tabProtrusion, y: cy, width: Rout + tabProtrusion, height: Rout },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: cx - 130, y: cy + 135 },
        numCenter: { x: cx - 130, y: cy + 55 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: cx - Rout, y: cy + 135 },
        defaultDot: { x: 190, y: cy + 135 },
        defaultCard: { x: 45, y: cy + 135 - 42, width: 130, height: 85 },
        bbox: { x: cx - Rout, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 5) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_T + 50 },
        numCenter: { x: bounds.xcut_TL - 35, y: bounds.Yout_T + 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: bounds.Yout_T + 50 },
        defaultDot: { x: 190, y: bounds.Yout_T + 50 },
        defaultCard: { x: 45, y: bounds.Yout_T + 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: w_half + tabProtrusion, height: h_half + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        iconCenter: { x: cx - 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
        numCenter: { x: cx + 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: 65 },
        defaultCard: { x: cx - 75, y: 12, width: 150, height: 48 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: Lx + tabProtrusion, height: bounds.Yin_T - bounds.Yout_T },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_T + 50 },
        numCenter: { x: bounds.xcut_TR + 35, y: bounds.Yout_T + 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: bounds.Yout_T + 50 },
        defaultDot: { x: 810, y: bounds.Yout_T + 50 },
        defaultCard: { x: 825, y: bounds.Yout_T + 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: w_half - Lx / 2, height: h_half + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_B - 50 },
        numCenter: { x: cx + 50, y: bounds.Yout_B - 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: bounds.Yout_B - 50 },
        defaultDot: { x: 810, y: bounds.Yout_B - 50 },
        defaultCard: { x: 825, y: bounds.Yout_B - 50 - 42, width: 130, height: 85 },
        bbox: { x: cx - tabProtrusion, y: cy, width: w_half + tabProtrusion, height: h_half },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_B - 50 },
        numCenter: { x: cx - 50, y: bounds.Yout_B - 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: bounds.Yout_B - 50 },
        defaultDot: { x: 190, y: bounds.Yout_B - 50 },
        defaultCard: { x: 45, y: bounds.Yout_B - 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: w_half, height: h_half + tabProtrusion },
      },
    ]
  }

  if (n === 6) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_T + 50 },
        numCenter: { x: bounds.xcut_TL - 35, y: bounds.Yout_T + 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: bounds.Yout_T + 50 },
        defaultDot: { x: 190, y: bounds.Yout_T + 50 },
        defaultCard: { x: 45, y: bounds.Yout_T + 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: w_half - Lx / 2 + tabProtrusion, height: h_half + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        iconCenter: { x: cx - 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
        numCenter: { x: cx + 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: 65 },
        defaultCard: { x: cx - 75, y: 12, width: 150, height: 48 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: Lx + tabProtrusion, height: bounds.Yin_T - bounds.Yout_T },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_T + 50 },
        numCenter: { x: bounds.xcut_TR + 35, y: bounds.Yout_T + 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: bounds.Yout_T + 50 },
        defaultDot: { x: 810, y: bounds.Yout_T + 50 },
        defaultCard: { x: 825, y: bounds.Yout_T + 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: w_half - Lx / 2, height: h_half + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_B - 50 },
        numCenter: { x: bounds.xcut_BR + 35, y: bounds.Yout_B - 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: bounds.Yout_B - 50 },
        defaultDot: { x: 810, y: bounds.Yout_B - 50 },
        defaultCard: { x: 825, y: bounds.Yout_B - 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.xcut_BR - tabProtrusion, y: cy, width: w_half - Lx / 2 + tabProtrusion, height: h_half },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('bottom', bounds),
        iconCenter: { x: cx + 24, y: (bounds.Yout_B + bounds.Yin_B) / 2 },
        numCenter: { x: cx - 24, y: (bounds.Yout_B + bounds.Yin_B) / 2 },
        isStraight: true,
        cardDirection: 'bottom',
        lineStart: { x: cx, y: bounds.Yout_B },
        defaultDot: { x: cx, y: 455 },
        defaultCard: { x: cx - 75, y: 460, width: 150, height: 48 },
        bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: Lx + tabProtrusion, height: bounds.Yout_B - bounds.Yin_B },
      },
      {
        index: 5,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_B - 50 },
        numCenter: { x: bounds.xcut_BL - 35, y: bounds.Yout_B - 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: bounds.Yout_B - 50 },
        defaultDot: { x: 190, y: bounds.Yout_B - 50 },
        defaultCard: { x: 45, y: bounds.Yout_B - 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: w_half - Lx / 2, height: h_half + tabProtrusion },
      },
    ]
  }

  if (n === 7) {
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_T + 50 },
        numCenter: { x: bounds.xcut_TL - 35, y: bounds.Yout_T + 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: bounds.Yout_T + 50 },
        defaultDot: { x: 190, y: bounds.Yout_T + 50 },
        defaultCard: { x: 45, y: bounds.Yout_T + 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: w_half - Lx / 2 + tabProtrusion, height: h_half + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        iconCenter: { x: cx - 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
        numCenter: { x: cx + 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: 65 },
        defaultCard: { x: cx - 75, y: 12, width: 150, height: 48 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: Lx + tabProtrusion, height: bounds.Yin_T - bounds.Yout_T },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_T + 50 },
        numCenter: { x: bounds.xcut_TR + 35, y: bounds.Yout_T + 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: bounds.Yout_T + 40 },
        defaultDot: { x: 810, y: bounds.Yout_T + 40 },
        defaultCard: { x: 825, y: bounds.Yout_T + 40 - 35, width: 130, height: 75 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: w_half - Lx / 2, height: h_half - Ly / 2 + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('right', bounds),
        iconCenter: { x: (bounds.Xout_R + bounds.Xin_R) / 2, y: cy - 18 },
        numCenter: { x: (bounds.Xout_R + bounds.Xin_R) / 2, y: cy + 18 },
        isStraight: true,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 825, y: cy - 35, width: 130, height: 75 },
        bbox: { x: bounds.Xin_R, y: bounds.ycut_TR - tabProtrusion, width: bounds.Xout_R - bounds.Xin_R, height: Ly + tabProtrusion },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('br', bounds),
        iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_B - 50 },
        numCenter: { x: bounds.xcut_BR + 35, y: bounds.Yout_B - 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: bounds.Yout_B - 40 },
        defaultDot: { x: 810, y: bounds.Yout_B - 40 },
        defaultCard: { x: 825, y: bounds.Yout_B - 40 - 35, width: 130, height: 75 },
        bbox: { x: bounds.xcut_BR - tabProtrusion, y: bounds.ycut_BR, width: w_half - Lx / 2 + tabProtrusion, height: h_half - Ly / 2 },
      },
      {
        index: 5,
        path: makePuzzle7PiecePath('bottom', bounds),
        iconCenter: { x: cx + 24, y: (bounds.Yout_B + bounds.Yin_B) / 2 },
        numCenter: { x: cx - 24, y: (bounds.Yout_B + bounds.Yin_B) / 2 },
        isStraight: true,
        cardDirection: 'bottom',
        lineStart: { x: cx, y: bounds.Yout_B },
        defaultDot: { x: cx, y: 455 },
        defaultCard: { x: cx - 75, y: 460, width: 150, height: 48 },
        bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: Lx + tabProtrusion, height: bounds.Yout_B - bounds.Yin_B },
      },
      {
        index: 6,
        path: makePuzzle7PiecePath('bl', bounds),
        iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_B - 50 },
        numCenter: { x: bounds.xcut_BL - 35, y: bounds.Yout_B - 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: bounds.Yout_B - 50 },
        defaultDot: { x: 190, y: bounds.Yout_B - 50 },
        defaultCard: { x: 45, y: bounds.Yout_B - 50 - 42, width: 130, height: 85 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: w_half - Lx / 2, height: h_half + tabProtrusion },
      },
    ]
  }

  return [
    {
      index: 0,
      path: makePuzzle7PiecePath('tl', bounds),
      iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_T + 50 },
      numCenter: { x: bounds.xcut_TL - 35, y: bounds.Yout_T + 50 },
      isStraight: false,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: bounds.Yout_T + 40 },
      defaultDot: { x: 190, y: bounds.Yout_T + 40 },
      defaultCard: { x: 45, y: bounds.Yout_T + 40 - 35, width: 130, height: 75 },
      bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: w_half - Lx / 2 + tabProtrusion, height: h_half - Ly / 2 + tabProtrusion },
    },
    {
      index: 1,
      path: makePuzzle7PiecePath('top', bounds),
      iconCenter: { x: cx - 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
      numCenter: { x: cx + 24, y: (bounds.Yout_T + bounds.Yin_T) / 2 },
      isStraight: true,
      cardDirection: 'top',
      lineStart: { x: cx, y: bounds.Yout_T },
      defaultDot: { x: cx, y: 65 },
      defaultCard: { x: cx - 75, y: 12, width: 150, height: 48 },
      bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: Lx + tabProtrusion, height: bounds.Yin_T - bounds.Yout_T },
    },
    {
      index: 2,
      path: makePuzzle7PiecePath('tr', bounds),
      iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_T + 50 },
      numCenter: { x: bounds.xcut_TR + 35, y: bounds.Yout_T + 50 },
      isStraight: false,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: bounds.Yout_T + 40 },
      defaultDot: { x: 810, y: bounds.Yout_T + 40 },
      defaultCard: { x: 825, y: bounds.Yout_T + 40 - 35, width: 130, height: 75 },
      bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: w_half - Lx / 2, height: h_half - Ly / 2 + tabProtrusion },
    },
    {
      index: 3,
      path: makePuzzle7PiecePath('right', bounds),
      iconCenter: { x: (bounds.Xout_R + bounds.Xin_R) / 2, y: cy - 18 },
      numCenter: { x: (bounds.Xout_R + bounds.Xin_R) / 2, y: cy + 18 },
      isStraight: true,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: cy },
      defaultDot: { x: 810, y: cy },
      defaultCard: { x: 825, y: cy - 35, width: 130, height: 75 },
      bbox: { x: bounds.Xin_R, y: bounds.ycut_TR - tabProtrusion, width: bounds.Xout_R - bounds.Xin_R, height: Ly + tabProtrusion },
    },
    {
      index: 4,
      path: makePuzzle7PiecePath('br', bounds),
      iconCenter: { x: bounds.Xin_R + 30, y: bounds.Yout_B - 50 },
      numCenter: { x: bounds.xcut_BR + 35, y: bounds.Yout_B - 50 },
      isStraight: false,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: bounds.Yout_B - 40 },
      defaultDot: { x: 810, y: bounds.Yout_B - 40 },
      defaultCard: { x: 825, y: bounds.Yout_B - 40 - 35, width: 130, height: 75 },
      bbox: { x: bounds.xcut_BR - tabProtrusion, y: bounds.ycut_BR, width: w_half - Lx / 2 + tabProtrusion, height: h_half - Ly / 2 },
    },
    {
      index: 5,
      path: makePuzzle7PiecePath('bottom', bounds),
      iconCenter: { x: cx + 24, y: (bounds.Yout_B + bounds.Yin_B) / 2 },
      numCenter: { x: cx - 24, y: (bounds.Yout_B + bounds.Yin_B) / 2 },
      isStraight: true,
      cardDirection: 'bottom',
      lineStart: { x: cx, y: bounds.Yout_B },
      defaultDot: { x: cx, y: 455 },
      defaultCard: { x: cx - 75, y: 460, width: 150, height: 48 },
      bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: Lx + tabProtrusion, height: bounds.Yout_B - bounds.Yin_B },
    },
    {
      index: 6,
      path: makePuzzle7PiecePath('bl', bounds),
      iconCenter: { x: bounds.Xin_L - 30, y: bounds.Yout_B - 50 },
      numCenter: { x: bounds.xcut_BL - 35, y: bounds.Yout_B - 50 },
      isStraight: false,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: bounds.Yout_B - 40 },
      defaultDot: { x: 190, y: bounds.Yout_B - 40 },
      defaultCard: { x: 45, y: bounds.Yout_B - 40 - 35, width: 130, height: 75 },
      bbox: { x: bounds.Xout_L, y: bounds.ycut_BL - tabProtrusion, width: w_half - Lx / 2, height: h_half - Ly / 2 + tabProtrusion },
    },
    {
      index: 7,
      path: makePuzzle7PiecePath('left', bounds),
      iconCenter: { x: (bounds.Xout_L + bounds.Xin_L) / 2, y: cy - 18 },
      numCenter: { x: (bounds.Xout_L + bounds.Xin_L) / 2, y: cy + 18 },
      isStraight: true,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: cy },
      defaultDot: { x: 190, y: cy },
      defaultCard: { x: 45, y: cy - 35, width: 130, height: 75 },
      bbox: { x: bounds.Xout_L, y: bounds.ycut_TL - tabProtrusion, width: bounds.Xin_L - bounds.Xout_L, height: Ly + tabProtrusion },
    },
  ]
}
