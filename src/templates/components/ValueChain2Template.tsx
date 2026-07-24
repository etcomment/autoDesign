import { useRef, type ReactElement } from 'react'
import type { ValueChainData } from '../types'
import { Arrow } from '../shared/primitives'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'

const PALETTE = [...MIGSO_PALETTE, '#4a90d9', '#2ecc71', '#e67e22', '#9b59b6', '#e74c3c']
const SUPPORT_PALETTE = ['#8eacbb', '#9db5c4', '#acbdcb', '#bbc6d2', '#cad0d9']

export function ValueChain2Template({ data }: { data: ValueChainData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)

  const { title, primary, support } = data
  const W = 800
  const H = 640
  const leftX = 100
  const rightX = 560
  const colW = 180
  const blockH = 54
  const gap = 16
  const topY = title ? 100 : 60

  return (
    <g ref={svgRef}>
      <rect width={W} height={H} fill="white" rx={8} />
      {title && (
        <text x={W / 2} y={42} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={22} fontWeight={700} fill="#1e3a5f">
          {title}
        </text>
      )}

      <text x={leftX + colW / 2} y={topY - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888">
        PRIMARY ACTIVITIES
      </text>
      <text x={rightX + colW / 2} y={topY - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={12} fontWeight={700} fill="#888">
        SUPPORT ACTIVITIES
      </text>

      {primary.map((act, i) => {
        const elementId = `primary-${i}`
        const color = tplColors[elementId] ?? PALETTE[i % PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const by = topY + i * (blockH + gap)
        const visualRect = { x: leftX, y: by, width: colW, height: blockH }

        return (
          <g key={`p-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={leftX} y={by} width={colW} height={blockH} rx={8} fill={color} opacity={isSelected ? 1 : 0.85} stroke={isSelected ? '#333' : undefined} strokeWidth={isSelected ? 1.5 : undefined} />
              <text x={leftX + colW / 2} y={by + blockH / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {act.title}
              </text>
              {act.subtitle && (
                <text x={leftX + colW / 2} y={by + blockH / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.8)">
                  {act.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
            {i < primary.length - 1 && (
              <Arrow from={{ x: leftX + colW / 2, y: by + blockH + 2 }} to={{ x: leftX + colW / 2, y: by + blockH + gap - 2 }} color={color} />
            )}
          </g>
        )
      })}

      {support.map((act, i) => {
        const elementId = `support-${i}`
        const color = tplColors[elementId] ?? SUPPORT_PALETTE[i % SUPPORT_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const by = topY + i * (blockH + gap)
        const visualRect = { x: rightX, y: by, width: colW, height: blockH }

        return (
          <g key={`s-${i}`}>
            <g onMouseDown={e => startDrag(e, elementId, visualRect)} style={{ cursor: 'pointer' }}>
              <rect x={rightX} y={by} width={colW} height={blockH} rx={8} fill={color} opacity={isSelected ? 0.9 : 0.7} stroke={isSelected ? '#333' : color} strokeWidth={isSelected ? 1.5 : 1} />
              <text x={rightX + colW / 2} y={by + blockH / 2 - 6} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {act.title}
              </text>
              {act.subtitle && (
                <text x={rightX + colW / 2} y={by + blockH / 2 + 14} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="rgba(255,255,255,0.8)">
                  {act.subtitle}
                </text>
              )}
              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}

      <line x1={leftX + colW + 20} y1={topY + blockH / 2} x2={rightX - 20} y2={topY + blockH / 2} stroke="#cbd5e0" strokeWidth={1} strokeDasharray="4 4" />
      <text x={(leftX + colW + rightX) / 2} y={topY + blockH / 2 - 8} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fontWeight={600} fill="#888">
        supports
      </text>
    </g>
  )
}
