import { useRef, type ReactElement } from 'react'
import type { ValueChainData } from '../types'
import { Arrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c']
const SUPPORT_PALETTE = ['#8eacbb', '#9db5c4', '#acbdcb', '#bbc6d2', '#cad0d9']

export function ValueChainTemplate({ data }: { data: ValueChainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const pos = useTemplateStore(s => s.templateElementPositions) // Retrieve positions

  // Helper function to get current element position or fallback to initial position
  const getRect = (id: string, fallback: {x: number, y: number, width: number, height: number}) => pos[id] || fallback;

  const { title, primary, support } = data
  const W = 1000
  const startX = 60
  const primaryW = (W - startX * 2) / Math.max(primary.length, 1)
  const primaryH = 80
  const primaryY = 120
  const chevronArrow = 14

  const supportW = (W - startX * 2) / Math.max(support.length, 1)
  const supportH = 50
  const supportY = 320

  return (
    <g ref={svgRef}>
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#222">
          {title}
        </text>
      )}

      <text x={startX} y={primaryY - 10} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888">
        PRIMARY ACTIVITIES
      </text>

      {primary.map((act, i) => {
        const elementId = `primary-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const bx = startX + i * primaryW
        const aw = primaryW - 4
        const ah = primaryH
        // This visualRect is the initial position and size for the draggable element
        const visualRect = { x: bx, y: primaryY, width: primaryW, height: primaryH }

        return (
          <g key={`p-${i}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <path
                d={`M ${bx + 2} ${primaryY} L ${bx + aw - chevronArrow} ${primaryY} L ${bx + aw} ${primaryY + ah / 2} L ${bx + aw - chevronArrow} ${primaryY + ah} L ${bx + 2} ${primaryY + ah} L ${bx + chevronArrow + 2} ${primaryY + ah / 2} Z`}
                fill={color}
                opacity={isSelected ? 1 : 0.85}
                stroke={isSelected ? '#4a90d9' : undefined}
                strokeWidth={isSelected ? 2.5 : undefined}
              />
              <text x={bx + primaryW / 2} y={primaryY + ah / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {act.title}
              </text>
              {act.subtitle && (
                <text x={bx + primaryW / 2} y={primaryY + ah / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="rgba(255,255,255,0.8)">
                  {act.subtitle.length > 28 ? act.subtitle.slice(0, 26) + '..' : act.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <text x={startX} y={supportY - 10} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888">
        SUPPORT ACTIVITIES
      </text>

      {support.map((act, i) => {
        const elementId = `support-${i}`
        const color = tplColors[elementId] ?? SUPPORT_PALETTE[i % SUPPORT_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const bx = startX + i * supportW
        const aw = supportW - 4
        // This visualRect is the initial position and size for the draggable element
        const visualRect = { x: bx + 2, y: supportY, width: aw, height: supportH }

        return (
          <g key={`s-${i}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, visualRect)} transform={getTransform(elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={bx + 2} y={supportY} width={aw} height={supportH} rx={6} fill={color} opacity={isSelected ? 0.9 : 0.75} stroke={isSelected ? '#4a90d9' : color} strokeWidth={isSelected ? 2.5 : 1} strokeDasharray={isSelected ? '4 2' : undefined} />
              <text x={bx + supportW / 2} y={supportY + supportH / 2 - 5} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={11} fontWeight={700} fill="white">
                {act.title}
              </text>
              {act.subtitle && (
                <text x={bx + supportW / 2} y={supportY + supportH / 2 + 12} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={8} fill="rgba(255,255,255,0.75)">
                  {act.subtitle.length > 30 ? act.subtitle.slice(0, 28) + '..' : act.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      {/* Arrows aligned with primary activities, connecting the bottom of the support lane to the top of the primary activity */}
      {primary.map((_, i) => {
        const primaryElementId = `primary-${i}`
        // Initial visual rect for primary activity (used as fallback)
        const primaryInitialRect = { x: startX + i * primaryW, y: primaryY, width: primaryW, height: primaryH }
        const currentPrimaryRect = getRect(primaryElementId, primaryInitialRect)

        const fromX = currentPrimaryRect.x + currentPrimaryRect.width / 2
        const fromY = supportY + supportH // Bottom of the fixed support lane
        const toX = currentPrimaryRect.x + currentPrimaryRect.width / 2
        const toY = currentPrimaryRect.y // Top of the primary activity element

        return (
          <g key={`v-${i}`}>
            <Arrow
              from={{ x: fromX, y: fromY }}
              to={{ x: toX, y: toY }}
              color="#888"
              dashed
            />
          </g>
        )
      })}

      {/* Arrows aligned with support activities, connecting the bottom of the support activity to the top of the primary lane */}
      {support.map((_, i) => {
        const supportElementId = `support-${i}`
        // Initial visual rect for support activity (used as fallback)
        // Note: x is bx + 2, width is aw (supportW - 4) as per the rect definition
        const supportInitialRect = { x: startX + i * supportW + 2, y: supportY, width: supportW - 4, height: supportH }
        const currentSupportRect = getRect(supportElementId, supportInitialRect)

        const fromX = currentSupportRect.x + currentSupportRect.width / 2
        const fromY = currentSupportRect.y + currentSupportRect.height // Bottom of the support activity element
        const toX = currentSupportRect.x + currentSupportRect.width / 2
        const toY = primaryY // Top of the fixed primary lane

        return (
          <g key={`v2-${i}`}>
            <Arrow
              from={{ x: fromX, y: fromY }}
              to={{ x: toX, y: toY }}
              color="#888"
              dashed
            />
          </g>
        )
      })}
    </g>
  )
}