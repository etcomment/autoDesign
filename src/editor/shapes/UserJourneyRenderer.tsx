import { useDiagramStore } from '../../store/diagramStore'
import type { JourneySection } from '../../mermaid/parseUserJourney'

const SCORE_COLORS: Record<number, string> = { 1: '#f44336', 2: '#ff9800', 3: '#ffc107', 4: '#8bc34a', 5: '#4caf50' }

export function UserJourneyRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'userJourney' || !diagramData) return null
  const sections = diagramData as JourneySection[]

  const totalTasks = sections.reduce((sum, s) => sum + s.tasks.length, 0)
  const barHeight = 30
  const taskWidth = 80
  const padding = 120

  return (
    <g>
      {sections.map((section, si) => {
        let sectionStart = 0
        for (let i = 0; i < si; i++) sectionStart += sections[i]!.tasks.length

        return (
          <g key={section.title}>
            <text x={10} y={40 + si * 120} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
              {section.title}
            </text>
            {section.tasks.map((task, ti) => {
              const x = padding + (sectionStart + ti) * (taskWidth + 8)
              const y = 60 + si * 120
              const color = SCORE_COLORS[task.score] ?? '#999'
              return (
                <g key={`${section.title}-${ti}`}>
                  <rect x={x} y={y} width={taskWidth} height={barHeight} rx={4} fill={color} opacity={0.8} />
                  <text x={x + taskWidth / 2} y={y + barHeight / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif"
                    fontSize={10} fill="white" fontWeight={600}>{task.name}</text>
                  <text x={x + taskWidth / 2} y={y + barHeight + 15} textAnchor="middle" fontFamily="Arial, sans-serif"
                    fontSize={9} fill="#666">{task.actors.join(', ')}</text>
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
