import { useDiagramStore } from '../../store/diagramStore'
import type { JourneyData } from '../../mermaid/parseUserJourney'

const SCORE_COLORS: Record<number, string> = { 1: '#f44336', 2: '#ff9800', 3: '#ffc107', 4: '#8bc34a', 5: '#4caf50' }

export function UserJourneyRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'userJourney' || !diagramData) return null
  const data = diagramData as unknown as JourneyData

  const barHeight = 30
  const taskWidth = 100
  const padding = 120

  return (
    <g>
      {data.title && (
        <text x={padding} y={25} fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">
          {data.title}
        </text>
      )}
      {data.sections.map((section, si) => {
        const totalTasks = data.sections.slice(0, si).reduce((sum, s) => sum + s.tasks.length, 0)

        return (
          <g key={section.title}>
            <text x={10} y={60 + si * 110} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
              {section.title}
            </text>
            {section.tasks.map((task, ti) => {
              const x = padding + (totalTasks + ti) * (taskWidth + 10)
              const y = 80 + si * 110
              const globalIndex = totalTasks + ti
              const elementKey = `task-${globalIndex}`
              const color = diagramColors[elementKey] ?? SCORE_COLORS[task.score] ?? '#999'
              const isSelected = selectedIds.has(elementKey)
              return (
                <g key={`${section.title}-${ti}`}>
                  <rect
                    x={x}
                    y={y}
                    width={taskWidth}
                    height={barHeight}
                    rx={4}
                    fill={color}
                    opacity={0.8}
                    stroke={isSelected ? '#4a90d9' : undefined}
                    strokeWidth={isSelected ? 2 : undefined}
                    strokeDasharray={isSelected ? '4 2' : undefined}
                    onClick={() => toggleElement(elementKey)}
                    style={{ cursor: 'pointer' }}
                  />
                  <text x={x + taskWidth / 2} y={y + barHeight / 2 + 4} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={10} fill="white" fontWeight={600}>
                    {task.name}
                  </text>
                  <text x={x + taskWidth / 2} y={y + barHeight + 15} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={9} fill="#666">
                    {task.actors.join(', ')}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </g>
  )
}
