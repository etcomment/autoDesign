import type { ReactElement, MouseEvent } from 'react'
import { wrapTextByWidth } from '../shared/primitives'

export interface Dashboard5NodeProps {
  identifier: string
  number: string
  title: string
  description: string
  color: string
  index: number
  boundingBox: { x: number; y: number; width: number; height: number }
  isSelected: boolean
  strokeColor: string
  strokeWidth: number
  transform?: string
  onMouseDown: (event: MouseEvent<SVGGElement>) => void
  renderHandles: (
    box: { x: number; y: number; width: number; height: number },
    identifier: string
  ) => ReactElement | null
}

export function Dashboard5Node({
  identifier,
  number,
  title,
  description,
  color,
  index,
  boundingBox,
  isSelected,
  strokeColor,
  strokeWidth,
  transform,
  onMouseDown,
  renderHandles,
}: Dashboard5NodeProps): ReactElement {
  const isEven = index % 2 === 0
  const centerX = isEven ? boundingBox.x + 34 : boundingBox.x + boundingBox.width - 35
  const centerY = isEven ? boundingBox.y + boundingBox.height - 35 : boundingBox.y + 35
  const stemEndY = isEven ? boundingBox.y + 25 : boundingBox.y + boundingBox.height - 25

  const titleLines = wrapTextByWidth(title, 18)
  const descriptionLines = wrapTextByWidth(description, 24)

  return (
    <g
      data-element-id={identifier}
      transform={transform}
      onMouseDown={onMouseDown}
      style={{ cursor: 'pointer' }}
    >
      {strokeWidth > 0 && (
        <rect
          x={boundingBox.x}
          y={boundingBox.y}
          width={boundingBox.width}
          height={boundingBox.height}
          rx={6}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}

      <line
        x1={centerX}
        y1={isEven ? centerY - 34 : centerY + 34}
        x2={centerX}
        y2={stemEndY}
        stroke="#718096"
        strokeWidth={2}
      />
      <circle cx={centerX} cy={stemEndY} r={4.5} fill="#718096" />

      {isEven ? (
        <g transform={`translate(${centerX + 12}, ${stemEndY - 12})`}>
          {titleLines.map((line, lineIndex) => (
            <text
              key={lineIndex}
              x={0}
              y={lineIndex * 15}
              textAnchor="start"
              fill="#1a202c"
              fontSize={13}
              fontWeight={700}
              fontFamily="Arial, sans-serif"
            >
              {line}
            </text>
          ))}
          {descriptionLines.map((line, lineIndex) => (
            <text
              key={lineIndex}
              x={0}
              y={titleLines.length * 15 + lineIndex * 13}
              textAnchor="start"
              fill="#4a5568"
              fontSize={10}
              fontFamily="Arial, sans-serif"
            >
              {line}
            </text>
          ))}
        </g>
      ) : (
        <g transform={`translate(${centerX - 12}, ${stemEndY - 35})`}>
          {titleLines.map((line, lineIndex) => (
            <text
              key={lineIndex}
              x={0}
              y={lineIndex * 15}
              textAnchor="end"
              fill="#1a202c"
              fontSize={13}
              fontWeight={700}
              fontFamily="Arial, sans-serif"
            >
              {line}
            </text>
          ))}
          {descriptionLines.map((line, lineIndex) => (
            <text
              key={lineIndex}
              x={0}
              y={titleLines.length * 15 + lineIndex * 13}
              textAnchor="end"
              fill="#4a5568"
              fontSize={10}
              fontFamily="Arial, sans-serif"
            >
              {line}
            </text>
          ))}
        </g>
      )}

      <circle cx={centerX} cy={centerY} r={34} fill={color} />
      <text
        x={centerX}
        y={centerY + 8}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={22}
        fontWeight={800}
        fontFamily="Arial, sans-serif"
      >
        {number}
      </text>

      {isSelected && renderHandles(boundingBox, identifier)}
    </g>
  )
}
