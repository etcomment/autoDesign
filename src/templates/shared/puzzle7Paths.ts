import { PUZZLE2_TAB_BEZIERS } from '../components/Puzzle4Template'

export interface PiecePathBounds {
  Xout_L: number
  Xout_R: number
  Yout_T: number
  Yout_B: number
  Xin_L: number
  Xin_R: number
  Yin_T: number
  Yin_B: number
  xcut_TL: number
  xcut_TR: number
  xcut_BR: number
  xcut_BL: number
  ycut_TL: number
  ycut_TR: number
  ycut_BR: number
  ycut_BL: number
  rOutCorner: number
  rInCorner: number
  scaleU: number
  scaleV: number
  baseHalf: number
}

export function appendEdgeWithTab(
  d: string[],
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  kind: 'straight' | 'tab' | 'indent',
  scaleU: number,
  scaleV: number,
  baseHalf: number,
): void {
  if (kind === 'straight') {
    d.push(`L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`)
    return
  }

  const dx = p2.x - p1.x
  const dy = p2.y - p1.y
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  const nx = uy
  const ny = -ux

  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2

  const sx = mx - baseHalf * ux
  const sy = my - baseHalf * uy
  d.push(`L ${sx.toFixed(2)} ${sy.toFixed(2)}`)

  const sign = kind === 'tab' ? 1 : -1

  for (const [cp1u, cp1v, cp2u, cp2v, endu, endv] of PUZZLE2_TAB_BEZIERS) {
    const cp1x = mx + cp1u * scaleU * ux + sign * (cp1v * scaleV) * nx
    const cp1y = my + cp1u * scaleU * uy + sign * (cp1v * scaleV) * ny
    const cp2x = mx + cp2u * scaleU * ux + sign * (cp2v * scaleV) * nx
    const cp2y = my + cp2u * scaleU * uy + sign * (cp2v * scaleV) * ny
    const pex = mx + endu * scaleU * ux + sign * (endv * scaleV) * nx
    const pey = my + endu * scaleU * uy + sign * (endv * scaleV) * ny
    d.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${pex.toFixed(2)} ${pey.toFixed(2)}`)
  }

  d.push(`L ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`)
}

export function makePuzzle7PiecePath(
  orientation: 'tl' | 'tr' | 'br' | 'bl' | 'top' | 'right' | 'bottom' | 'left' | 'half_left' | 'half_right',
  b: PiecePathBounds,
): string {
  const d: string[] = []

  if (orientation === 'tl') {
    d.push(`M ${b.Xout_L.toFixed(2)} ${b.ycut_TL.toFixed(2)}`)
    d.push(`L ${b.Xout_L.toFixed(2)} ${(b.Yout_T + b.rOutCorner).toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${(b.Xout_L + b.rOutCorner).toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`L ${b.xcut_TL.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_TL, y: b.Yout_T }, { x: b.xcut_TL, y: b.Yin_T }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${(b.Xin_L + b.rInCorner).toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${b.Xin_L.toFixed(2)} ${(b.Yin_T + b.rInCorner).toFixed(2)}`)
    d.push(`L ${b.Xin_L.toFixed(2)} ${b.ycut_TL.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xin_L, y: b.ycut_TL }, { x: b.Xout_L, y: b.ycut_TL }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'tr') {
    d.push(`M ${b.xcut_TR.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`L ${(b.Xout_R - b.rOutCorner).toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${b.Xout_R.toFixed(2)} ${(b.Yout_T + b.rOutCorner).toFixed(2)}`)
    d.push(`L ${b.Xout_R.toFixed(2)} ${b.ycut_TR.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xout_R, y: b.ycut_TR }, { x: b.Xin_R, y: b.ycut_TR }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${b.Xin_R.toFixed(2)} ${(b.Yin_T + b.rInCorner).toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${(b.Xin_R - b.rInCorner).toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    d.push(`L ${b.xcut_TR.toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_TR, y: b.Yin_T }, { x: b.xcut_TR, y: b.Yout_T }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'br') {
    d.push(`M ${b.Xout_R.toFixed(2)} ${b.ycut_BR.toFixed(2)}`)
    d.push(`L ${b.Xout_R.toFixed(2)} ${(b.Yout_B - b.rOutCorner).toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${(b.Xout_R - b.rOutCorner).toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    d.push(`L ${b.xcut_BR.toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_BR, y: b.Yout_B }, { x: b.xcut_BR, y: b.Yin_B }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${(b.Xin_R - b.rInCorner).toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${b.Xin_R.toFixed(2)} ${(b.Yin_B - b.rInCorner).toFixed(2)}`)
    d.push(`L ${b.Xin_R.toFixed(2)} ${b.ycut_BR.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xin_R, y: b.ycut_BR }, { x: b.Xout_R, y: b.ycut_BR }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'bl') {
    d.push(`M ${b.xcut_BL.toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    d.push(`L ${(b.Xout_L + b.rOutCorner).toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${b.Xout_L.toFixed(2)} ${(b.Yout_B - b.rOutCorner).toFixed(2)}`)
    d.push(`L ${b.Xout_L.toFixed(2)} ${b.ycut_BL.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xout_L, y: b.ycut_BL }, { x: b.Xin_L, y: b.ycut_BL }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${b.Xin_L.toFixed(2)} ${(b.Yin_B - b.rInCorner).toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${(b.Xin_L + b.rInCorner).toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    d.push(`L ${b.xcut_BL.toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_BL, y: b.Yin_B }, { x: b.xcut_BL, y: b.Yout_B }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'top') {
    d.push(`M ${b.xcut_TL.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`L ${b.xcut_TR.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_TR, y: b.Yout_T }, { x: b.xcut_TR, y: b.Yin_T }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${b.xcut_TL.toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_TL, y: b.Yin_T }, { x: b.xcut_TL, y: b.Yout_T }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'right') {
    d.push(`M ${b.Xout_R.toFixed(2)} ${b.ycut_TR.toFixed(2)}`)
    d.push(`L ${b.Xout_R.toFixed(2)} ${b.ycut_BR.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xout_R, y: b.ycut_BR }, { x: b.Xin_R, y: b.ycut_BR }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${b.Xin_R.toFixed(2)} ${b.ycut_TR.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xin_R, y: b.ycut_TR }, { x: b.Xout_R, y: b.ycut_TR }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'bottom') {
    d.push(`M ${b.xcut_BR.toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    d.push(`L ${b.xcut_BL.toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_BL, y: b.Yout_B }, { x: b.xcut_BL, y: b.Yin_B }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${b.xcut_BR.toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.xcut_BR, y: b.Yin_B }, { x: b.xcut_BR, y: b.Yout_B }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'left') {
    d.push(`M ${b.Xout_L.toFixed(2)} ${b.ycut_BL.toFixed(2)}`)
    d.push(`L ${b.Xout_L.toFixed(2)} ${b.ycut_TL.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xout_L, y: b.ycut_TL }, { x: b.Xin_L, y: b.ycut_TL }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${b.Xin_L.toFixed(2)} ${b.ycut_BL.toFixed(2)}`)
    appendEdgeWithTab(d, { x: b.Xin_L, y: b.ycut_BL }, { x: b.Xout_L, y: b.ycut_BL }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'half_left') {
    const cx = (b.Xout_L + b.Xout_R) / 2
    d.push(`M ${cx.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`L ${(b.Xout_L + b.rOutCorner).toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${b.Xout_L.toFixed(2)} ${(b.Yout_T + b.rOutCorner).toFixed(2)}`)
    d.push(`L ${b.Xout_L.toFixed(2)} ${(b.Yout_B - b.rOutCorner).toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${(b.Xout_L + b.rOutCorner).toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    appendEdgeWithTab(d, { x: cx, y: b.Yout_B }, { x: cx, y: b.Yin_B }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${(b.Xin_L + b.rInCorner).toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${b.Xin_L.toFixed(2)} ${(b.Yin_B - b.rInCorner).toFixed(2)}`)
    d.push(`L ${b.Xin_L.toFixed(2)} ${(b.Yin_T + b.rInCorner).toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${(b.Xin_L + b.rInCorner).toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    appendEdgeWithTab(d, { x: cx, y: b.Yin_T }, { x: cx, y: b.Yout_T }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push('Z')
  } else if (orientation === 'half_right') {
    const cx = (b.Xout_L + b.Xout_R) / 2
    d.push(`M ${cx.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    appendEdgeWithTab(d, { x: cx, y: b.Yout_T }, { x: cx, y: b.Yin_T }, 'indent', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${(b.Xin_R - b.rInCorner).toFixed(2)} ${b.Yin_T.toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${b.Xin_R.toFixed(2)} ${(b.Yin_T + b.rInCorner).toFixed(2)}`)
    d.push(`L ${b.Xin_R.toFixed(2)} ${(b.Yin_B - b.rInCorner).toFixed(2)}`)
    d.push(`A ${b.rInCorner} ${b.rInCorner} 0 0 0 ${(b.Xin_R - b.rInCorner).toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${b.Yin_B.toFixed(2)}`)
    appendEdgeWithTab(d, { x: cx, y: b.Yin_B }, { x: cx, y: b.Yout_B }, 'tab', b.scaleU, b.scaleV, b.baseHalf)
    d.push(`L ${(b.Xout_R - b.rOutCorner).toFixed(2)} ${b.Yout_B.toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${b.Xout_R.toFixed(2)} ${(b.Yout_B - b.rOutCorner).toFixed(2)}`)
    d.push(`L ${b.Xout_R.toFixed(2)} ${(b.Yout_T + b.rOutCorner).toFixed(2)}`)
    d.push(`A ${b.rOutCorner} ${b.rOutCorner} 0 0 1 ${(b.Xout_R - b.rOutCorner).toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push(`L ${cx.toFixed(2)} ${b.Yout_T.toFixed(2)}`)
    d.push('Z')
  }

  return d.join(' ')
}
