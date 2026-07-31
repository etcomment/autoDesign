import { useRef, type ReactElement } from 'react'
import type { BudgetData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

export function Budget4Template({ data }: { data: BudgetData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const items = data.items && data.items.length > 0 ? data.items : [
    { label: 'Initial', percentage: 100, amount: '€100,000' },
    { label: 'R&D', percentage: -30, amount: '-€30,000' },
    { label: 'Sales', percentage: +20, amount: '+€20,000' },
    { label: 'Final', percentage: 90, amount: '€90,000' },
  ]

  const count = Math.max(1, items.length)
  const W = 900
  const startX = 60
  const availableW = W - startX * 2
  const barW = Math.min(80, (availableW - (count - 1) * 16) / count)
  const gap = count > 1 ? Math.min(32, (availableW - count * barW) / (count - 1)) : 32
  const baselineY = 400
  const maxH = 240

  let currentLevel = 0

  return (
    <g ref={svgRef}>
      {/* Baseline */}
      <line x1={startX - 20} y1={baselineY} x2={W - startX + 20} y2={baselineY} stroke="#e2e8f0" strokeWidth={2} />

      {/* Dynamic connector lines connecting waterfall bars */}
      {items.map((_, i) => {
        if (i === 0) return null
        const prevId = `item-${i - 1}`
        const curId = `item-${i}`

        const prevPos = positions[prevId]
        const curPos = positions[curId]

        const defaultPrevX = startX + (i - 1) * (barW + gap)
        const defaultCurX = startX + i * (barW + gap)

        const x1 = (prevPos?.x ?? defaultPrevX) + (prevPos?.width ?? barW)
        const y1 = (prevPos?.y ?? baselineY - 100) + (prevPos?.height ?? 100) / 2

        const x2 = curPos?.x ?? defaultCurX
        const y2 = (curPos?.y ?? baselineY - 100) + (curPos?.height ?? 100) / 2

        return (
          <line
            key={`conn-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#cbd5e0"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        )
      })}

      {/* Waterfall Bars */}
      {items.map((item, i) => {
        const elementId = `item-${i}`
        const defaultColor = item.percentage >= 0 ? MIGSO_PALETTE[i % MIGSO_PALETTE.length]! : '#e53e3e'
        const color = tplColors[elementId] ?? item.color ?? defaultColor
        const isSelected = selectedIds.has(elementId)

        const isTotal = i === 0 || i === items.length - 1
        const val = item.percentage
        const h = Math.max(24, (Math.abs(val) / 100) * maxH)

        let barY = baselineY - h
        if (!isTotal) {
          if (val >= 0) {
            barY = baselineY - (currentLevel + val) * (maxH / 100)
            currentLevel += val
          } else {
            barY = baselineY - currentLevel * (maxH / 100)
            currentLevel += val
          }
        } else {
          currentLevel = val
        }

        const bx = startX + i * (barW + gap)
        const defaultBbox = { x: bx, y: barY, width: barW, height: h }

        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        return (
          <g
            key={elementId}
            onMouseDown={e => startDrag(e, elementId, bbox)}
            transform={getTransform(elementId, bbox)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x={bbox.x}
              y={bbox.y}
              width={bbox.width}
              height={bbox.height}
              rx={6}
              fill={color}
              opacity={0.9}
              stroke={isSelected ? '#4a90d9' : color}
              strokeWidth={isSelected ? 2.5 : 0}
            />

            {/* Amount above bar */}
            <text
              x={bbox.x + bbox.width / 2}
              y={bbox.y - 8}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fontWeight={700}
              fill={color}
            >
              {item.amount}
            </text>

            {/* Label below baseline */}
            <text
              x={bbox.x + bbox.width / 2}
              y={baselineY + 24}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fontWeight={600}
              fill="#4a5568"
            >
              {item.label}
            </text>

            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })}
    </g>
  )
}