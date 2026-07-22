import { useDiagramStore } from '../../store/diagramStore'
import type { TimelineEvent } from '../../mermaid/parseTimeline'

const DEFAULT_PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

export function TimelineRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'timeline' || !diagramData?.events) return null
  const events = diagramData.events as TimelineEvent[]
  const sections = diagramData.sections as Record<string, TimelineEvent[]> | undefined
  const title = diagramData.title as string | undefined

  let y = 40

  const renderSection = (sectionTitle: string, sectionEvents: TimelineEvent[], startY: number, startIndex: number) => {
    return (
      <g>
        <text x={30} y={startY + 5} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill="#333">{sectionTitle}</text>
        {sectionEvents.map((event, j) => {
          const ey = startY + 30 + j * 55
          const globalIndex = startIndex + j
          const elementKey = `event-${globalIndex}`
          const color = diagramColors[elementKey] ?? DEFAULT_PALETTE[globalIndex % 20]
          const isSelected = selectedIds.has(elementKey)
          return (
            <g key={`${sectionTitle}-${j}`}>
              <circle
                cx={50}
                cy={ey}
                r={6}
                fill={color}
                stroke={isSelected ? '#4a90d9' : undefined}
                strokeWidth={isSelected ? 2 : undefined}
                strokeDasharray={isSelected ? '4 2' : undefined}
                onClick={() => toggleElement(elementKey)}
                style={{ cursor: 'pointer' }}
              />
              <text x={70} y={ey - 5} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">{event.date}</text>
              <text x={70} y={ey + 10} fontFamily="Arial, sans-serif" fontSize={11} fill="#666">{event.title}</text>
              {event.description && (
                <text x={70} y={ey + 24} fontFamily="Arial, sans-serif" fontSize={10} fill="#999">{event.description}</text>
              )}
            </g>
          )
        })}
      </g>
    )
  }

  if (sections) {
    const entries = Object.entries(sections)
    let yPos = 40
    let eventIndex = 0
    return (
      <g>
        {title && (
          <text x={50} y={25} fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">{title}</text>
        )}
        <line x1={50} y1={40} x2={50} y2={40 + 1000} stroke="#ddd" strokeWidth={2} />
        {entries.map(([sectionTitle, evts]) => {
          const sectionEl = renderSection(sectionTitle, evts, yPos, eventIndex)
          yPos += 30 + evts.length * 55
          eventIndex += evts.length
          return <g key={sectionTitle}>{sectionEl}</g>
        })}
      </g>
    )
  }

  const timelineEl = renderSection('Timeline', events, y, 0)
  return (
    <g>
      {title && (
        <text x={50} y={25} fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">{title}</text>
      )}
      <line x1={50} y1={40} x2={50} y2={40 + events.length * 70} stroke="#ddd" strokeWidth={2} />
      {timelineEl}
    </g>
  )
}
