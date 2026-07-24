import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c', '#f39c12', '#3498db']

export function Business7Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, centerLabel, nodes } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const cy = H / 2 + 30
  const hubR = 42
  const orbitR = 180
  const nodeW = 120
  const nodeH = 40
  const count = Math.min(nodes.length, 8)

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={cy} r={hubR} fill="#1a1a2e" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
        {centerLabel.length > 10 ? centerLabel.slice(0, 8) + '..' : centerLabel}
      </text>

      {nodes.slice(0, count).map((node, i) => {
        const elementId = `node-${i}`
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2
        const nx = cx + orbitR * Math.cos(angle)
        const ny = cy + orbitR * Math.sin(angle)
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const boxX = nx - nodeW / 2
        const boxY = ny - nodeH / 2
        const visualRect = { x: boxX, y: boxY, width: nodeW, height: nodeH }

        const dx = nx - cx
        const dy = ny - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const edgeX = cx + (dx / dist) * hubR
        const edgeY = cy + (dy / dist) * hubR

        return (
          <g key={i}>
            <line x1={edgeX} y1={edgeY} x2={nx - (dx / dist) * (nodeW / 2)} y2={ny - (dy / dist) * (nodeH / 2)} stroke={color} strokeWidth={1.5} opacity={0.5} />
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={boxX} y={boxY} width={nodeW} height={nodeH} rx={8} fill="white" stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1.5} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={nx} y={ny + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={600} fill="#333">
                {node.title.length > 14 ? node.title.slice(0, 12) + '..' : node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
