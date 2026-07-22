import type { Shape } from '../../core/model/Shape'
import { ResizeHandles } from './ResizeHandles'

const diamondPoints = (x: number, y: number, w: number, h: number): string => {
  const cx = x + w / 2
  const cy = y + h / 2
  return `${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}`
}

const cornerRadiusForDiamond = (w: number, h: number): number =>
  Math.min(w, h) * 0.08

function wrapText(content: string, maxWidth: number, fontSize: number): string[] {
  const charWidth = fontSize * 0.6
  const maxChars = Math.max(1, Math.floor(maxWidth / charWidth) - 2)

  const words = content.split(/\s+/)
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (testLine.length <= maxChars || currentLine.length === 0) {
      currentLine = testLine
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines.length > 0 ? lines : [content]
}

interface ShapeRendererProps {
  readonly shape: Shape
  readonly isSelected: boolean
}

export function ShapeRenderer({ shape, isSelected }: ShapeRendererProps) {
  const { dimensions, position, style, text, type } = shape
  const { width: w, height: h } = dimensions
  const { x, y } = position

  const commonProps = {
    fill: style.fill,
    stroke: style.stroke,
    strokeWidth: style.strokeWidth,
    opacity: style.opacity,
    cursor: 'pointer',
  }

  const bounds = {
    x: x - 1,
    y: y - 1,
    width: w + 2,
    height: h + 2,
  }

  return (
    <g>
      {renderShape(type, x, y, w, h, commonProps)}
      {isSelected && (
        <>
          <rect
            {...bounds}
            fill="none"
            stroke="#4a90d9"
            strokeWidth={1}
            strokeDasharray="4 2"
          />
          <ResizeHandles shape={shape} />
        </>
      )}
      {text.content && (
        <WrappedText
          content={text.content}
          x={x + w / 2}
          y={y + h / 2}
          width={w - 12}
          fontSize={text.fontSize}
          fontFamily={text.fontFamily}
          textAlign={text.fontAlign === 'left' ? 'start' : text.fontAlign === 'right' ? 'end' : 'middle'}
          fill={style.stroke}
        />
      )}
    </g>
  )
}

interface CommonProps {
  fill: string
  stroke: string
  strokeWidth: number
  opacity: number
  cursor: string
}

interface WrappedTextProps {
  content: string
  x: number
  y: number
  width: number
  fontSize: number
  fontFamily: string
  textAlign: 'start' | 'middle' | 'end'
  fill: string
}

function WrappedText({ content, x, y, width, fontSize, fontFamily, textAlign, fill }: WrappedTextProps) {
  const lines = wrapText(content, width, fontSize)
  const lineHeight = fontSize * 1.4
  const totalHeight = lines.length * lineHeight
  const startY = y - totalHeight / 2 + fontSize * 0.5

  return (
    <text
      x={x}
      textAnchor={textAlign}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fill={fill}
      pointerEvents="none"
    >
      {lines.map((line, i) => (
        <tspan
          key={i}
          x={x}
          dy={i === 0 ? startY - y : lineHeight}
        >
          {line}
        </tspan>
      ))}
    </text>
  )
}

function renderShape(
  type: Shape['type'],
  x: number,
  y: number,
  w: number,
  h: number,
  props: CommonProps,
): React.ReactElement {
  switch (type) {
    case 'rectangle':
      return (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={cornerRadiusForDiamond(w, h)}
          ry={cornerRadiusForDiamond(w, h)}
          {...props}
        />
      )
    case 'ellipse':
      return (
        <ellipse
          cx={x + w / 2}
          cy={y + h / 2}
          rx={w / 2}
          ry={h / 2}
          {...props}
        />
      )
    case 'diamond':
      return (
        <polygon
          points={diamondPoints(x, y, w, h)}
          {...props}
        />
      )
  }
}
