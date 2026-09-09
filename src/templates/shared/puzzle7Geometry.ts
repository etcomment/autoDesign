import { makePuzzle7PiecePath, type PiecePathBounds } from './puzzle7Paths'

export { makePuzzle7PiecePath }

export interface Puzzle7PieceLayout {
  index: number
  path: string
  center: { x: number; y: number }
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

  const Rout = 165
  const Rin = 85
  const rOutCorner = 50
  const rInCorner = 25

  const scale = ((Rout - Rin) / 142.02) * 1.05
  const scaleU = scale * 1.20
  const scaleV = scale * 1.24
  const baseHalf = 11.75 * scaleU
  const tabProtrusion = 33.4 * scaleV

  const segHalf = 55

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

  const Rmid = (Rout + Rin) / 2

  if (n === 2) {
    const centerL = { x: cx - Rmid, y: cy }
    const centerR = { x: cx + Rmid, y: cy }
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('half_left', bounds),
        center: centerL,
        numCenter: { x: centerL.x, y: centerL.y - 20 },
        iconCenter: { x: centerL.x, y: centerL.y + 20 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy },
        defaultDot: { x: 190, y: cy },
        defaultCard: { x: 35, y: cy - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout + tabProtrusion, height: 2 * Rout },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('half_right', bounds),
        center: centerR,
        iconCenter: { x: centerR.x, y: centerR.y - 20 },
        numCenter: { x: centerR.x, y: centerR.y + 20 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 825, y: cy - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: bounds.Yout_T, width: Rout + tabProtrusion, height: 2 * Rout },
      },
    ]
  }

  if (n === 3) {
    const c0 = { x: cx - Rmid, y: cy - Rmid }
    const c1 = { x: cx + Rmid, y: cy }
    const c2 = { x: cx - Rmid, y: cy + Rmid }
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        center: c0,
        iconCenter: { x: c0.x - 17, y: c0.y },
        numCenter: { x: c0.x + 17, y: c0.y },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - Rmid },
        defaultDot: { x: 190, y: cy - Rmid },
        defaultCard: { x: 35, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('half_right', bounds),
        center: c1,
        iconCenter: { x: c1.x, y: c1.y - 20 },
        numCenter: { x: c1.x, y: c1.y + 20 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 825, y: cy - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: bounds.Yout_T, width: Rout + tabProtrusion, height: 2 * Rout },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('bl', bounds),
        center: c2,
        numCenter: { x: c2.x - 17, y: c2.y },
        iconCenter: { x: c2.x + 17, y: c2.y },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + Rmid },
        defaultDot: { x: 190, y: cy + Rmid },
        defaultCard: { x: 35, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 4) {
    const cTL = { x: cx - Rmid, y: cy - Rmid }
    const cTR = { x: cx + Rmid, y: cy - Rmid }
    const cBR = { x: cx + Rmid, y: cy + Rmid }
    const cBL = { x: cx - Rmid, y: cy + Rmid }
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        center: cTL,
        iconCenter: { x: cx - 120, y: cy - Rmid },
        numCenter: { x: cx - 50, y: cy - Rmid },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - Rmid },
        defaultDot: { x: 190, y: cy - Rmid },
        defaultCard: { x: 35, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('tr', bounds),
        center: cTR,
        iconCenter: { x: cx + Rmid, y: cy - 120 },
        numCenter: { x: cx + Rmid, y: cy - 50 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy - Rmid },
        defaultDot: { x: 810, y: cy - Rmid },
        defaultCard: { x: 825, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: cx, y: bounds.Yout_T, width: Rout, height: Rout + tabProtrusion },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('br', bounds),
        center: cBR,
        iconCenter: { x: cx + 120, y: cy + Rmid },
        numCenter: { x: cx + 50, y: cy + Rmid },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy + Rmid },
        defaultDot: { x: 810, y: cy + Rmid },
        defaultCard: { x: 825, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: cy, width: Rout + tabProtrusion, height: Rout },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('bl', bounds),
        center: cBL,
        iconCenter: { x: cx - Rmid, y: cy + 120 },
        numCenter: { x: cx - Rmid, y: cy + 50 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + Rmid },
        defaultDot: { x: 190, y: cy + Rmid },
        defaultCard: { x: 35, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 5) {
    const cTL = { x: cx - Rmid, y: cy - Rmid }
    const cTop = { x: cx, y: cy - Rmid }
    const cTR = { x: cx + Rmid, y: cy - Rmid }
    const cBR = { x: cx + Rmid, y: cy + Rmid }
    const cBL = { x: cx - Rmid, y: cy + Rmid }
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        center: cTL,
        iconCenter: { x: cTL.x - 17, y: cTL.y },
        numCenter: { x: cTL.x + 17, y: cTL.y },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - Rmid },
        defaultDot: { x: 190, y: cy - Rmid },
        defaultCard: { x: 35, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        center: cTop,
        iconCenter: { x: cTop.x - 17, y: cTop.y },
        numCenter: { x: cTop.x + 17, y: cTop.y },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: bounds.Yout_T - 10 },
        defaultCard: { x: cx - 80, y: 6, width: 160, height: 74 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        center: cTR,
        iconCenter: { x: cTR.x, y: cTR.y - 17 },
        numCenter: { x: cTR.x, y: cTR.y + 17 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy - Rmid },
        defaultDot: { x: 810, y: cy - Rmid },
        defaultCard: { x: 825, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('br', bounds),
        center: cBR,
        numCenter: { x: cBR.x - 17, y: cBR.y },
        iconCenter: { x: cBR.x + 17, y: cBR.y },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy + Rmid },
        defaultDot: { x: 810, y: cy + Rmid },
        defaultCard: { x: 825, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: cx - tabProtrusion, y: cy, width: Rout + tabProtrusion, height: Rout },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('bl', bounds),
        center: cBL,
        numCenter: { x: cBL.x, y: cBL.y - 17 },
        iconCenter: { x: cBL.x, y: cBL.y + 17 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + Rmid },
        defaultDot: { x: 190, y: cy + Rmid },
        defaultCard: { x: 35, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 6) {
    const cTL = { x: cx - Rmid, y: cy - Rmid }
    const cTop = { x: cx, y: cy - Rmid }
    const cTR = { x: cx + Rmid, y: cy - Rmid }
    const cBR = { x: cx + Rmid, y: cy + Rmid }
    const cBot = { x: cx, y: cy + Rmid }
    const cBL = { x: cx - Rmid, y: cy + Rmid }
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        center: cTL,
        iconCenter: { x: cTL.x - 17, y: cTL.y },
        numCenter: { x: cTL.x + 17, y: cTL.y },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - Rmid },
        defaultDot: { x: 190, y: cy - Rmid },
        defaultCard: { x: 35, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        center: cTop,
        iconCenter: { x: cTop.x - 17, y: cTop.y },
        numCenter: { x: cTop.x + 17, y: cTop.y },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: bounds.Yout_T - 10 },
        defaultCard: { x: cx - 80, y: 6, width: 160, height: 74 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        center: cTR,
        iconCenter: { x: cTR.x, y: cTR.y - 17 },
        numCenter: { x: cTR.x, y: cTR.y + 17 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy - Rmid },
        defaultDot: { x: 810, y: cy - Rmid },
        defaultCard: { x: 825, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('br', bounds),
        center: cBR,
        numCenter: { x: cBR.x - 17, y: cBR.y },
        iconCenter: { x: cBR.x + 17, y: cBR.y },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy + Rmid },
        defaultDot: { x: 810, y: cy + Rmid },
        defaultCard: { x: 825, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.xcut_BR - tabProtrusion, y: cy, width: Rout - segHalf + tabProtrusion, height: Rout },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('bottom', bounds),
        center: cBot,
        numCenter: { x: cBot.x - 17, y: cBot.y },
        iconCenter: { x: cBot.x + 17, y: cBot.y },
        isStraight: true,
        cardDirection: 'bottom',
        lineStart: { x: cx, y: bounds.Yout_B },
        defaultDot: { x: cx, y: bounds.Yout_B + 10 },
        defaultCard: { x: cx - 80, y: 440, width: 160, height: 74 },
        bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 5,
        path: makePuzzle7PiecePath('bl', bounds),
        center: cBL,
        numCenter: { x: cBL.x, y: cBL.y - 17 },
        iconCenter: { x: cBL.x, y: cBL.y + 17 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + Rmid },
        defaultDot: { x: 190, y: cy + Rmid },
        defaultCard: { x: 35, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
    ]
  }

  if (n === 7) {
    const cTL = { x: cx - Rmid, y: cy - Rmid }
    const cTop = { x: cx, y: cy - Rmid }
    const cTR = { x: cx + Rmid, y: cy - Rmid }
    const cRight = { x: cx + Rmid, y: cy }
    const cBR = { x: cx + Rmid, y: cy + Rmid }
    const cBot = { x: cx, y: cy + Rmid }
    const cBL = { x: cx - Rmid, y: cy + Rmid }
    return [
      {
        index: 0,
        path: makePuzzle7PiecePath('tl', bounds),
        center: cTL,
        iconCenter: { x: cTL.x - 17, y: cTL.y },
        numCenter: { x: cTL.x + 17, y: cTL.y },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy - Rmid },
        defaultDot: { x: 190, y: cy - Rmid },
        defaultCard: { x: 35, y: cy - Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout + tabProtrusion },
      },
      {
        index: 1,
        path: makePuzzle7PiecePath('top', bounds),
        center: cTop,
        iconCenter: { x: cTop.x - 17, y: cTop.y },
        numCenter: { x: cTop.x + 17, y: cTop.y },
        isStraight: true,
        cardDirection: 'top',
        lineStart: { x: cx, y: bounds.Yout_T },
        defaultDot: { x: cx, y: bounds.Yout_T - 10 },
        defaultCard: { x: cx - 80, y: 6, width: 160, height: 74 },
        bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 2,
        path: makePuzzle7PiecePath('tr', bounds),
        center: cTR,
        iconCenter: { x: cTR.x, y: cTR.y - 17 },
        numCenter: { x: cTR.x, y: cTR.y + 17 },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: 105 },
        defaultDot: { x: 810, y: 105 },
        defaultCard: { x: 825, y: 70, width: 140, height: 70 },
        bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout - segHalf + tabProtrusion },
      },
      {
        index: 3,
        path: makePuzzle7PiecePath('right', bounds),
        center: cRight,
        iconCenter: { x: cRight.x, y: cRight.y - 17 },
        numCenter: { x: cRight.x, y: cRight.y + 17 },
        isStraight: true,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: cy },
        defaultDot: { x: 810, y: cy },
        defaultCard: { x: 825, y: cy - 35, width: 140, height: 70 },
        bbox: { x: bounds.Xin_R, y: bounds.ycut_TR - tabProtrusion, width: Rin, height: 2 * segHalf + tabProtrusion },
      },
      {
        index: 4,
        path: makePuzzle7PiecePath('br', bounds),
        center: cBR,
        numCenter: { x: cBR.x - 17, y: cBR.y },
        iconCenter: { x: cBR.x + 17, y: cBR.y },
        isStraight: false,
        cardDirection: 'right',
        lineStart: { x: bounds.Xout_R, y: 415 },
        defaultDot: { x: 810, y: 415 },
        defaultCard: { x: 825, y: 380, width: 140, height: 70 },
        bbox: { x: bounds.xcut_BR - tabProtrusion, y: bounds.ycut_BR, width: Rout - segHalf + tabProtrusion, height: Rout - segHalf },
      },
      {
        index: 5,
        path: makePuzzle7PiecePath('bottom', bounds),
        center: cBot,
        numCenter: { x: cBot.x - 17, y: cBot.y },
        iconCenter: { x: cBot.x + 17, y: cBot.y },
        isStraight: true,
        cardDirection: 'bottom',
        lineStart: { x: cx, y: bounds.Yout_B },
        defaultDot: { x: cx, y: bounds.Yout_B + 10 },
        defaultCard: { x: cx - 80, y: 440, width: 160, height: 74 },
        bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: 2 * segHalf + tabProtrusion, height: Rin },
      },
      {
        index: 6,
        path: makePuzzle7PiecePath('bl', bounds),
        center: cBL,
        numCenter: { x: cBL.x, y: cBL.y - 17 },
        iconCenter: { x: cBL.x, y: cBL.y + 17 },
        isStraight: false,
        cardDirection: 'left',
        lineStart: { x: bounds.Xout_L, y: cy + Rmid },
        defaultDot: { x: 190, y: cy + Rmid },
        defaultCard: { x: 35, y: cy + Rmid - 40, width: 140, height: 80 },
        bbox: { x: bounds.Xout_L, y: cy - tabProtrusion, width: Rout - segHalf, height: Rout + tabProtrusion },
      },
    ]
  }

  const cTL = { x: cx - Rmid, y: cy - Rmid }
  const cTop = { x: cx, y: cy - Rmid }
  const cTR = { x: cx + Rmid, y: cy - Rmid }
  const cRight = { x: cx + Rmid, y: cy }
  const cBR = { x: cx + Rmid, y: cy + Rmid }
  const cBot = { x: cx, y: cy + Rmid }
  const cBL = { x: cx - Rmid, y: cy + Rmid }
  const cLeft = { x: cx - Rmid, y: cy }

  return [
    {
      index: 0,
      path: makePuzzle7PiecePath('tl', bounds),
      center: cTL,
      iconCenter: { x: cTL.x - 17, y: cTL.y },
      numCenter: { x: cTL.x + 17, y: cTL.y },
      isStraight: false,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: 105 },
      defaultDot: { x: 190, y: 105 },
      defaultCard: { x: 35, y: 70, width: 140, height: 70 },
      bbox: { x: bounds.Xout_L, y: bounds.Yout_T, width: Rout - segHalf + tabProtrusion, height: Rout - segHalf + tabProtrusion },
    },
    {
      index: 1,
      path: makePuzzle7PiecePath('top', bounds),
      center: cTop,
      iconCenter: { x: cTop.x - 17, y: cTop.y },
      numCenter: { x: cTop.x + 17, y: cTop.y },
      isStraight: true,
      cardDirection: 'top',
      lineStart: { x: cx, y: bounds.Yout_T },
      defaultDot: { x: cx, y: bounds.Yout_T - 10 },
      defaultCard: { x: cx - 80, y: 6, width: 160, height: 74 },
      bbox: { x: bounds.xcut_TL - tabProtrusion, y: bounds.Yout_T, width: 2 * segHalf + tabProtrusion, height: Rin },
    },
    {
      index: 2,
      path: makePuzzle7PiecePath('tr', bounds),
      center: cTR,
      iconCenter: { x: cTR.x, y: cTR.y - 17 },
      numCenter: { x: cTR.x, y: cTR.y + 17 },
      isStraight: false,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: 105 },
      defaultDot: { x: 810, y: 105 },
      defaultCard: { x: 825, y: 70, width: 140, height: 70 },
      bbox: { x: bounds.xcut_TR, y: bounds.Yout_T, width: Rout - segHalf, height: Rout - segHalf + tabProtrusion },
    },
    {
      index: 3,
      path: makePuzzle7PiecePath('right', bounds),
      center: cRight,
      iconCenter: { x: cRight.x, y: cRight.y - 17 },
      numCenter: { x: cRight.x, y: cRight.y + 17 },
      isStraight: true,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: cy },
      defaultDot: { x: 810, y: cy },
      defaultCard: { x: 825, y: cy - 35, width: 140, height: 70 },
      bbox: { x: bounds.Xin_R, y: bounds.ycut_TR - tabProtrusion, width: Rin, height: 2 * segHalf + tabProtrusion },
    },
    {
      index: 4,
      path: makePuzzle7PiecePath('br', bounds),
      center: cBR,
      numCenter: { x: cBR.x - 17, y: cBR.y },
      iconCenter: { x: cBR.x + 17, y: cBR.y },
      isStraight: false,
      cardDirection: 'right',
      lineStart: { x: bounds.Xout_R, y: 415 },
      defaultDot: { x: 810, y: 415 },
      defaultCard: { x: 825, y: 380, width: 140, height: 70 },
      bbox: { x: bounds.xcut_BR - tabProtrusion, y: bounds.ycut_BR, width: Rout - segHalf + tabProtrusion, height: Rout - segHalf },
    },
    {
      index: 5,
      path: makePuzzle7PiecePath('bottom', bounds),
      center: cBot,
      numCenter: { x: cBot.x - 17, y: cBot.y },
      iconCenter: { x: cBot.x + 17, y: cBot.y },
      isStraight: true,
      cardDirection: 'bottom',
      lineStart: { x: cx, y: bounds.Yout_B },
      defaultDot: { x: cx, y: bounds.Yout_B + 10 },
      defaultCard: { x: cx - 80, y: 440, width: 160, height: 74 },
      bbox: { x: bounds.xcut_BL - tabProtrusion, y: bounds.Yin_B, width: 2 * segHalf + tabProtrusion, height: Rin },
    },
    {
      index: 6,
      path: makePuzzle7PiecePath('bl', bounds),
      center: cBL,
      numCenter: { x: cBL.x, y: cBL.y - 17 },
      iconCenter: { x: cBL.x, y: cBL.y + 17 },
      isStraight: false,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: 415 },
      defaultDot: { x: 190, y: 415 },
      defaultCard: { x: 35, y: 380, width: 140, height: 70 },
      bbox: { x: bounds.Xout_L, y: bounds.ycut_BL - tabProtrusion, width: Rout - segHalf, height: Rout - segHalf + tabProtrusion },
    },
    {
      index: 7,
      path: makePuzzle7PiecePath('left', bounds),
      center: cLeft,
      numCenter: { x: cLeft.x, y: cLeft.y - 17 },
      iconCenter: { x: cLeft.x, y: cLeft.y + 17 },
      isStraight: true,
      cardDirection: 'left',
      lineStart: { x: bounds.Xout_L, y: cy },
      defaultDot: { x: 190, y: cy },
      defaultCard: { x: 35, y: cy - 35, width: 140, height: 70 },
      bbox: { x: bounds.Xout_L, y: bounds.ycut_TL - tabProtrusion, width: Rin, height: 2 * segHalf + tabProtrusion },
    },
  ]
}
