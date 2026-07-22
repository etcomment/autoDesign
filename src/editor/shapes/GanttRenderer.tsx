import { useDiagramStore } from '../../store/diagramStore'
import type { GanttTask } from '../../mermaid/parseGantt'

const COLORS = ['#4a90d9', '#4caf50', '#ff9800', '#e91e63', '#9c27b0', '#00bcd4', '#ff5722']

export function GanttRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'gantt' || !diagramData?.sections) return null
  const data = diagramData as { title?: string; sections: Record<string, GanttTask[]> }

  const labelWidth = 200
  const barAreaStart = labelWidth + 20
  const dayWidth = 30
  const rowHeight = 26
  let y = 60

  return (
    <g>
      {data.title && (
        <text x={barAreaStart} y={30} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={16} fontWeight={700} fill="#333">
          {data.title}
        </text>
      )}
      {Object.entries(data.sections).map(([sectionName, tasks], si) => (
        <g key={sectionName}>
          <text x={10} y={y + 14} fontFamily="Arial, sans-serif" fontSize={13} fontWeight={600} fill="#333">
            {sectionName}
          </text>
          {y += rowHeight}
          {tasks.map((task, ti) => {
            y += rowHeight
            return (
              <g key={`${sectionName}-${ti}`}>
                <text x={20} y={y - 4} fontFamily="Arial, sans-serif" fontSize={11} fill="#555">{task.name}</text>
                <rect x={barAreaStart} y={y - 16} width={180} height={18} rx={3}
                  fill={COLORS[(si + ti) % COLORS.length]!} opacity={0.85} />
                <text x={barAreaStart + 6} y={y - 3} fontFamily="Arial, sans-serif" fontSize={10} fill="white">
                  {task.duration ? `${task.duration}d` : ''}{task.after ? ` after ${task.after}` : ''}
                </text>
              </g>
            )
          })}
        </g>
      ))}
    </g>
  )
}
