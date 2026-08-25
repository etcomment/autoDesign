import { useRef, type ReactElement } from 'react'
import type { BusinessData } from '../types'
import { useTemplateDragResize } from '../shared/useTemplateDragResize'
import { useTemplateStore } from '../store'
import { wrapTextByWidth, parseNodePercent } from '../shared/primitives'
import { TEMPLATE_ICONS } from '../shared/icons'
import * as LucideIcons from 'lucide-react'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}

function renderDynamicIcon(iconName?: string, size = 18, color = '#23255a'): ReactElement | null {
  if (!iconName) return null
  const clean = iconName.trim()
  const templateFn = TEMPLATE_ICONS[clean] || TEMPLATE_ICONS[clean.toLowerCase()]
  if (templateFn) return templateFn({ size, color })

  const pascalName = clean.charAt(0).toUpperCase() + clean.slice(1)
  const lucideRecord = LucideIcons as Record<string, unknown>
  const LucideFn = (lucideRecord[pascalName] || lucideRecord[clean] || lucideRecord[clean.toUpperCase()]) as
    | React.ComponentType<{ size?: number; color?: string }>
    | undefined

  if (LucideFn) {
    return <LucideFn size={size} color={color} />
  }
  return null
}

const DEFAULT_NODES = [
  {
    percent: '30%',
    title: '',
    subtitle: 'Content and description to be added here as required',
    color: '#3b71ca',
    x: 215,
    isTop: true,
  },
  {
    percent: '62%',
    title: '',
    subtitle: 'Content and description to be added here as required',
    color: '#ffc107',
    x: 535,
    isTop: true,
  },
  {
    percent: '81%',
    title: '',
    subtitle: 'Content and description to be added here as required',
    color: '#e91e63',
    x: 810,
    isTop: true,
  },
  {
    percent: '25%',
    title: '',
    subtitle: 'Content and description to be added here as required',
    color: '#1a237e',
    x: 230,
    isTop: false,
  },
  {
    percent: '48%',
    title: '',
    subtitle: 'Content and description to be added here as required',
    color: '#ff5722',
    x: 480,
    isTop: false,
  },
  {
    percent: '58%',
    title: '',
    subtitle: 'Content and description to be added here as required',
    color: '#4caf50',
    x: 770,
    isTop: false,
  },
]

const WAVE_PATHS = [
  { id: 'wave-0', d: 'M 62 310 C 72 260, 80 180, 100 180 C 120 180, 115 260, 128 260 C 140 260, 142 205, 160 205 C 178 205, 175 230, 192 230 C 208 230, 210 290, 230 310 Z', color: '#272b5c', rect: { x: 62, y: 180, width: 168, height: 130 } },
  { id: 'wave-1', d: 'M 160 310 C 190 310, 210 290, 240 290 C 270 290, 272 170, 296 170 C 320 170, 325 310, 370 310 Z', color: '#4a7ad8', rect: { x: 160, y: 170, width: 210, height: 140 } },
  { id: 'wave-2', d: 'M 310 310 C 330 260, 345 200, 365 200 C 385 200, 385 230, 400 230 C 415 230, 412 195, 432 195 C 452 195, 450 230, 470 230 C 490 230, 480 310, 560 310 Z', color: '#ff5733', rect: { x: 310, y: 195, width: 250, height: 115 } },
  { id: 'wave-3', d: 'M 400 310 C 460 310, 490 240, 508 240 C 526 240, 520 270, 538 270 C 556 270, 560 190, 580 190 C 600 190, 605 310, 675 310 Z', color: '#ffc400', rect: { x: 400, y: 190, width: 275, height: 120 } },
  { id: 'wave-4', d: 'M 570 310 C 610 310, 615 250, 642 250 C 670 250, 675 185, 705 185 C 735 185, 740 310, 810 310 Z', color: '#56c596', rect: { x: 570, y: 185, width: 240, height: 125 } },
  { id: 'wave-5', d: 'M 720 310 C 735 240, 740 185, 760 185 C 780 185, 775 245, 810 245 C 845 245, 875 270, 885 310 Z', color: '#f03a6b', rect: { x: 720, y: 185, width: 165, height: 125 } },
]

export function BusinessTemplate({ data }: { data: BusinessData }): ReactElement {
  const svgRef = useRef<SVGGElement>(null)
  const { startDrag, getTransform, renderHandles } = useTemplateDragResize(svgRef)
  const selectedIds = useTemplateStore(state => state.selectedTemplateElementIds)
  const templateColors = useTemplateStore(state => state.templateElementColors)
  const templateStrokeColors = useTemplateStore(state => state.templateStrokeColors)
  const templateStrokeWidths = useTemplateStore(state => state.templateStrokeWidths)
  const positions = useTemplateStore(state => state.templateElementPositions)

  const nodes = data.nodes ?? []
  const displayNodes = nodes.length > 0 ? nodes : DEFAULT_NODES

  const getElementRect = (elementId: string, defaultRect: Rect): Rect => {
    const stored = positions[elementId]
    return {
      x: stored?.x ?? defaultRect.x,
      y: stored?.y ?? defaultRect.y,
      width: stored?.width ?? defaultRect.width,
      height: stored?.height ?? defaultRect.height,
    }
  }

  return (
    <g ref={svgRef}>
      {WAVE_PATHS.map((wave) => {
        const isSelected = selectedIds.has(wave.id)
        const waveRect = getElementRect(wave.id, wave.rect)
        const color = templateColors[wave.id] ?? wave.color
        const strokeColor = templateStrokeColors[wave.id] ?? (isSelected ? '#4a90d9' : 'none')
        const strokeWidth = templateStrokeWidths[wave.id] ?? (isSelected ? 2 : 0)

        const dx = waveRect.x - wave.rect.x
        const dy = waveRect.y - wave.rect.y

        return (
          <g
            key={wave.id}
            data-element-id={wave.id}
            onMouseDown={event => startDrag(event, wave.id, waveRect)}
            transform={getTransform(wave.id, waveRect)}
            style={{ cursor: 'pointer' }}
          >
            <path
              d={wave.d}
              transform={`translate(${dx}, ${dy})`}
              fill={color}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={isSelected ? '4 2' : undefined}
              opacity={0.92}
            />
            {isSelected && renderHandles(waveRect, wave.id)}
          </g>
        )
      })}

      {displayNodes.map((item, index) => {
        const defaultIndex = index % DEFAULT_NODES.length
        const fallback = DEFAULT_NODES[defaultIndex]!
        const elementId = `node-${index}`
        const isSelected = selectedIds.has(elementId)

        const parsed = parseNodePercent(item, 0.5)
        const percentVal = parsed.percentStr

        const itemObject = typeof item === 'object' && item !== null ? item : {}
        const titleVal = 'title' in itemObject && typeof itemObject.title === 'string' ? itemObject.title : ''
        const subtitleVal =
          'subtitle' in itemObject && typeof itemObject.subtitle === 'string'
            ? itemObject.subtitle
            : 'text' in itemObject && typeof itemObject.text === 'string'
              ? itemObject.text
              : fallback.subtitle

        const iconName = 'icon' in itemObject && typeof itemObject.icon === 'string' ? itemObject.icon : undefined
        const customColor = 'color' in itemObject && typeof itemObject.color === 'string' ? itemObject.color : fallback.color
        const color = templateColors[elementId] ?? customColor

        const isTop = fallback.isTop
        const boxX = fallback.x - 110 + Math.floor(index / 6) * 10
        const boxY = (isTop ? 100 : 370) + Math.floor(index / 6) * 10
        const boxWidth = 220
        const boxHeight = 70

        const defaultRect: Rect = { x: boxX, y: boxY, width: boxWidth, height: boxHeight }
        const visualRect = getElementRect(elementId, defaultRect)

        const maxChars = Math.max(12, Math.floor(visualRect.width / 7))
        const subtitleLines = wrapTextByWidth(subtitleVal, maxChars)
        const titleLines = titleVal ? wrapTextByWidth(titleVal, maxChars) : []

        const strokeColor = templateStrokeColors[elementId] ?? (isSelected ? '#4a90d9' : 'transparent')
        const strokeWidth = templateStrokeWidths[elementId] ?? (isSelected ? 2 : 0)

        const iconElement = renderDynamicIcon(iconName, 18, color)

        const lineStartY = isTop ? visualRect.y + visualRect.height : visualRect.y
        const lineEndY = isTop ? 290 : 310
        const lineX = visualRect.x + visualRect.width / 2

        return (
          <g key={elementId}>
            <line
              x1={lineX}
              y1={lineStartY}
              x2={lineX}
              y2={lineEndY}
              stroke="#cccccc"
              strokeWidth={2}
              strokeDasharray="3 3"
            />

            <g
              data-element-id={elementId}
              onMouseDown={event => startDrag(event, elementId, visualRect)}
              transform={getTransform(elementId, visualRect)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={visualRect.x}
                y={visualRect.y}
                width={visualRect.width}
                height={visualRect.height}
                fill={templateColors[`bg-${elementId}`] ?? '#ffffff'}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={isSelected ? '4 2' : undefined}
                rx={6}
                opacity={0.95}
              />

              <g transform={`translate(${visualRect.x + visualRect.width / 2}, ${visualRect.y + 24})`}>
                {iconElement && <g transform="translate(-30, -14)">{iconElement}</g>}
                <text
                  x={iconElement ? 10 : 0}
                  y={0}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={20}
                  fontWeight="bold"
                  fill={color}
                >
                  {percentVal}
                </text>
              </g>

              {titleLines.length > 0 && (
                <text
                  x={visualRect.x + visualRect.width / 2}
                  y={visualRect.y + 42}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#222222"
                >
                  {titleLines.map((line, lineIndex) => (
                    <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2} dy={lineIndex === 0 ? 0 : 14}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}

              <text
                x={visualRect.x + visualRect.width / 2}
                y={visualRect.y + (titleLines.length > 0 ? 42 + titleLines.length * 14 : 44)}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fill="#444444"
              >
                {subtitleLines.map((line, lineIndex) => (
                  <tspan key={lineIndex} x={visualRect.x + visualRect.width / 2} dy={lineIndex === 0 ? 0 : 14}>
                    {line}
                  </tspan>
                ))}
              </text>

              {isSelected && renderHandles(visualRect, elementId)}
            </g>
          </g>
        )
      })}
    </g>
  )
}

