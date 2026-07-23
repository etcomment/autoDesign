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

        const midX = (startX + 3 * (startX + controlOffset) + 3 * (endX - controlOffset) + endX) / 8
        const midY = (startY + 3 * startY + 3 * endY + endY) / 8

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
            {conn.label ? (
              <g transform={`translate(${midX}, ${midY - 6})`}>
                <rect
                  x={-conn.label.length * 3.5 - 4}
                  y={-8}
                  width={conn.label.length * 7 + 8}
                  height={16}
                  fill="white"
                  rx={2}
                />
                <text
                  textAnchor="middle"
                  fontSize={11}
                  fontFamily="Arial"
                  fill="#333"
                  dominantBaseline="central"
                >
                  {conn.label}
                </text>
              </g>
            ) : null}
          </g>
        )
      })}
    </g>
  )
}
