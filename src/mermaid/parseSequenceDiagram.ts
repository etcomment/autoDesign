import { DiagramModel } from '../core/model/DiagramModel'

export interface SequenceParticipant {
  name: string
  shapeId: string
}

export interface SequenceMessage {
  sourceId: string
  targetId: string
  label: string
  type: 'solid' | 'dashed'
}

export interface SequenceData {
  participants: SequenceParticipant[]
  messages: SequenceMessage[]
}

export function parseSequenceDiagram(dsl: string): { model: DiagramModel; sequenceData: SequenceData } {
  const model = new DiagramModel()
  const participants: SequenceParticipant[] = []
  const messages: SequenceMessage[] = []

  const participantsByName = new Map<string, SequenceParticipant>()
  const lines = dsl.split('\n')

  let participantIndex = 0
  let noteIndex = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%')) continue

    if (/^sequenceDiagram/i.test(trimmed)) continue

    if (/^(?:box|end|loop|alt|opt|par|critical|break|else|option|rect)\b/i.test(trimmed)) continue

    if (/^autonumber\b/i.test(trimmed)) continue

    if (/^links?\s+/i.test(trimmed)) continue

    if (/^(?:activate|deactivate)\s+/i.test(trimmed)) continue

    const createMatch = /^create\s+(?:participant|actor)\s+(\w[\w-]*)(?:\s+as\s+(\w[\w-]*))?\s*$/i.exec(trimmed)
    if (createMatch) {
      const internalId = createMatch[1]!
      const displayName = createMatch[2] ?? internalId
      if (!participantsByName.has(internalId)) {
        const x = 100 + participantIndex * 200
        const shape = model.addShape('rectangle', { x, y: 20 }, { width: 140, height: 50 })
        model.updateShapeText(shape.id, { content: displayName })
        const participant: SequenceParticipant = { name: internalId, shapeId: shape.id }
        participants.push(participant)
        participantsByName.set(internalId, participant)
        participantIndex++
      }
      continue
    }

    const quotedAsMatch = /^(?:participant|actor)\s+"([^"]+)"\s+as\s+(\w[\w-]*)\s*$/i.exec(trimmed)
    if (quotedAsMatch) {
      const displayName = quotedAsMatch[1]!
      const internalId = quotedAsMatch[2]!
      if (!participantsByName.has(internalId)) {
        const x = 100 + participantIndex * 200
        const shape = model.addShape('rectangle', { x, y: 20 }, { width: 140, height: 50 })
        model.updateShapeText(shape.id, { content: displayName })
        const participant: SequenceParticipant = { name: internalId, shapeId: shape.id }
        participants.push(participant)
        participantsByName.set(internalId, participant)
        participantIndex++
      }
      continue
    }

    const participantMatch = /^(?:participant|actor)\s+(\w[\w-]*)(?:\s+as\s+(.+))?\s*$/i.exec(trimmed)
    if (participantMatch) {
      const internalId = participantMatch[1]!
      let displayName = internalId
      if (participantMatch[2]) {
        displayName = participantMatch[2]!.replace(/^["'\s]+|["'\s]+$/g, '')
      }
      if (!participantsByName.has(internalId)) {
        const x = 100 + participantIndex * 200
        const shape = model.addShape('rectangle', { x, y: 20 }, { width: 140, height: 50 })
        model.updateShapeText(shape.id, { content: displayName })
        const participant: SequenceParticipant = { name: internalId, shapeId: shape.id }
        participants.push(participant)
        participantsByName.set(internalId, participant)
        participantIndex++
      }
      continue
    }

    const noteMatch = /^Note\s+(right of|left of|over)\s+(\w[\w-]*)(?:\s*,\s*(\w[\w-]*))?\s*:\s*(.*)$/i.exec(trimmed)
    if (noteMatch) {
      const placement = noteMatch[1]!.toLowerCase() as 'right of' | 'left of' | 'over'
      const actorName1 = noteMatch[2]!
      const actorName2 = noteMatch[3]
      const text = (noteMatch[4] ?? '').trim()

      const participant1 = participantsByName.get(actorName1)
      if (participant1) {
        const shape1 = model.getShape(participant1.shapeId)
        if (shape1) {
          let x = shape1.position.x
          let y = shape1.position.y + shape1.dimensions.height + 20 + noteIndex * 30
          let width = 140

          if (placement === 'right of') {
            x = shape1.position.x + shape1.dimensions.width + 20
          } else if (placement === 'left of') {
            x = shape1.position.x - 160
          } else if (placement === 'over') {
            if (actorName2) {
              const participant2 = participantsByName.get(actorName2)
              if (participant2) {
                const shape2 = model.getShape(participant2.shapeId)
                if (shape2) {
                  const x1 = Math.min(shape1.position.x, shape2.position.x)
                  const x2 = Math.max(shape1.position.x + shape1.dimensions.width, shape2.position.x + shape2.dimensions.width)
                  x = x1 - 10
                  width = x2 - x1 + 20
                  y = Math.min(shape1.position.y, shape2.position.y) - 40
                }
              }
            } else {
              x = shape1.position.x - 10
              y = shape1.position.y - 40
            }
          }

          const noteShape = model.addShape('stadium', { x, y }, { width, height: 50 })
          model.updateShapeText(noteShape.id, { content: text, fontSize: 11 })
          model.updateShapeStyle(noteShape.id, { fill: '#ffffcc', stroke: '#999999' })
          noteIndex++
        }
      }
      continue
    }

    const messageMatch = /^(\S+?)\s*(-->>|->>|-->|--x|-x|->|--|\)-)\s*(\S+)\s*:?\s*(.*)$/.exec(trimmed)
    if (messageMatch) {
      const sourceName = messageMatch[1]!
      const arrowType = messageMatch[2]!
      let targetName = messageMatch[3]!
      let label = (messageMatch[4] ?? '').trim()

      const colonInTarget = targetName.indexOf(':')
      if (colonInTarget >= 0) {
        const afterColon = targetName.slice(colonInTarget + 1)
        targetName = targetName.slice(0, colonInTarget)
        if (afterColon && !label) label = afterColon
      }

      for (const name of [sourceName, targetName]) {
        if (!participantsByName.has(name)) {
          const x = 100 + participantIndex * 200
          const shape = model.addShape('rectangle', { x, y: 20 }, { width: 140, height: 50 })
          model.updateShapeText(shape.id, { content: name })
          const participant: SequenceParticipant = { name, shapeId: shape.id }
          participants.push(participant)
          participantsByName.set(name, participant)
          participantIndex++
        }
      }

      const sourceParticipant = participantsByName.get(sourceName)!
      const targetParticipant = participantsByName.get(targetName)!

      model.addConnection(sourceParticipant.shapeId, targetParticipant.shapeId, label || undefined)

      const message: SequenceMessage = {
        sourceId: sourceParticipant.shapeId,
        targetId: targetParticipant.shapeId,
        label,
        type: arrowType.startsWith('--') ? 'dashed' : 'solid',
      }
      messages.push(message)
      continue
    }
  }

  return { model, sequenceData: { participants, messages } }
}

export function isSequenceDiagram(dsl: string): boolean {
  return /^\s*sequenceDiagram/mi.test(dsl)
}

export function isClassDiagram(dsl: string): boolean {
  return /^\s*classDiagram/mi.test(dsl)
}
