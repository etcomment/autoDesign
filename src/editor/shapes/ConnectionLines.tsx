import { useDiagramStore } from '../../store/diagramStore'
import type { Shape } from '../../core/model/Shape'

interface EdgePoints {
  startX: number
  startY: number
  endX: number
  endY: number
}

function computeEdgePoints(source: Shape, target: Shape): EdgePoints {
  const sCenterX = source.position.x + source.dimensions.width / 2
  const sCenterY = source.position.y + source.dimensions.height / 2
  const tCenterX = target.position.x + target.dimensions.width / 2
  const tCenterY = target.position.y + target.dimensions.height / 2

  const dx = tCenterX - sCenterX
  const dy = tCenterY - sCenterY

  let startX: number, startY: number, endX: number, endY: number

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) {
      startX = source.position.x + source.dimensions.width
      startY = sCenterY
      endX = target.position.x
      endY = tCenterY
    } else {
      startX = source.position.x
      startY = sCenterY
      endX = target.position.x + target.dimensions.width
      endY = tCenterY
    }
  } else {
    if (dy > 0) {
      startX = sCenterX
      startY = source.position.y + source.dimensions.height
      endX = tCenterX
      endY = target.position.y
    } else {
      startX = sCenterX
      startY = source.position.y
      endX = tCenterX
      endY = target.position.y + target.dimensions.height
    }
  }

  return { startX, startY, endX, endY }
}

export function ConnectionLines() {
  const shapes = useDiagramStore(s => s.shapes)
  const connections = useDiagramStore(s => s.connections)

  const shapeMap = new Map(shapes.map(s => [s.id, s]))

  return (
    <g>
      {connections.map((conn) => {
        const source = shapeMap.get(conn.sourceId)
        const target = shapeMap.get(conn.targetId)
        if (!source || !target) return null

        const { startX, startY, endX, endY } = computeEdgePoints(source, target)

        const dx = Math.abs(endX - startX)
        const controlOffset = Math.min(dx * 0.5, 80)

        const pathD = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`

        return (
          <g key={conn.id}>
            <path
              d={pathD}
              fill="none"
              stroke="#666"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <polygon
              points={`-6,-4 0,0 -6,4`}
              fill="#666"
              transform={`translate(${endX}, ${endY}) rotate(${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)})`}
            />
          </g>
        )
      })}
    </g>
  )
}
