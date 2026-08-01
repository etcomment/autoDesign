import { useRef, type ReactElement } from 'react'
import type { BrainData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { HEAD_PATH } from '../shared/headPath'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

function getDynamicIcon(iconName?: string) {
  if (!iconName) return null
  const clean = iconName.trim()

  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const LucideFn = (LucideIcons as Record<string, any>)[pascalName] || (LucideIcons as Record<string, any>)[clean] || (LucideIcons as Record<string, any>)[clean.toUpperCase()]
  if (LucideFn) {
    return (props: { size?: number; color?: string }) => <LucideFn size={props.size ?? 28} color={props.color ?? 'white'} />
  }

  return null
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function getArcSlicePath(cx: number, cy: number, R: number, r: number, sDeg: number, eDeg: number, isFirst: boolean, isLast: boolean) {
  const lg = eDeg - sDeg > 180 ? 1 : 0

  if (isFirst) {
    const tip = polarToCartesian(cx, cy, (R + r) / 2, sDeg - 6)
    const b = polarToCartesian(cx, cy, R, sDeg + 1)
    const a = polarToCartesian(cx, cy, R, eDeg)
    const c = polarToCartesian(cx, cy, r, eDeg)
    const d = polarToCartesian(cx, cy, r, sDeg + 1)
    return `M ${a.x} ${a.y} A ${R} ${R} 0 ${lg} 0 ${b.x} ${b.y} L ${tip.x} ${tip.y} L ${d.x} ${d.y} A ${r} ${r} 0 ${lg} 1 ${c.x} ${c.y} Z`
  }

  if (isLast) {
    const tip = polarToCartesian(cx, cy, (R + r) / 2, eDeg + 6)
    const a = polarToCartesian(cx, cy, R, eDeg - 1)
    const b = polarToCartesian(cx, cy, R, sDeg)
    const d = polarToCartesian(cx, cy, r, sDeg)
    const c = polarToCartesian(cx, cy, r, eDeg - 1)
    return `M ${a.x} ${a.y} L ${tip.x} ${tip.y} L ${c.x} ${c.y} A ${r} ${r} 0 ${lg} 0 ${d.x} ${d.y} L ${b.x} ${b.y} A ${R} ${R} 0 ${lg} 1 ${a.x} ${a.y} Z`
  }

  const a = polarToCartesian(cx, cy, R, eDeg)
  const b = polarToCartesian(cx, cy, R, sDeg)
  const c = polarToCartesian(cx, cy, r, eDeg)
  const d = polarToCartesian(cx, cy, r, sDeg)
  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${lg} 0 ${b.x} ${b.y} L ${d.x} ${d.y} A ${r} ${r} 0 ${lg} 1 ${c.x} ${c.y} Z`
}

const DEFAULT_COLORS = ['#282a5d', '#3365cc', '#ff4d38', '#ffb900', '#52c49c', '#ee6d90']
const DEFAULT_ICONS = ['wrench', 'lightbulb', 'zap', 'git-branch', 'target', 'mouse-pointer']

export function Brain2Template({ data }: { data: BrainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const headId = 'head'
  const headDef = { x: 330, y: 220, width: 240, height: 320 }
  const headPos = positions[headId]
  const headBbox = {
    x: headPos?.x ?? headDef.x,
    y: headPos?.y ?? headDef.y,
    width: headPos?.width ?? headDef.width,
    height: headPos?.height ?? headDef.height,
  }
  const isHeadSelected = selectedIds.has(headId)

  // Arch center and radii in Canvas coordinates
  const sCX = 450
  const sCY = 430
  const R = 350
  const r = 205

  const branches = data.branches.length > 0 ? data.branches : [
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'wrench', color: '#282a5d' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'lightbulb', color: '#3365cc' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'zap', color: '#ff4d38' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'git-branch', color: '#ffb900' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'target', color: '#52c49c' },
    { title: 'MIGSO-PCUBED', subtitle: 'content', icon: 'mouse-pointer', color: '#ee6d90' },
  ]

  const count = Math.max(1, branches.length)
  const startAngle = 196
  const endAngle = 344
  const totalSpan = endAngle - startAngle
  const step = totalSpan / count
  const gap = count > 1 ? 2.5 : 0

  return (
    <g ref={svgRef}>
      {/* 1. Arch Slices (Interactive) */}
      {branches.map((branch, i) => {
        const id = `arc-${i}`
        const color = tplColors[id] ?? branch.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]!
        const isSelected = selectedIds.has(id)

        const sDeg = startAngle + i * step + gap / 2
        const eDeg = startAngle + (i + 1) * step - gap / 2
        const midA = (sDeg + eDeg) / 2

        const pathD = getArcSlicePath(sCX, sCY, R, r, sDeg, eDeg, i === 0, i === count - 1)

        // Mid point of slice for text and icon positioning
        const ptIcon = polarToCartesian(sCX, sCY, r + (R - r) * 0.78, midA)
        const ptText = polarToCartesian(sCX, sCY, r + (R - r) * 0.48, midA)
        const ptNum = polarToCartesian(sCX, sCY, r + (R - r) * 0.20, midA)

        const aDef = { x: ptText.x - 50, y: ptText.y - 50, width: 100, height: 100 }
        const aPos = positions[id]
        const aBbox = {
          x: aPos?.x ?? aDef.x,
          y: aPos?.y ?? aDef.y,
          width: aPos?.width ?? aDef.width,
          height: aPos?.height ?? aDef.height,
        }

        const iconKey = branch.icon ?? DEFAULT_ICONS[i % DEFAULT_ICONS.length]
        const IconFn = getDynamicIcon(iconKey)

        return (
          <g key={id} onMouseDown={e => startDrag(e, id, aBbox)} transform={getTransform(id, aBbox)} style={{ cursor: 'pointer' }}>
            <path
              d={pathD}
              fill={color}
              opacity={isSelected ? 0.88 : 1}
              stroke={isSelected ? '#4a90d9' : 'none'}
              strokeWidth={isSelected ? 3 : 0}
            />

            {/* Icon near outer radius */}
            {IconFn && (
              <g transform={`translate(${ptIcon.x - 14}, ${ptIcon.y - 14})`}>
                <IconFn size={28} color="#ffffff" />
              </g>
            )}

            {/* Title & Subtitle centered horizontally in middle of slice */}
            <text
              x={ptText.x}
              y={ptText.y - 6}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={13}
              fontWeight={700}
              fill="#ffffff"
            >
              {branch.title}
            </text>
            <text
              x={ptText.x}
              y={ptText.y + 12}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={400}
              fill="#ffffff"
              opacity={0.9}
            >
              {branch.subtitle ?? `content`}
            </text>

            {/* Big bold number near inner radius */}
            <text
              x={ptNum.x}
              y={ptNum.y + 7}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={22}
              fontWeight={900}
              fill="#ffffff"
            >
              {i + 1}
            </text>

            {isSelected && renderHandles(aBbox, id)}
          </g>
        )
      })}

      {/* 2. Central Head Silhouette (Interactive) */}
      <g
        transform={getTransform(headId, headBbox)}
        style={{ cursor: 'pointer' }}
        onMouseDown={e => startDrag(e, headId, headBbox)}
      >
        <path
          d={HEAD_PATH}
          transform={`translate(${headBbox.x},${headBbox.y}) scale(${headBbox.width / 300},${headBbox.height / 420})`}
          fill="#111319"
          stroke={isHeadSelected ? '#4a90d9' : 'none'}
          strokeWidth={isHeadSelected ? 3 : 0}
        />

        {/* Lightbulb with horizontal arrows icon inside head */}
        <g transform={`translate(${headBbox.x + headBbox.width * 0.31}, ${headBbox.y + headBbox.height * 0.28})`}>
          {/* Lightbulb contour */}
          <path
            d="M 25 5 C 14 5 5 14 5 25 C 5 32 8 38 14 42 L 14 50 L 36 50 L 36 42 C 42 38 45 32 45 25 C 45 14 36 5 25 5 Z"
            fill="none"
            stroke="#d1d5db"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lightbulb base lines */}
          <line x1={17} y1={55} x2={33} y2={55} stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" />
          <line x1={20} y1={60} x2={30} y2={60} stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" />

          {/* Top Arrow pointing left */}
          <path d="M 34 20 L 14 20 M 20 14 L 14 20 L 20 26" stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          {/* Bottom Arrow pointing right */}
          <path d="M 16 32 L 36 32 M 30 26 L 36 32 L 30 38" stroke="#d1d5db" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {isHeadSelected && renderHandles(headBbox, headId)}
      </g>
    </g>
  )
}