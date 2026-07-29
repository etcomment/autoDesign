import type { ReactElement } from 'react'

export function wrapTextByWidth(text: string, maxCharPerLine: number = 35): string[] {
  if (!text) return [];
  const charsPerLine = Math.max(10, Math.floor(maxCharPerLine));
  return text.split('\n').flatMap((line: string) => {
    if (line.length <= charsPerLine) return [line];
    const words = line.split(' ');
    const res: string[] = [];
    let current = '';
    words.forEach((w: string) => {
      if ((current + (current ? ' ' : '') + w).length > charsPerLine) {
        if (current) res.push(current);
        current = w;
      } else {
        current = current ? current + ' ' + w : w;
      }
    });
    if (current) res.push(current);
    return res;
  });
}

export function renderMultiLineText(text: string, x: number, y: number, props: any) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <text x={x} y={y} {...props}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : '1.2em'}>{line}</tspan>
      ))}
    </text>
  );
}

export interface ArrowProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  color?: string
  dashed?: boolean
  thick?: boolean
}

export function Arrow({ from, to, color = '#666', dashed, thick }: ArrowProps): ReactElement {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={thick ? 3 : 1.5}
        strokeDasharray={dashed ? '6 3' : undefined}
      />
      <polygon
        points={`-10,-5 0,0 -10,5`}
        fill={color}
        transform={`translate(${to.x},${to.y}) rotate(${angle})`}
      />
    </g>
  )
}

export interface ChevronArrowProps {
  x: number
  y: number
  width: number
  height: number
  fill?: string
  label?: string
}

export function ChevronArrow({ x, y, width, height, fill = '#4a90d9', label }: ChevronArrowProps): ReactElement {
  const h = height
  const w = width
  const arrowW = 12
  return (
    <g>
      <path
        d={`M ${x} ${y} L ${x + w - arrowW} ${y} L ${x + w} ${y + h / 2} L ${x + w - arrowW} ${y + h} L ${x} ${y + h} L ${x + arrowW} ${y + h / 2} Z`}
        fill={fill}
        stroke={fill}
        strokeWidth={0.5}
      />
      {label && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 4}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={11}
          fill="white"
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  )
}

export interface CircleBadgeProps {
  cx: number
  cy: number
  r: number
  fill?: string
  label?: string
  fontSize?: number
}

export function CircleBadge({ cx, cy, r, fill = '#4a90d9', label, fontSize = 14 }: CircleBadgeProps): ReactElement {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {label && (
        <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={fontSize} fill="white" fontWeight={700}>
          {label}
        </text>
      )}
    </g>
  )
}

export interface CurvedPathProps {
  points: { x: number; y: number }[]
  color?: string
  strokeWidth?: number
  strokeDasharray?: string
}

export function CurvedPath({ points, color = '#666', strokeWidth = 2, strokeDasharray }: CurvedPathProps): ReactElement {
  if (points.length < 2) return <g />
  const d = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = points[i - 1]!
    const cpx = (prev.x + p.x) / 2
    return `Q ${cpx} ${prev.y} ${(prev.x + p.x) / 2} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`
  }).join(' ')
  return <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} />
}

export function parseNodePercent(node: unknown, fallbackRatio: number = 0.5): { ratio: number; percentStr: string; numValue: number } {
  if (!node) {
    const pct = Math.round(fallbackRatio * 100)
    return { ratio: fallbackRatio, percentStr: `${pct}%`, numValue: pct }
  }

  let raw: any = node
  if (typeof node === 'object' && node !== null) {
    const obj = node as Record<string, any>
    if (obj.percent !== undefined) raw = obj.percent
    else if (obj.pct !== undefined) raw = obj.pct
    else if (obj.value !== undefined) raw = obj.value
    else if (obj.val !== undefined) raw = obj.val
    else if (obj.ratio !== undefined) raw = obj.ratio
    else if (obj.amount !== undefined) raw = obj.amount
    else if (obj.title !== undefined && typeof obj.title === 'string' && (obj.title.includes('%') || /^\d+$/.test(obj.title.trim()))) raw = obj.title
    else raw = obj.subtitle ?? obj.text ?? ''
  }

  if (typeof raw === 'number') {
    const ratio = raw > 1 ? Math.min(1, Math.max(0, raw / 100)) : Math.min(1, Math.max(0, raw))
    const pct = Math.round(ratio * 100)
    return { ratio, percentStr: `${pct}%`, numValue: pct }
  }

  if (typeof raw === 'string') {
    const matchPct = raw.match(/(\d+(?:\.\d+)?)\s*%/)
    if (matchPct && matchPct[1]) {
      const val = parseFloat(matchPct[1])
      const ratio = Math.min(1, Math.max(0, val / 100))
      const pct = Math.round(val)
      return { ratio, percentStr: `${pct}%`, numValue: val }
    }
    const matchNum = raw.match(/(\d+(?:\.\d+)?)/)
    if (matchNum && matchNum[1]) {
      const val = parseFloat(matchNum[1])
      const ratio = val > 1 ? Math.min(1, Math.max(0, val / 100)) : Math.min(1, Math.max(0, val))
      const pct = Math.round(ratio * 100)
      return { ratio, percentStr: raw.trim().endsWith('%') ? raw.trim() : `${Math.round(val)}%`, numValue: val }
    }
  }

  const pct = Math.round(fallbackRatio * 100)
  return { ratio: fallbackRatio, percentStr: `${pct}%`, numValue: pct }
}

