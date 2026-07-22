import { useDiagramStore } from '../../store/diagramStore'
import { computeEdgePoints } from '../../core/geometry'

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
