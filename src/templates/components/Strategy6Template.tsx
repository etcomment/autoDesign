import { useRef, type ReactElement } from 'react'
import type { Strategy6Data } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { MIGSO_PALETTE } from '../../lib/theme'
import { wrapTextByWidth } from '../shared/primitives'

const QUADRANT_COLORS = ['#e3f2fd', '#fff3e0', '#e8f5e9', '#fce4ec']

export function Strategy6Template({ data }: { data: Strategy6Data }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(s => s.selectedTemplateElementIds)
  const tplColors = useTemplateStore(s => s.templateElementColors)
  const tplStrokeColors = useTemplateStore(s => s.templateStrokeColors)
  const tplStrokeWidths = useTemplateStore(s => s.templateStrokeWidths)
  const positions = useTemplateStore(s => s.templateElementPositions)

  const { axisX, axisY, quadrants } = data
  const W = 800
  const boxSize = 280
  const defaultCenterX = W / 2
  const defaultCenterY = 300
  const half = boxSize / 2
  const qw = half - 10
  const qh = half - 10

  const centerId = 'center-junction'
  const defaultCenterBbox = { x: defaultCenterX - 24, y: defaultCenterY - 24, width: 48, height: 48 }
  const customCenterPos = positions[centerId]
  const centerBbox = {
    x: customCenterPos?.x ?? defaultCenterBbox.x,
    y: customCenterPos?.y ?? defaultCenterBbox.y,
    width: customCenterPos?.width ?? defaultCenterBbox.width,
    height: customCenterPos?.height ?? defaultCenterBbox.height,
  }
  const isCenterSelected = selectedIds.has(centerId)
  const centerX = centerBbox.x + centerBbox.width / 2
  const centerY = centerBbox.y + centerBbox.height / 2

  return (
    <g ref={svgRef}>
      {/* Axis Cross Lines */}
      <line x1={centerX - half - 20} y1={centerY} x2={centerX + half + 20} y2={centerY} stroke="#94a3b8" strokeWidth={2} />
      <line x1={centerX} y1={centerY - half - 20} x2={centerX} y2={centerY + half + 20} stroke="#94a3b8" strokeWidth={2} />

      {/* Axis X Label — Interactive */}
      {axisX && (() => {
        const axId = 'axis-x'
        const defaultAxBbox = { x: centerX + half + 26, y: centerY - 14, width: 120, height: 28 }
        const customAxPos = positions[axId]
        const axBbox = {
          x: customAxPos?.x ?? defaultAxBbox.x,
          y: customAxPos?.y ?? defaultAxBbox.y,
          width: customAxPos?.width ?? defaultAxBbox.width,
          height: customAxPos?.height ?? defaultAxBbox.height,
        }
        const isAxSelected = selectedIds.has(axId)
        return (
          <g data-element-id={axId} onMouseDown={e => startDrag(e, axId, axBbox)} transform={getTransform(axId, axBbox)} style={{ cursor: 'pointer' }}>
            <text x={axBbox.x} y={axBbox.y + 18} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#475569">
              {axisX} →
            </text>
            {isAxSelected && renderHandles(axBbox, axId)}
          </g>
        )
      })()}

      {/* Axis Y Label — Interactive */}
      {axisY && (() => {
        const ayId = 'axis-y'
        const defaultAyBbox = { x: centerX - 60, y: centerY - half - 38, width: 120, height: 28 }
        const customAyPos = positions[ayId]
        const ayBbox = {
          x: customAyPos?.x ?? defaultAyBbox.x,
          y: customAyPos?.y ?? defaultAyBbox.y,
          width: customAyPos?.width ?? defaultAyBbox.width,
          height: customAyPos?.height ?? defaultAyBbox.height,
        }
        const isAySelected = selectedIds.has(ayId)
        return (
          <g data-element-id={ayId} onMouseDown={e => startDrag(e, ayId, ayBbox)} transform={getTransform(ayId, ayBbox)} style={{ cursor: 'pointer' }}>
            <text x={ayBbox.x + ayBbox.width / 2} y={ayBbox.y + 18} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#475569">
              ↑ {axisY}
            </text>
            {isAySelected && renderHandles(ayBbox, ayId)}
          </g>
        )
      })()}

      {/* 4 Quadrants */}
      {[0, 1, 2, 3].map(i => {
        const qx = i % 2 === 0 ? centerX - half + 6 : centerX + 6
        const qy = i < 2 ? centerY - half + 6 : centerY + 6
        const quadrant = quadrants[i]
        const elementId = `quadrant-${i}`
        const bgColor = tplColors[elementId] ?? quadrant?.color ?? QUADRANT_COLORS[i]!
        const accent = tplColors[elementId] ?? MIGSO_PALETTE[i % MIGSO_PALETTE.length]!
        const isSelected = selectedIds.has(elementId)
        const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : '#cbd5e0')
        const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 2.5 : 1)
        const defaultBbox = { x: qx, y: qy, width: qw, height: qh }
        const customPos = positions[elementId]
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height,
        }

        const maxChars = Math.max(10, Math.floor(bbox.width / 6.5))
        const titleLines = quadrant ? wrapTextByWidth(quadrant.title, maxChars) : [`Q${i + 1}`]
        const subLines = quadrant?.subtitle ? wrapTextByWidth(quadrant.subtitle, maxChars) : []

        return (
          <g key={`q-${i}`}>
            <g data-element-id={elementId} onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
              <rect x={bbox.x} y={bbox.y} width={bbox.width} height={bbox.height} rx={8} fill={bgColor} stroke={strokeColor} strokeWidth={strokeWidth} />
              <circle cx={bbox.x + bbox.width / 2} cy={bbox.y + 28} r={16} fill={accent} />
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 33} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="white">
                {String(i + 1)}
              </text>
              <text x={bbox.x + bbox.width / 2} y={bbox.y + 60} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={13} fontWeight={700} fill="#1e293b">
                {titleLines.map((line, li) => (
                  <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 15}>
                    {line}
                  </tspan>
                ))}
              </text>
              {subLines.length > 0 && (
                <text x={bbox.x + bbox.width / 2} y={bbox.y + 60 + titleLines.length * 15 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="#64748b">
                  {subLines.map((line, li) => (
                    <tspan key={li} x={bbox.x + bbox.width / 2} dy={li === 0 ? 0 : 12}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
              {isSelected && renderHandles(bbox, elementId)}
            </g>
          </g>
        )
      })}

      {/* Center Junction Badge — Interactive */}
      <g
        data-element-id={centerId}
        onMouseDown={e => startDrag(e, centerId, centerBbox)}
        transform={getTransform(centerId, centerBbox)}
        style={{ cursor: 'pointer' }}
      >
        <circle cx={centerX} cy={centerY} r={Math.min(centerBbox.width, centerBbox.height) / 2} fill="#ffffff" stroke={isCenterSelected ? '#4a90d9' : '#334155'} strokeWidth={isCenterSelected ? 2.5 : 2} />
        <text x={centerX} y={centerY + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fontWeight={700} fill="#334155">
          {axisX && axisY ? `${axisX.slice(0, 3)}×${axisY.slice(0, 3)}` : 'GRID'}
        </text>
        {isCenterSelected && renderHandles(centerBbox, centerId)}
      </g>
    </g>
  )
}
