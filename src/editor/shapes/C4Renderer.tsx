import { useDiagramStore } from '../../store/diagramStore'
import { useMemo } from 'react'

interface C4Element {
  id: string
  baseType: string
  isExt: boolean
  isDb: boolean
  isQueue: boolean
  label: string
  description: string
  x: number
  y: number
  width: number
  height: number
}

const TYPE_COLORS: Record<string, string> = {
  Person: '#08427B',
  System: '#1168BD',
  Container: '#438DD5',
  Component: '#85BBF0',
}

function parseText(text: string): Omit<C4Element, 'id' | 'x' | 'y' | 'width' | 'height'> | null {
  const lines = text.split('\n')
  const first = lines[0] ?? ''
  const colonIndex = first.indexOf(':')
  if (colonIndex === -1) return null
  const rawType = first.slice(0, colonIndex).trim()
  const label = first.slice(colonIndex + 1).trim()
  const isExt = rawType.endsWith('_Ext')
  const base = isExt ? rawType.slice(0, -4) : rawType
  const isDb = base.endsWith('Db')
  const isQueue = base.endsWith('Queue')
  const baseType = isDb ? base.slice(0, -2) : isQueue ? base.slice(0, -5) : base
  const description = lines.slice(1).join(' ').trim()
  return { baseType, isExt, isDb, isQueue, label, description }
}

function colorKey(baseType: string, label: string): string {
  return `c4-${baseType.toLowerCase()}-${label.toLowerCase().replace(/\s+/g, '-')}`
}

export function C4Renderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const shapes = useDiagramStore(s => s.shapes)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggle = useDiagramStore(s => s.toggleDiagramElement)

  const elements = useMemo(() => {
    if (diagramType !== 'c4') return []
    const result: C4Element[] = []
    for (const shape of shapes) {
      const parsed = parseText(shape.text.content)
      if (!parsed) continue
      if (parsed.baseType.endsWith('Boundary')) continue
      result.push({
        id: shape.id,
        ...parsed,
        x: shape.position.x,
        y: shape.position.y,
        width: shape.dimensions.width,
        height: shape.dimensions.height,
      })
    }
    return result
  }, [diagramType, shapes])

  if (diagramType !== 'c4') return null

  return (
    <g>
      {elements.map(element => {
        const key = colorKey(element.baseType, element.label)
        const color = diagramColors[key] ?? (element.isExt ? '#999999' : (TYPE_COLORS[element.baseType] ?? '#999999'))
        const isSelected = selectedIds.has(element.id)
        const centerX = element.x + element.width / 2
        const centerY = element.y + element.height / 2

        const commonProps = {
          onClick: (e: React.MouseEvent) => { e.stopPropagation(); toggle(element.id) },
          style: { cursor: 'pointer' as const },
        }

        const dashArray = element.isExt ? '6 3' : undefined
        const strokeWidth = isSelected ? 2.5 : 1.5
        const fillColor = isSelected ? `${color}30` : `${color}15`

        if (element.baseType === 'Person') {
          const headRadius = 12
          const headCenterY = element.y + 22
          const bodyTopY = headCenterY + headRadius
          const bodyBottomY = element.y + element.height - 12
          const armY = bodyTopY + (bodyBottomY - bodyTopY) * 0.4
          return (
            <g key={element.id} {...commonProps}>
              <circle cx={centerX} cy={headCenterY} r={headRadius} fill="white" stroke={color} strokeWidth={strokeWidth} />
              <line x1={centerX} y1={bodyTopY} x2={centerX} y2={bodyBottomY} stroke={color} strokeWidth={strokeWidth} />
              <line x1={centerX - 14} y1={armY} x2={centerX + 14} y2={armY} stroke={color} strokeWidth={strokeWidth} />
              <text
                x={centerX}
                y={element.y + element.height - 2}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={600}
                fill="#333"
              >
                {element.label}
              </text>
              {element.description && (
                <text
                  x={centerX}
                  y={element.y + element.height + 12}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill="#888"
                >
                  {element.description}
                </text>
              )}
            </g>
          )
        }

        if (element.isDb) {
          const ovalHeight = 14
          return (
            <g key={element.id} {...commonProps}>
              <path
                d={`M ${element.x} ${element.y + ovalHeight} L ${element.x} ${element.y + element.height - ovalHeight} C ${element.x} ${element.y + element.height}, ${element.x + element.width} ${element.y + element.height}, ${element.x + element.width} ${element.y + element.height - ovalHeight} L ${element.x + element.width} ${element.y + ovalHeight} C ${element.x + element.width} ${element.y}, ${element.x} ${element.y}, ${element.x} ${element.y + ovalHeight} Z`}
                fill={fillColor}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
              />
              <ellipse cx={centerX} cy={element.y + ovalHeight} rx={element.width / 2} ry={ovalHeight} fill="white" stroke={color} strokeWidth={strokeWidth} />
              <text
                x={centerX}
                y={element.y + 34}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={700}
                fill={color}
              >
                {'<<' + element.baseType + '>>'}
              </text>
              <text
                x={centerX}
                y={element.y + element.height / 2 + 2}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fontWeight={600}
                fill="#333"
              >
                {element.label}
              </text>
              {element.description && (
                <text
                  x={centerX}
                  y={element.y + element.height - 20}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill="#888"
                >
                  {element.description}
                </text>
              )}
            </g>
          )
        }

        if (element.isQueue) {
          const triangleSize = 10
          const triangleX = element.x + element.width - 14
          return (
            <g key={element.id} {...commonProps}>
              <rect
                x={element.x}
                y={element.y}
                width={element.width}
                height={element.height}
                rx={8}
                fill={fillColor}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
              />
              <polygon
                points={`${triangleX},${centerY - triangleSize} ${triangleX + triangleSize},${centerY} ${triangleX},${centerY + triangleSize}`}
                fill={color}
                opacity={0.7}
              />
              <text
                x={centerX - 6}
                y={element.y + 18}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fontWeight={700}
                fill={color}
              >
                {'<<' + element.baseType + '>>'}
              </text>
              <text
                x={centerX - 6}
                y={element.y + element.height / 2 + 4}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fontWeight={600}
                fill="#333"
              >
                {element.label}
              </text>
              {element.description && (
                <text
                  x={centerX - 6}
                  y={element.y + element.height - 8}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={9}
                  fill="#888"
                >
                  {element.description}
                </text>
              )}
            </g>
          )
        }

        return (
          <g key={element.id} {...commonProps}>
            <rect
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              rx={6}
              fill={fillColor}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
            />
            <text
              x={centerX}
              y={element.y + 18}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={10}
              fontWeight={700}
              fill={color}
            >
              {'<<' + element.baseType + '>>'}
            </text>
            <text
              x={centerX}
              y={element.y + element.height / 2 + 4}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fontWeight={600}
              fill="#333"
            >
              {element.label}
            </text>
            {element.description && (
              <text
                x={centerX}
                y={element.y + element.height - 8}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={9}
                fill="#888"
              >
                {element.description}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
