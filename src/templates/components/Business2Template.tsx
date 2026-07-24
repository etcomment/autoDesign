import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { CurvedPath } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c', '#1abc9c']

export function Business2Template({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, centerLabel, nodes } = data
  const W = 900
  const H = 600
  const cx = W / 2
  const hubY = 100
  const hubR = 40
  const nodeW = 150
  const nodeH = 50
  const count = Math.min(nodes.length, 6)
  const fanRadius = 220
  const startAngle = Math.PI * 0.15
  const endAngle = Math.PI * 0.85

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={cx} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <circle cx={cx} cy={hubY} r={hubR} fill="#1a1a2e" />
      <text x={cx} y={hubY + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
        {centerLabel.length > 12 ? centerLabel.slice(0, 10) + '...' : centerLabel}
      </text>

      {nodes.slice(0, count).map((node, i) => {
        const elementId = `node-${i}`
        const ratio = count > 1 ? i / (count - 1) : 0.5
        const angle = startAngle + ratio * (endAngle - startAngle)
        const nx = cx + fanRadius * Math.cos(angle)
        const ny = hubY + fanRadius * Math.sin(angle)
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const boxX = nx - nodeW / 2
        const boxY = ny - nodeH / 2
        const visualRect = { x: boxX, y: boxY, width: nodeW, height: nodeH }

        const edgeX = cx
        const edgeY = hubY + hubR

        return (
          <g key={i}>
            <CurvedPath
              points={[{ x: edgeX, y: edgeY }, { x: nx, y: ny }]}
              color={color}
              strokeWidth={2}
            />
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={boxX} y={boxY} width={nodeW} height={nodeH} rx={8} fill={color} opacity={0.15} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 2} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={nx} y={ny + 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">
                {node.title.length > 18 ? node.title.slice(0, 16) + '...' : node.title}
              </text>
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}
