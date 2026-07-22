import { useDiagramStore } from '../../store/diagramStore'
import type { TimelineEvent } from '../../mermaid/parseTimeline'

const COLORS = ['#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0']

export function TimelineRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'timeline' || !diagramData?.events) return null
  const events = diagramData.events as TimelineEvent[]
  const sections = diagramData.sections as Record<string, TimelineEvent[]> | undefined

  let y = 40

  const renderSection = (title: string, sectionEvents: TimelineEvent[], color: string) => {
    const el = (
      <g key={title}>
        <text x={30} y={y + 5} fontFamily="Arial, sans-serif" fontSize={14} fontWeight={600} fill={color}>{title}</text>
        {sectionEvents.map((event, j) => {
          y += 55
          return (
            <g key={`${title}-${j}`}>
              <circle cx={50} cy={y} r={6} fill={color} />
              <line x1={50} y1={y + 6} x2={50} y2={y + 30} stroke="#ccc" strokeWidth={2} />
              <text x={70} y={y - 5} fontFamily="Arial, sans-serif" fontSize={12} fontWeight={600} fill="#333">{event.date}</text>
              <text x={70} y={y + 10} fontFamily="Arial, sans-serif" fontSize={11} fill="#666">{event.title}</text>
              {event.description && (
                <text x={70} y={y + 24} fontFamily="Arial, sans-serif" fontSize={10} fill="#999">{event.description}</text>
              )}
            </g>
          )
        })}
        y += 20
        {el}
      </g>
    )
    return el
  }

  if (sections) {
    return (
      <g>
        <line x1={50} y1={40} x2={50} y2={y + 1000} stroke="#ddd" strokeWidth={2} />
        {Object.entries(sections).map(([title, evts], i) => renderSection(title, evts, COLORS[i % COLORS.length]!))}
      </g>
    )
  }

  return (
    <g>
      <line x1={50} y1={40} x2={50} y2={y + events.length * 70} stroke="#ddd" strokeWidth={2} />
      {renderSection('Timeline', events, COLORS[0]!)}
    </g>
  )
}
