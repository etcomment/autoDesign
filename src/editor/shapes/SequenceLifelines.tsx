import { useMemo } from 'react'
import { useDiagramStore } from '../../store/diagramStore'
import type { SequenceData, SequenceParticipant } from '../../mermaid/parseSequenceDiagram'
import type { Shape } from '../../core/model/Shape'

interface SequenceNote {
  text: string
  placement: 'left of' | 'right of' | 'over'
  actorNames: string[]
}

interface SequenceBox {
  type: string
  label: string
  startMessageIndex: number
  endMessageIndex: number
  participants: number[]
}

interface SequenceActivation {
  participantIndex: number
  startMessageIndex: number
  endMessageIndex: number
}

interface RichSequenceData extends SequenceData {
  notes?: SequenceNote[]
  boxes?: SequenceBox[]
  activations?: SequenceActivation[]
}

const MESSAGE_SPACING = 60
const ACTIVATION_WIDTH = 10
const NOTE_WIDTH = 120
const NOTE_HEIGHT = 50
const BOX_PADDING = 20
const LIFELINE_BOTTOM_MARGIN = 80
const SELF_MESSAGE_WIDTH = 40
const SELF_MESSAGE_HEIGHT = 40

function isSequenceNoteArray(value: unknown): value is SequenceNote[] {
  return Array.isArray(value)
}

function isSequenceBoxArray(value: unknown): value is SequenceBox[] {
  return Array.isArray(value)
}

function isSequenceActivationArray(value: unknown): value is SequenceActivation[] {
  return Array.isArray(value)
}

function getActorCenterX(shape: Shape): number {
  return shape.position.x + shape.dimensions.width / 2
}

function getActorBottomY(shape: Shape): number {
  return shape.position.y + shape.dimensions.height
}

function arrowStyle(type: 'solid' | 'dashed'): { strokeDasharray?: string; markerEnd: string } {
  if (type === 'dashed') {
    return { strokeDasharray: '6 4', markerEnd: 'url(#sequenceArrowSolid)' }
  }
  return { markerEnd: 'url(#sequenceArrowSolid)' }
}

export function SequenceLifelines() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const sequenceData = useDiagramStore(s => s.sequenceData)
  const shapes = useDiagramStore(s => s.shapes)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  const richSequenceData = sequenceData as RichSequenceData

  const layout = useMemo(() => {
    if (!sequenceData) return null

    const shapeMap = new Map(shapes.map(s => [s.id, s]))
    const actorEntries = sequenceData.participants
      .map(participant => ({ participant, shape: shapeMap.get(participant.shapeId) }))
      .filter((entry): entry is { participant: SequenceParticipant; shape: Shape } => entry.shape !== undefined)

    if (actorEntries.length === 0) return null

    const actorMap = new Map(actorEntries.map(entry => [entry.participant.name, entry.shape]))
    const maxActorBottom = Math.max(...actorEntries.map(entry => getActorBottomY(entry.shape)))

    const notes = isSequenceNoteArray(richSequenceData.notes) ? richSequenceData.notes : []
    const boxes = isSequenceBoxArray(richSequenceData.boxes) ? richSequenceData.boxes : []
    const activations = isSequenceActivationArray(richSequenceData.activations) ? richSequenceData.activations : []

    const messageHeight = sequenceData.messages.length * MESSAGE_SPACING
    const noteHeight = notes.length > 0 ? notes.length * (NOTE_HEIGHT + 20) + 20 : 0
    const boxHeight = boxes.length > 0
      ? Math.max(...boxes.map(box => Math.max((box.endMessageIndex - box.startMessageIndex) * MESSAGE_SPACING, 40))) + 40
      : 0
    const activationHeight = activations.length > 0
      ? Math.max(...activations.map(activation => Math.max((activation.endMessageIndex - activation.startMessageIndex) * MESSAGE_SPACING, 20))) + 40
      : 0

    const diagramHeight = Math.max(messageHeight, noteHeight, boxHeight, activationHeight) + LIFELINE_BOTTOM_MARGIN

    return {
      actorEntries,
      actorMap,
      shapeMap,
      maxActorBottom,
      diagramHeight,
      notes,
      boxes,
      activations,
    }
  }, [sequenceData, shapes, richSequenceData])

  if (diagramType !== 'sequence' || !sequenceData || !layout) return null

  const { actorEntries, actorMap, shapeMap, maxActorBottom, diagramHeight, notes, boxes, activations } = layout

  return (
    <g>
      <defs>
        <marker
          id="sequenceArrowSolid"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
        </marker>
      </defs>

      {actorEntries.map(({ participant, shape }) => {
        const centerX = getActorCenterX(shape)
        const bottomY = getActorBottomY(shape)
        const elementId = `actor-${participant.name}`
        const isSelected = selectedIds.has(elementId)
        const color = diagramColors[elementId] ?? '#999'
        return (
          <line
            key={`lifeline-${participant.name}`}
            x1={centerX}
            y1={bottomY}
            x2={centerX}
            y2={bottomY + diagramHeight}
            stroke={color}
            strokeWidth={isSelected ? 2 : 1}
            strokeDasharray="6 4"
            onClick={() => toggleElement(elementId)}
            style={{ cursor: 'pointer' }}
          />
        )
      })}

      {activations.map((activation, index) => {
        const entry = actorEntries[activation.participantIndex]
        if (!entry) return null
        const centerX = getActorCenterX(entry.shape)
        const startY = maxActorBottom + activation.startMessageIndex * MESSAGE_SPACING + MESSAGE_SPACING / 2
        const endY = maxActorBottom + activation.endMessageIndex * MESSAGE_SPACING + MESSAGE_SPACING / 2
        const elementId = `activation-${index}`
        const isSelected = selectedIds.has(elementId)
        return (
          <rect
            key={`activation-${index}`}
            x={centerX - ACTIVATION_WIDTH / 2}
            y={startY}
            width={ACTIVATION_WIDTH}
            height={Math.max(endY - startY, 10)}
            rx={2}
            fill="#4a90d9"
            opacity={0.3}
            stroke={isSelected ? '#4a90d9' : '#2c5aa0'}
            strokeWidth={isSelected ? 2 : 1}
            onClick={() => toggleElement(elementId)}
            style={{ cursor: 'pointer' }}
          />
        )
      })}

      {boxes.map((box, index) => {
        const validIndices = box.participants.filter(i => i >= 0 && i < actorEntries.length)
        if (validIndices.length === 0) return null
        const minIndex = Math.min(...validIndices)
        const maxIndex = Math.max(...validIndices)
        const leftEntry = actorEntries[minIndex]
        const rightEntry = actorEntries[maxIndex]
        if (!leftEntry || !rightEntry) return null
        const leftX = leftEntry.shape.position.x - BOX_PADDING
        const rightX = rightEntry.shape.position.x + rightEntry.shape.dimensions.width + BOX_PADDING
        const startY = maxActorBottom + box.startMessageIndex * MESSAGE_SPACING
        const endY = maxActorBottom + box.endMessageIndex * MESSAGE_SPACING
        const elementId = `box-${index}`
        const isSelected = selectedIds.has(elementId)
        return (
          <g key={`box-${index}`}>
            <rect
              x={leftX}
              y={startY}
              width={rightX - leftX}
              height={Math.max(endY - startY, 40)}
              rx={8}
              fill={isSelected ? '#e8f0fe' : '#f8f8f8'}
              stroke={isSelected ? '#4a90d9' : '#bbb'}
              strokeWidth={isSelected ? 2 : 1}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementId)}
              style={{ cursor: 'pointer' }}
            />
            <text
              x={leftX + 10}
              y={startY + 18}
              fontFamily="Arial, sans-serif"
              fontSize={12}
              fontWeight={600}
              fill="#555"
            >
              {box.type} {box.label}
            </text>
          </g>
        )
      })}

      {sequenceData.messages.map((message, index) => {
        const sourceShape = shapeMap.get(message.sourceId)
        const targetShape = shapeMap.get(message.targetId)
        if (!sourceShape || !targetShape) return null

        const elementId = `message-${index}`
        const isSelected = selectedIds.has(elementId)
        const baseY = maxActorBottom + index * MESSAGE_SPACING + MESSAGE_SPACING / 2
        const sourceCenterX = getActorCenterX(sourceShape)
        const targetCenterX = getActorCenterX(targetShape)

        if (message.sourceId === message.targetId) {
          const controlX1 = sourceCenterX + SELF_MESSAGE_WIDTH
          const controlX2 = sourceCenterX + SELF_MESSAGE_WIDTH
          const midY = baseY + SELF_MESSAGE_HEIGHT / 2
          const endY = baseY + SELF_MESSAGE_HEIGHT
          const path = `M ${sourceCenterX} ${baseY} C ${controlX1} ${baseY}, ${controlX2} ${midY}, ${sourceCenterX + SELF_MESSAGE_WIDTH} ${midY} C ${controlX1} ${midY}, ${controlX2} ${endY}, ${sourceCenterX} ${endY}`
          return (
            <g key={`message-${index}`}>
              <path
                d={path}
                fill="none"
                stroke={isSelected ? '#4a90d9' : '#333'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                markerEnd="url(#sequenceArrowSolid)"
                onClick={() => toggleElement(elementId)}
                style={{ cursor: 'pointer' }}
              />
              {message.label && (
                <text
                  x={sourceCenterX + SELF_MESSAGE_WIDTH / 2}
                  y={baseY - 8}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={12}
                  fill={isSelected ? '#4a90d9' : '#555'}
                  fontWeight={isSelected ? 600 : 400}
                  onClick={() => toggleElement(elementId)}
                  style={{ cursor: 'pointer' }}
                >
                  {message.label}
                </text>
              )}
            </g>
          )
        }

        const { strokeDasharray, markerEnd } = arrowStyle(message.type)
        return (
          <g key={`message-${index}`}>
            <line
              x1={sourceCenterX}
              y1={baseY}
              x2={targetCenterX}
              y2={baseY}
              stroke={isSelected ? '#4a90d9' : '#333'}
              strokeWidth={isSelected ? 2.5 : 1.5}
              strokeDasharray={isSelected ? '4 2' : strokeDasharray}
              markerEnd={markerEnd}
              onClick={() => toggleElement(elementId)}
              style={{ cursor: 'pointer' }}
            />
            {message.label && (
              <text
                x={(sourceCenterX + targetCenterX) / 2}
                y={baseY - 8}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={12}
                fill={isSelected ? '#4a90d9' : '#555'}
                fontWeight={isSelected ? 600 : 400}
                onClick={() => toggleElement(elementId)}
                style={{ cursor: 'pointer' }}
              >
                {message.label}
              </text>
            )}
          </g>
        )
      })}

      {notes.map((note, index) => {
        if (note.actorNames.length === 0) return null
        const primaryShape = actorMap.get(note.actorNames[0]!)
        if (!primaryShape) return null

        const elementId = `note-${index}`
        const isSelected = selectedIds.has(elementId)
        const primaryCenterX = getActorCenterX(primaryShape)
        const primaryBottomY = getActorBottomY(primaryShape)
        const noteY = primaryBottomY + index * (NOTE_HEIGHT + 20) + 20

        let noteX = primaryCenterX - NOTE_WIDTH / 2
        let noteWidth = NOTE_WIDTH

        if (note.placement === 'right of') {
          noteX = primaryShape.position.x + primaryShape.dimensions.width + 10
        } else if (note.placement === 'left of') {
          noteX = primaryShape.position.x - NOTE_WIDTH - 10
        } else if (note.placement === 'over' && note.actorNames.length > 1) {
          const secondaryShape = actorMap.get(note.actorNames[1]!)
          if (secondaryShape) {
            const leftX = Math.min(primaryShape.position.x, secondaryShape.position.x)
            const rightX = Math.max(
              primaryShape.position.x + primaryShape.dimensions.width,
              secondaryShape.position.x + secondaryShape.dimensions.width
            )
            noteX = leftX - 10
            noteWidth = rightX - leftX + 20
          }
        }

        return (
          <g key={`note-${index}`}>
            <rect
              x={noteX}
              y={noteY}
              width={noteWidth}
              height={NOTE_HEIGHT}
              rx={4}
              fill={isSelected ? '#fff68f' : '#fffacd'}
              stroke={isSelected ? '#4a90d9' : '#999'}
              strokeWidth={isSelected ? 2 : 1}
              onClick={() => toggleElement(elementId)}
              style={{ cursor: 'pointer' }}
            />
            <text
              x={noteX + noteWidth / 2}
              y={noteY + NOTE_HEIGHT / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Arial, sans-serif"
              fontSize={11}
              fill="#333"
              onClick={() => toggleElement(elementId)}
              style={{ cursor: 'pointer' }}
            >
              {note.text}
            </text>
          </g>
        )
      })}
    </g>
  )
}
