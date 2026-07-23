import { useDiagramStore } from '../../store/diagramStore'
import type { TimelineEvent } from '../../mermaid/parseTimeline'

const PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

const EVENT_R = 7
const SIDE_MARGIN = 60
const EVENT_GAP_X = 100
const TIMELINE_Y = 120
const SECTION_H = 60

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

  const totalWidth = Math.max(600, events.length * EVENT_GAP_X + SIDE_MARGIN * 2)
  const midX = totalWidth / 2

  return (
    <g>
      {title && (
        <text x={midX} y={30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={17} fontWeight={700} fill="#333">
          {title}
        </text>
      )}

      <line x1={SIDE_MARGIN} y1={TIMELINE_Y} x2={totalWidth - SIDE_MARGIN} y2={TIMELINE_Y} stroke="#b0b0b0" strokeWidth={2} />

      {(() => {
        let globalIndex = 0
        const sectionColors: Array<{ name: string; color: string }> = []
        if (sections) {
          const entries = Object.entries(sections)
          for (let si = 0; si < entries.length; si++) {
            const [sectionName] = entries[si]!
            sectionColors.push({
              name: sectionName,
              color: PALETTE[si % PALETTE.length]!,
            })
          }
        }

        if (sections) {
          return Object.entries(sections).map(([sectionName, sectionEvents], si) => {
            const secColor = PALETTE[si % PALETTE.length]!
            const secKey = `section-${sectionName}`
            const isSecSelected = selectedIds.has(secKey)
            const startX = SIDE_MARGIN + sectionEvents.length * EVENT_GAP_X / 2
            const secY = TIMELINE_Y + 30

            return (
              <g key={sectionName}>
                <rect
                  x={startX - 40}
                  y={secY - 6}
                  width={sectionEvents.length * EVENT_GAP_X + 80}
                  height={SECTION_H}
                  rx={6}
                  fill={secColor}
                  opacity={0.08}
                  stroke={isSecSelected ? '#4a90d9' : 'none'}
                  strokeWidth={isSecSelected ? 1.5 : 0}
                  strokeDasharray={isSecSelected ? '4 2' : undefined}
                  onClick={() => toggleElement(secKey)}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  x={startX}
                  y={secY + 6}
                  textAnchor="middle"
                  fontFamily="Arial, sans-serif"
                  fontSize={11}
                  fontWeight={600}
                  fill="#666"
                >
                  {sectionName}
                </text>
                {sectionEvents.map((event, j) => {
                  const ei = globalIndex++
                  const ex = SIDE_MARGIN + ei * EVENT_GAP_X
                  const elementKey = `event-${ei}`
                  const color = diagramColors[elementKey] ?? secColor
                  const isSelected = selectedIds.has(elementKey)
                  const isUp = ei % 2 === 0

                  return (
                    <g key={`${sectionName}-${j}`}>
                      <line x1={ex} y1={TIMELINE_Y} x2={ex} y2={isUp ? TIMELINE_Y - 16 : TIMELINE_Y + 16} stroke="#b0b0b0" strokeWidth={1} />
                      <circle
                        cx={ex}
                        cy={TIMELINE_Y}
                        r={EVENT_R}
                        fill={color}
                        stroke={isSelected ? '#4a90d9' : 'white'}
                        strokeWidth={isSelected ? 2.5 : 2}
                        strokeDasharray={isSelected ? '4 2' : undefined}
                        onClick={() => toggleElement(elementKey)}
                        style={{ cursor: 'pointer' }}
                      />
                      <text
                        x={ex}
                        y={isUp ? TIMELINE_Y - 30 : TIMELINE_Y + 34}
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                        fontSize={11}
                        fontWeight={600}
                        fill="#333"
                      >
                        {event.date}
                      </text>
                      <text
                        x={ex}
                        y={isUp ? TIMELINE_Y - 44 : TIMELINE_Y + 48}
                        textAnchor="middle"
                        fontFamily="Arial, sans-serif"
                        fontSize={10}
                        fill="#666"
                      >
                        {event.title}
                      </text>
                    </g>
                  )
                })}
              </g>
            )
          })
        }

        return events.map((event, i) => {
          const ex = SIDE_MARGIN + i * EVENT_GAP_X
          const elementKey = `event-${i}`
          const color = diagramColors[elementKey] ?? PALETTE[i % PALETTE.length]!
          const isSelected = selectedIds.has(elementKey)
          const isUp = i % 2 === 0

          return (
            <g key={i}>
              <line x1={ex} y1={TIMELINE_Y} x2={ex} y2={isUp ? TIMELINE_Y - 16 : TIMELINE_Y + 16} stroke="#b0b0b0" strokeWidth={1} />
              <circle
                cx={ex}
                cy={TIMELINE_Y}
                r={EVENT_R}
                fill={color}
                stroke={isSelected ? '#4a90d9' : 'white'}
                strokeWidth={isSelected ? 2.5 : 2}
                strokeDasharray={isSelected ? '4 2' : undefined}
                onClick={() => toggleElement(elementKey)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={ex}
                y={isUp ? TIMELINE_Y - 30 : TIMELINE_Y + 34}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={11}
                fontWeight={600}
                fill="#333"
              >
                {event.date}
              </text>
              <text
                x={ex}
                y={isUp ? TIMELINE_Y - 44 : TIMELINE_Y + 48}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize={10}
                fill="#666"
              >
                {event.title}
              </text>
            </g>
          )
        })
      })()}
    </g>
  )
}
