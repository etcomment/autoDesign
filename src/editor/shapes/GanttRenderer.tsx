import { useDiagramStore } from '../../store/diagramStore'
import type { GanttTask } from '../../mermaid/parseGantt'

const DEFAULT_PALETTE = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
  '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
  '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000',
  '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9',
]

function parseDate(dateStr: string): Date | null {
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? null : d
}

function daysBetween(a: Date, b: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000
  return Math.round((b.getTime() - a.getTime()) / msPerDay)
}

export function GanttRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'gantt' || !diagramData?.sections) return null
  const data = diagramData as unknown as { title?: string; dateFormat?: string; sections: Record<string, GanttTask[]> }

  const labelWidth = 200
  const barAreaStart = labelWidth + 20
  const rowHeight = 30
  const dayWidth = 20

  const allTasks: GanttTask[] = Object.values(data.sections).flat()
  const startDates = allTasks.map(t => t.start ? parseDate(t.start) : null).filter((d): d is Date => d !== null)
  const earliest = startDates.length > 0 ? new Date(Math.min(...startDates.map(d => d.getTime()))) : null

  const taskEndX = new Map<string, number>()

  let y = 60
  const children: React.ReactElement[] = []

  if (data.title) {
    children.push(
      <text key="title" x={barAreaStart + 100} y={30} fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">
        {data.title}
      </text>
    )
  }

  for (const [sectionName, tasks] of Object.entries(data.sections)) {
    children.push(
      <text key={`s-${sectionName}`} x={10} y={y + 16} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
        {sectionName}
      </text>
    )
    y += rowHeight

    for (let ti = 0; ti < tasks.length; ti++) {
      const task = tasks[ti]!
      const taskY = y
      y += rowHeight

      let x = barAreaStart
      const duration = task.duration ?? 5

      if (task.start && earliest) {
        const d = parseDate(task.start)
        if (d) x = barAreaStart + daysBetween(earliest, d) * dayWidth
      } else if (task.after) {
        x = (taskEndX.get(task.after) ?? barAreaStart) + 10
      }

      const width = Math.max(40, duration * dayWidth)
      taskEndX.set(task.id ?? task.name, x + width)

      const elementKey = `task-${task.id ?? task.name}`
      const color = diagramColors[elementKey] ?? DEFAULT_PALETTE[ti % 20]
      const isSelected = selectedIds.has(elementKey)

      children.push(
        <g key={`${sectionName}-${ti}`}>
          <text x={20} y={taskY + rowHeight - 8} fontFamily="Arial, sans-serif" fontSize={11} fill="#555">{task.name}</text>
          <rect
            x={x}
            y={taskY + 4}
            width={width}
            height={20}
            rx={3}
            fill={color}
            opacity={0.85}
            stroke={isSelected ? '#4a90d9' : undefined}
            strokeWidth={isSelected ? 2 : undefined}
            strokeDasharray={isSelected ? '4 2' : undefined}
            onClick={() => toggleElement(elementKey)}
            style={{ cursor: 'pointer' }}
          />
          <text x={x + 6} y={taskY + 18} fontFamily="Arial, sans-serif" fontSize={10} fill="white">
            {duration}d
          </text>
        </g>
      )
    }
  }

  return <g>{children}</g>
}
