import { useDiagramStore } from '../../store/diagramStore'
import type { GanttTask } from '../../mermaid/parseGantt'

const PALETTE = [
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
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

function formatShortDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

const LABEL_W = 180
const BAR_H = 22
const ROW_H = 32
const DAY_W = 22
const HEADER_H = 60
const GRID_COLOR = '#e0e0e0'

export function GanttRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'gantt' || !diagramData?.sections) return null
  const data = diagramData as unknown as { title?: string; dateFormat?: string; sections: Record<string, GanttTask[]> }

  const allTasks: GanttTask[] = Object.values(data.sections).flat()
  const startDates = allTasks.map(t => t.start ? parseDate(t.start) : null).filter((d): d is Date => d !== null)
  const earliest = startDates.length > 0 ? new Date(Math.min(...startDates.map(d => d.getTime()))) : null
  const latest = startDates.length > 0 ? new Date(Math.max(...startDates.map(d => d.getTime()))) : null

  const totalDays = earliest && latest ? Math.max(daysBetween(earliest, latest) + 14, 30) : 30
  const barAreaX = LABEL_W + 16
  const chartW = totalDays * DAY_W
  const sectionTasks: Array<[string, GanttTask[]]> = Object.entries(data.sections)
  let totalRows = 0
  for (const [, tasks] of sectionTasks) totalRows += 1 + tasks.length
  const chartH = HEADER_H + totalRows * ROW_H + 20

  const taskEndX = new Map<string, number>()

  const children: React.ReactElement[] = []

  children.push(
    <line key="grid-bottom" x1={barAreaX} y1={chartH} x2={barAreaX + chartW} y2={chartH} stroke={GRID_COLOR} strokeWidth={1} />
  )

  for (let d = 0; d <= totalDays; d++) {
    const x = barAreaX + d * DAY_W
    children.push(
      <line key={`grid-v-${d}`} x1={x} y1={HEADER_H} x2={x} y2={chartH} stroke={GRID_COLOR} strokeWidth={0.5} />
    )
    if (earliest) {
      const date = new Date(earliest.getTime() + d * 86400000)
      if (date.getDate() === 1 || d === 0 || d === totalDays) {
        children.push(
          <text key={`date-${d}`} x={x + 2} y={HEADER_H - 8} fontFamily="Arial, sans-serif" fontSize={9} fill="#666" transform={`rotate(-45, ${x + 2}, ${HEADER_H - 8})`}>
            {formatShortDate(date)}
          </text>
        )
      }
    }
  }

  if (data.title) {
    children.push(
      <text key="title" x={barAreaX + 10} y={22} fontFamily="Arial, sans-serif" fontSize={15} fontWeight={700} fill="#333">
        {data.title}
      </text>
    )
  }

  let y = HEADER_H
  let globalTi = 0

  for (const [sectionName, tasks] of sectionTasks) {
    const secElementKey = `section-${sectionName}`
    const secColor = diagramColors[secElementKey] ?? '#f0f0f0'
    const isSecSelected = selectedIds.has(secElementKey)

    children.push(
      <g key={`sec-${sectionName}`}>
        <rect
          x={barAreaX}
          y={y}
          width={chartW}
          height={ROW_H}
          fill={secColor}
          opacity={0.3}
          stroke={isSecSelected ? '#4a90d9' : undefined}
          strokeWidth={isSecSelected ? 1 : undefined}
          onClick={() => toggleElement(secElementKey)}
          style={{ cursor: 'pointer' }}
        />
        <text
          x={10}
          y={y + ROW_H / 2 + 5}
          fontFamily="Arial, sans-serif"
          fontSize={12}
          fontWeight={600}
          fill="#333"
        >
          {sectionName}
        </text>
      </g>
    )
    y += ROW_H

    for (let ti = 0; ti < tasks.length; ti++) {
      const task = tasks[ti]!
      const elementKey = task.id ? `task-${task.id}` : `task-${globalTi}`
      const color = diagramColors[elementKey] ?? PALETTE[globalTi % PALETTE.length]!
      const isSelected = selectedIds.has(elementKey)

      let taskX = barAreaX
      const duration = task.duration ?? 5
      let isMilestone = false
      if (task.start && earliest) {
        const d = parseDate(task.start)
        if (d) taskX = barAreaX + daysBetween(earliest, d) * DAY_W
      } else if (task.after) {
        taskX = (taskEndX.get(task.after) ?? barAreaX) + 10
      }
      if (duration === 0) isMilestone = true

      const width = isMilestone ? 0 : Math.max(DAY_W, duration * DAY_W)
      taskEndX.set(task.id ?? task.name, taskX + width)
      const taskMidY = y + ROW_H / 2

      if (isMilestone) {
        const ms = 8
        children.push(
          <g key={`${sectionName}-${ti}`}>
            <polygon
              points={`${taskX},${taskMidY} ${taskX + ms},${taskMidY - ms} ${taskX + ms * 2},${taskMidY} ${taskX + ms},${taskMidY + ms}`}
              fill={color}
              stroke={isSelected ? '#4a90d9' : 'white'}
              strokeWidth={isSelected ? 2 : 1.5}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            />
          </g>
        )
      } else {
        children.push(
          <g key={`${sectionName}-${ti}`}>
            <rect
              x={taskX}
              y={y + (ROW_H - BAR_H) / 2}
              width={width}
              height={BAR_H}
              rx={3}
              fill={color}
              opacity={0.85}
              stroke={isSelected ? '#4a90d9' : undefined}
              strokeWidth={isSelected ? 2 : undefined}
              strokeDasharray={isSelected ? '4 2' : undefined}
              onClick={() => toggleElement(elementKey)}
              style={{ cursor: 'pointer' }}
            />
            <text x={taskX + 6} y={y + ROW_H / 2 + 4} fontFamily="Arial, sans-serif" fontSize={10} fill="white" fontWeight={600}>
              {task.name}
            </text>
          </g>
        )
      }

      children.push(
        <text
          key={`task-label-${globalTi}`}
          x={10}
          y={y + ROW_H / 2 + 5}
          fontFamily="Arial, sans-serif"
          fontSize={11}
          fill="#555"
        >
          {task.name}
        </text>
      )

      y += ROW_H
      globalTi++
    }
  }

  return <g>{children}</g>
}
