import { useDiagramStore } from '../../store/diagramStore'
import type { JourneyData } from '../../mermaid/parseUserJourney'

const SCORE_COLORS: Record<number, string> = { 1: '#f44336', 2: '#ff9800', 3: '#ffc107', 4: '#8bc34a', 5: '#4caf50' }

const BAR_W = 160
const BAR_H = 28
const TASK_GAP = 12
const SECTION_GAP = 40
const LEFT_MARGIN = 120
const TOP_MARGIN = 60
export function UserJourneyRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'userJourney' || !diagramData) return null
  const data = diagramData as unknown as JourneyData

  const allActors = new Set<string>()
  for (const section of data.sections) {
    for (const task of section.tasks) {
      for (const actor of task.actors) allActors.add(actor)
    }
  }
  const actorList = Array.from(allActors)
  const actorBarH = 14
  const actorAreaH = actorList.length * actorBarH + 6

  const children: React.ReactElement[] = []

  if (data.title) {
    children.push(
      <text key="title" x={LEFT_MARGIN} y={25} fontFamily="Arial, sans-serif" fontSize={17} fontWeight={700} fill="#333">
        {data.title}
      </text>
    )
  }

  const scoreLegend = [1, 2, 3, 4, 5]
  scoreLegend.forEach((score, i) => {
    const lx = LEFT_MARGIN + i * 80
    children.push(
      <g key={`legend-${score}`} transform={`translate(${lx}, 40)`}>
        <rect width={14} height={14} rx={2} fill={SCORE_COLORS[score]!} />
        <text x={20} y={11} fontFamily="Arial, sans-serif" fontSize={10} fill="#555">{score}</text>
      </g>
    )
  })

  let y = TOP_MARGIN
  let globalIndex = 0

  for (let si = 0; si < data.sections.length; si++) {
    const section = data.sections[si]!
    const secElementKey = `section-${section.title}`
    const isSecSelected = selectedIds.has(secElementKey)

    children.push(
      <g key={`section-${si}`}>
        <text
          x={LEFT_MARGIN}
          y={y + 6}
          fontFamily="Arial, sans-serif"
          fontSize={13}
          fontWeight={700}
          fill="#555"
          onClick={() => toggleElement(secElementKey)}
          style={{ cursor: 'pointer' }}
        >
          {section.title}
        </text>
        {isSecSelected && (
          <rect
            x={LEFT_MARGIN - 6}
            y={y - 10}
            width={data.sections.reduce((max, sec) => {
              const w = sec.tasks.length * (BAR_W + TASK_GAP) - TASK_GAP + 12
              return Math.max(max, w)
            }, 400)}
            height={24}
            rx={4}
            fill="none"
            stroke="#4a90d9"
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />
        )}
      </g>
    )

    y += 28

    for (let ti = 0; ti < section.tasks.length; ti++) {
      const task = section.tasks[ti]!
      const elementKey = `task-${globalIndex}`
      const color = diagramColors[elementKey] ?? SCORE_COLORS[task.score] ?? '#999'
      const isSelected = selectedIds.has(elementKey)
      const x = LEFT_MARGIN + globalIndex * (BAR_W + TASK_GAP)

      children.push(
        <g key={`task-${globalIndex}`}>
          <rect
            x={x}
            y={y}
            width={BAR_W}
            height={BAR_H}
            rx={4}
            fill={color}
            opacity={0.75}
            stroke={isSelected ? '#4a90d9' : undefined}
            strokeWidth={isSelected ? 2 : undefined}
            strokeDasharray={isSelected ? '4 2' : undefined}
            onClick={() => toggleElement(elementKey)}
            style={{ cursor: 'pointer' }}
          />
          <text
            x={x + BAR_W / 2}
            y={y + BAR_H / 2 + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={10}
            fill="white"
            fontWeight={600}
            pointerEvents="none"
          >
            {task.name}
          </text>
          <text
            x={x + BAR_W / 2}
            y={y + BAR_H / 2 - 8}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={9}
            fill="white"
            opacity={0.8}
            pointerEvents="none"
          >
            {'★'.repeat(task.score)}
          </text>
          {task.actors.length > 0 && (
            <text
              x={x + BAR_W / 2}
              y={y + BAR_H + 14}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={8}
              fill="#999"
            >
              {task.actors.join(', ')}
            </text>
          )}
        </g>
      )

      globalIndex++
    }

    y += BAR_H + actorAreaH + SECTION_GAP
  }

  return <g>{children}</g>
}
