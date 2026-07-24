import { useRef, type ReactElement } from 'react'
import type { IcebergData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#3a7bc8', '#1a5ca6', '#0d4d95']

function wavePath(W: number, waterY: number, H?: number): string {
  const a = 12, f1 = 0.025, f2 = 0.06
  const pts: string[] = []
  for (let x = 0; x <= W; x += 4) {
    const y = waterY + Math.sin(x * f1) * a + Math.sin(x * f2 + 1) * (a * 0.35)
    pts.push(`${x} ${y.toFixed(1)}`)
  }
  const d = `M 0 ${waterY} L ${pts.join(' L ')}`
  return H !== undefined ? `${d} L ${W} ${H} L 0 ${H} Z` : d
}

export function Iceberg2Template({ data }: { data: IcebergData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)

  const { title, sections } = data
  const W = 600
  const H = 700
  const waterY = 280
  const cx = W / 2
  const above = sections.filter(s => s.isAbove)
  const below = sections.filter(s => !s.isAbove)
  const aboveW = 300
  const aboveH = 70
  const aboveX = (W - aboveW) / 2

  return (
    <g ref={svgRef}>
      <defs>
        <linearGradient id="waterGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5db9e8" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#083d7a" stopOpacity={0.9} />
        </linearGradient>
      </defs>

      <rect width={W} height={waterY} fill="#e3f2fd" />
      <rect y={waterY} width={W} height={H - waterY} fill="#0f2b46" />

      <path d={wavePath(W, waterY, H)} fill="url(#waterGrad2)" />
      <path d={wavePath(W, waterY)} fill="none" stroke="#5db9e8" strokeWidth={3} opacity={0.9} />
      {title && (
        <text x={cx} y={44} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">{title}</text>
      )}
      {above.length > 0 && above.map((section, i) => {
        const si = sections.indexOf(section)
        const elementId = `section-${si}`
        const color = tplColors[elementId] ?? PALETTE[si % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const py = 60 + i * 80
        const vr = { x: aboveX, y: py, width: aboveW, height: aboveH }
        return (
          <g key={'above-' + i} onMouseDown={e => startDrag(e, elementId, vr)} style={{ cursor: 'pointer' }}>
            <rect x={aboveX} y={py} width={aboveW} height={aboveH} rx={8} fill={color} opacity={0.85} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3 : 0} />
            <text x={aboveX + 20} y={py + aboveH / 2 + 6} fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="white">{section.title}</text>
            {section.subtitle && (
              <text x={aboveX + aboveW - 20} y={py + aboveH / 2 + 6} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.8)">{section.subtitle}</text>
            )}
            {isSelected && renderHandles(vr, elementId)}
          </g>
        )
      })}
      <text x={cx} y={waterY - 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="#4a90d9">
        Surface
      </text>
      {below.map((section, i) => {
        const si = sections.indexOf(section)
        const elementId = `section-${si}`
        const color = tplColors[elementId] ?? PALETTE[(si + 1) % PALETTE.length]!
        const stroke = tplStrokeColors[elementId] || color
        const isSelected = selectedIds.has(elementId)
        const baseW = 260 + i * 70, baseH = 56
        const px = (W - baseW) / 2, py = waterY + 30 + i * 70
        const vr = { x: px, y: py, width: baseW, height: baseH }
        return (
          <g key={'below-' + i} onMouseDown={e => startDrag(e, elementId, vr)} style={{ cursor: 'pointer' }}>
            <rect x={px} y={py} width={baseW} height={baseH} rx={7} fill={color} opacity={0.88} stroke={isSelected ? '#4a90d9' : stroke} strokeWidth={isSelected ? 3 : 0} />
            <text x={px + 16} y={py + baseH / 2 + 5} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={700} fill="white">{section.title}</text>
            {section.subtitle && (
              <text x={px + baseW - 16} y={py + baseH / 2 + 5} textAnchor="end" fontFamily="Arial, sans-serif" fontSize={11} fill="rgba(255,255,255,0.8)">{section.subtitle}</text>
            )}
            {isSelected && renderHandles(vr, elementId)}
          </g>
        )
      })}
    </g>
  )
}
