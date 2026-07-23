import { useMemo, type ReactElement } from 'react'
import { useDiagramStore } from '../../store/diagramStore'
import type { SequenceData, SequenceMessage, SequenceMessageType, SequenceNote } from '../../mermaid/parseSequenceDiagram'

const ACTOR_WIDTH = 140
const ACTOR_HEIGHT = 50
const ACTOR_GAP = 120
const FIRST_ACTOR_X = 80
const ACTOR_Y = 20
const MESSAGE_SPACING = 60
const ACTIVATION_WIDTH = 12
const NOTE_WIDTH = 130
const NOTE_MIN_HEIGHT = 40
const BOX_PADDING = 20
const BOTTOM_MARGIN = 80
const SELF_MESSAGE_WIDTH = 60
const SELF_MESSAGE_HEIGHT = 50

function getActorX(index: number): number {
  return FIRST_ACTOR_X + index * (ACTOR_WIDTH + ACTOR_GAP)
}

function getActorCenterX(index: number): number {
  return getActorX(index) + ACTOR_WIDTH / 2
}

function getLifelineTopY(): number {
  return ACTOR_Y + ACTOR_HEIGHT
}

function getMessageY(index: number): number {
  return getLifelineTopY() + index * MESSAGE_SPACING + MESSAGE_SPACING / 2
}

function getBoxY(messageIndex: number): number {
  return getLifelineTopY() + messageIndex * MESSAGE_SPACING
}

function buildActorIndexMap(sequenceData: SequenceData): Map<string, number> {
  const map = new Map<string, number>()
  sequenceData.participants.forEach((participant, index) => {
    map.set(participant.name, index)
  })
  return map
}

function messageStyle(type: SequenceMessageType): { strokeDasharray: string | undefined; markerEnd: string | undefined } {
  switch (type) {
    case 'dashed':
    case 'dotted-open':
      return { strokeDasharray: '6 4', markerEnd: type === 'dotted-open' ? 'url(#sequenceArrowOpen)' : 'url(#sequenceArrowSolid)' }
    case 'open':
      return { strokeDasharray: undefined, markerEnd: 'url(#sequenceArrowOpen)' }
    case 'cross':
      return { strokeDasharray: undefined, markerEnd: 'url(#sequenceCross)' }
    case 'solid':
    case 'filled':
    default:
      return { strokeDasharray: undefined, markerEnd: 'url(#sequenceArrowSolid)' }
  }
}

function renderMessagePath(message: SequenceMessage, index: number, actorIndexMap: Map<string, number>, isSelected: boolean): ReactElement {
  const elementId = `message-${index}`
  const baseY = getMessageY(index)
  const sourceIndex = actorIndexMap.get(message.sourceName)
  const targetIndex = actorIndexMap.get(message.targetName)
  if (sourceIndex === undefined || targetIndex === undefined) return <g key={elementId} />

  const sourceX = getActorCenterX(sourceIndex)
  const targetX = getActorCenterX(targetIndex)
  const stroke = isSelected ? '#4a90d9' : '#333'
  const strokeWidth = isSelected ? 2.5 : 1.5

  if (sourceIndex === targetIndex) {
    const controlX1 = sourceX + SELF_MESSAGE_WIDTH
    const controlX2 = sourceX + SELF_MESSAGE_WIDTH
    const midY = baseY + SELF_MESSAGE_HEIGHT / 2
    const endY = baseY + SELF_MESSAGE_HEIGHT
    const path = `M ${sourceX} ${baseY} C ${controlX1} ${baseY}, ${controlX2} ${midY}, ${sourceX + SELF_MESSAGE_WIDTH / 2} ${midY} C ${sourceX} ${midY}, ${sourceX} ${endY}, ${sourceX} ${endY}`
    return (
      <g key={elementId}>
        <path
          d={path}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          markerEnd="url(#sequenceArrowSolid)"
        />
        {message.label && (
          <text
            x={sourceX + SELF_MESSAGE_WIDTH / 2}
            y={baseY - 8}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={12}
            fill={isSelected ? '#4a90d9' : '#555'}
            fontWeight={isSelected ? 600 : 400}
          >
            {message.label}
          </text>
        )}
      </g>
    )
  }

  const { strokeDasharray, markerEnd } = messageStyle(message.type)
  return (
    <g key={elementId}>
      <line
        x1={sourceX}
        y1={baseY}
        x2={targetX}
        y2={baseY}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={isSelected ? '4 2' : strokeDasharray}
        markerEnd={markerEnd}
      />
      {message.label && (
        <text
          x={(sourceX + targetX) / 2}
          y={baseY - 8}
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={12}
          fill={isSelected ? '#4a90d9' : '#555'}
          fontWeight={isSelected ? 600 : 400}
        >
          {message.label}
        </text>
      )}
    </g>
  )
}

function renderNote(note: SequenceNote, index: number, actorIndexMap: Map<string, number>, isSelected: boolean, toggleElement: (id: string) => void): ReactElement | null {
  const elementId = `note-${index}`
  const primaryIndex = actorIndexMap.get(note.actorNames[0]!)
  if (primaryIndex === undefined) return null

  const primaryX = getActorX(primaryIndex)
  const primaryCenterX = getActorCenterX(primaryIndex)
  const noteY = getMessageY(note.messageIndex) - NOTE_MIN_HEIGHT / 2

  let noteX = primaryCenterX - NOTE_WIDTH / 2
  let noteWidth = NOTE_WIDTH

  if (note.placement === 'right of') {
    noteX = primaryX + ACTOR_WIDTH + 10
  } else if (note.placement === 'left of') {
    noteX = primaryX - NOTE_WIDTH - 10
  } else if (note.placement === 'over' && note.actorNames.length > 1) {
    const secondaryIndex = actorIndexMap.get(note.actorNames[1]!)
    if (secondaryIndex !== undefined) {
      const leftX = Math.min(primaryX, getActorX(secondaryIndex))
      const rightX = Math.max(primaryX + ACTOR_WIDTH, getActorX(secondaryIndex) + ACTOR_WIDTH)
      noteX = leftX - 10
      noteWidth = rightX - leftX + 20
    }
  }

  return (
    <g key={elementId} onClick={() => toggleElement(elementId)} style={{ cursor: 'pointer' }}>
      <rect
        x={noteX}
        y={noteY}
        width={noteWidth}
        height={NOTE_MIN_HEIGHT}
        rx={4}
        fill={isSelected ? '#fff68f' : '#fffacd'}
        stroke={isSelected ? '#4a90d9' : '#999'}
        strokeWidth={isSelected ? 2 : 1}
      />
      <text
        x={noteX + noteWidth / 2}
        y={noteY + NOTE_MIN_HEIGHT / 2 + 4}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={11}
        fill="#333"
      >
        {note.text}
      </text>
    </g>
  )
}

export function SequenceLifelines() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const sequenceData = useDiagramStore(s => s.sequenceData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  const layout = useMemo(() => {
    if (!sequenceData || sequenceData.participants.length === 0) return null

    const actorIndexMap = buildActorIndexMap(sequenceData)
    const maxMessageIndex = Math.max(sequenceData.messages.length, ...sequenceData.notes.map(n => n.messageIndex), 0)
    const maxBoxEnd = sequenceData.boxes.length > 0 ? Math.max(...sequenceData.boxes.map(box => box.endMessageIndex)) : 0
    const maxActivationEnd = sequenceData.activations.length > 0 ? Math.max(...sequenceData.activations.map(a => a.endMessageIndex)) : 0
    const diagramHeight = Math.max(maxMessageIndex, maxBoxEnd, maxActivationEnd) * MESSAGE_SPACING + MESSAGE_SPACING + BOTTOM_MARGIN

    return {
      actorIndexMap,
      diagramHeight,
      messages: sequenceData.messages,
      notes: sequenceData.notes,
      activations: sequenceData.activations,
      boxes: sequenceData.boxes,
      participants: sequenceData.participants,
    }
  }, [sequenceData])

  if (diagramType !== 'sequence' || !layout) return null

  const { actorIndexMap, diagramHeight, messages, notes, activations, boxes, participants } = layout

  return (
    <g>
      <defs>
        <marker
          id="sequenceArrowSolid"
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={6}
          markerHeight={6}
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#333" />
        </marker>
        <marker
          id="sequenceArrowOpen"
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={6}
          markerHeight={6}
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="#333" strokeWidth={1.5} />
        </marker>
        <marker
          id="sequenceCross"
          viewBox="0 0 10 10"
          refX={5}
          refY={5}
          markerWidth={8}
          markerHeight={8}
          orient="auto"
        >
          <path d="M 2 2 L 8 8 M 8 2 L 2 8" stroke="#333" strokeWidth={1.5} />
        </marker>
      </defs>

      {boxes.map((box, index) => {
        const actorIndices = box.actorNames
          .map(name => actorIndexMap.get(name))
          .filter((i): i is number => i !== undefined)
        if (actorIndices.length === 0) return null

        const minIndex = Math.min(...actorIndices)
        const maxIndex = Math.max(...actorIndices)
        const leftX = getActorX(minIndex) - BOX_PADDING
        const rightX = getActorX(maxIndex) + ACTOR_WIDTH + BOX_PADDING
        const startY = getBoxY(box.startMessageIndex)
        const endY = getBoxY(box.endMessageIndex)
        const elementId = `box-${index}`
        const isSelected = selectedIds.has(elementId)

        return (
          <g key={elementId} onClick={() => toggleElement(elementId)} style={{ cursor: 'pointer' }}>
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

      {participants.map((participant, index) => {
        const centerX = getActorCenterX(index)
        const elementId = `actor-${participant.name}`
        const isSelected = selectedIds.has(elementId)
        const color = diagramColors[elementId] ?? '#999'
        return (
          <line
            key={`lifeline-${participant.name}`}
            x1={centerX}
            y1={getLifelineTopY()}
            x2={centerX}
            y2={getLifelineTopY() + diagramHeight}
            stroke={color}
            strokeWidth={isSelected ? 2 : 1}
            strokeDasharray="6 4"
            onClick={() => toggleElement(elementId)}
            style={{ cursor: 'pointer' }}
          />
        )
      })}

      {activations.map((activation, index) => {
        const actorIndex = actorIndexMap.get(activation.actorName)
        if (actorIndex === undefined) return null
        const centerX = getActorCenterX(actorIndex)
        const startY = getMessageY(activation.startMessageIndex)
        const endY = getMessageY(activation.endMessageIndex)
        const elementId = `activation-${index}`
        const isSelected = selectedIds.has(elementId)
        return (
          <rect
            key={elementId}
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

      {messages.map((message, index) => (
        <g
          key={`message-group-${index}`}
          onClick={() => toggleElement(`message-${index}`)}
          style={{ cursor: 'pointer' }}
        >
          {renderMessagePath(message, index, actorIndexMap, selectedIds.has(`message-${index}`))}
        </g>
      ))}

      {notes.map((note, index) =>
        renderNote(note, index, actorIndexMap, selectedIds.has(`note-${index}`), toggleElement)
      )}

      {participants.map((participant, index) => {
        const x = getActorX(index)
        const y = ACTOR_Y
        const elementId = `actor-${participant.name}`
        const isSelected = selectedIds.has(elementId)
        const color = diagramColors[elementId] ?? '#999'
        return (
          <g key={elementId} onClick={() => toggleElement(elementId)} style={{ cursor: 'pointer' }}>
            <rect
              x={x}
              y={y}
              width={ACTOR_WIDTH}
              height={ACTOR_HEIGHT}
              rx={3}
              fill="#f5f5f5"
              stroke={color}
              strokeWidth={isSelected ? 2.5 : 1}
            />
            <text
              x={x + ACTOR_WIDTH / 2}
              y={y + ACTOR_HEIGHT / 2 + 5}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={14}
              fill="#333"
              fontWeight={isSelected ? 600 : 400}
            >
              {participant.name}
            </text>
          </g>
        )
      })}
    </g>
  )
}
