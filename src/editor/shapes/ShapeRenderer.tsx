import type { Shape } from '../../core/model/Shape'
import { ResizeHandles } from './ResizeHandles'

const diamondPoints = (x: number, y: number, w: number, h: number): string => {
  const cx = x + w / 2
  const cy = y + h / 2
  return `${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}`
}

const cornerRadiusForDiamond = (w: number, h: number): number =>
  Math.min(w, h) * 0.08

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
    stroke: isSelected ? '#4a90d9' : style.stroke,
    strokeWidth: isSelected ? style.strokeWidth + 1 : style.strokeWidth,
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
        <text
          x={x + w / 2}
          y={y + h / 2}
          textAnchor={text.fontAlign === 'left' ? 'start' : text.fontAlign === 'right' ? 'end' : 'middle'}
          dominantBaseline="central"
          fontSize={text.fontSize}
          fontFamily={text.fontFamily}
          fill={style.stroke}
          pointerEvents="none"
        >
          {text.content}
        </text>
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
