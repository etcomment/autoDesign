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

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^sequenceDiagram/i.test(trimmed)) continue

    const participantMatch = /^(?:participant|actor)\s+(\w[\w-]*)(?:\s+as\s+(\w[\w-]*))?\s*$/i.exec(trimmed)
    if (participantMatch) {
      const internalId = participantMatch[1]!
      const displayName = participantMatch[2] ?? internalId

      const x = 100 + participantIndex * 200
      const shape = model.addShape('rectangle', { x, y: 20 }, { width: 140, height: 50 })
      model.updateShapeText(shape.id, { content: displayName })

      const participant: SequenceParticipant = { name: internalId, shapeId: shape.id }
      participants.push(participant)
      participantsByName.set(internalId, participant)
      participantIndex++
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

      const sourceParticipant = participantsByName.get(sourceName)
      const targetParticipant = participantsByName.get(targetName)

      if (sourceParticipant && targetParticipant) {
        model.addConnection(sourceParticipant.shapeId, targetParticipant.shapeId)

        const message: SequenceMessage = {
          sourceId: sourceParticipant.shapeId,
          targetId: targetParticipant.shapeId,
          label,
          type: arrowType.startsWith('--') ? 'dashed' : 'solid',
        }
        messages.push(message)
      }
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
