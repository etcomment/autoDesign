import { useDiagramStore } from '../../store/diagramStore'

const LIFELINE_LENGTH = 400

export function SequenceLifelines() {
  const sequenceData = useDiagramStore(s => s.sequenceData)
  const shapes = useDiagramStore(s => s.shapes)

  if (!sequenceData) return null

  const shapeMap = new Map(shapes.map(s => [s.id, s]))

  return (
    <g>
      {sequenceData.participants.map((participant, index) => {
        const shape = shapeMap.get(participant.shapeId)
        if (!shape) return null

        const centerX = shape.position.x + shape.dimensions.width / 2
        const bottomY = shape.position.y + shape.dimensions.height

        return (
          <g key={`lifeline-${index}`}>
            <line
              x1={centerX}
              y1={bottomY}
              x2={centerX}
              y2={bottomY + LIFELINE_LENGTH}
              stroke="#999"
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
          </g>
        )
      })}

      {sequenceData.messages.map((message, index) => {
        const source = shapeMap.get(message.sourceId)
        const target = shapeMap.get(message.targetId)
        if (!source || !target) return null

        const y = 90 + index * 40
        const fromX = source.position.x + source.dimensions.width / 2
        const toX = target.position.x + target.dimensions.width / 2
        const direction = toX > fromX ? 1 : -1

        const isDashed = message.type === 'dashed'

        return (
          <g key={`msg-${index}`}>
            <line
              x1={fromX}
              y1={y}
              x2={toX - direction * 8}
              y2={y}
              stroke="#333"
              strokeWidth={1.5}
              strokeDasharray={isDashed ? '4 3' : undefined}
            />
            <polygon
              points={`${toX - direction * 12},${y - 4} ${toX},${y} ${toX - direction * 12},${y + 4}`}
              fill="#333"
              transform={direction < 0 ? `scale(-1, 1) translate(${-2 * toX}, 0)` : undefined}
            />
            {message.label && (
              <text
                x={(fromX + toX) / 2}
                y={y - 6}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fill="#555"
              >
                {message.label}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
