import { useDiagramStore } from '../../store/diagramStore'

interface KanbanColumn {
  id: string
  title: string
}

interface KanbanTask {
  id: string
  title: string
  colIdx: number
  isCrit?: boolean
  isActive?: boolean
  isDone?: boolean
}

interface KanbanData {
  columns: KanbanColumn[]
  tasks: KanbanTask[]
  colors?: Record<string, string>
}

const COL_WIDTH = 200
const PADDING = 20
const CARD_WIDTH = COL_WIDTH - 1.5 * PADDING
const HEADER_HEIGHT = 44
const CARD_HEIGHT = 56
const CARD_GAP = 10
const START_X = 30
const START_Y = 30
const COL_GAP = 30
const CARD_OFFSET_X = (COL_WIDTH - CARD_WIDTH) / 2
const CARD_CONTENT_X = CARD_OFFSET_X + 8
const COL_RADIUS = 8

function sanitizeId(text: string): string {
  return text.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_-]/g, '')
}

export function KanbanRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'kanban' || !diagramData) return null

  const data = diagramData as unknown as KanbanData
  const { columns = [], tasks = [] } = data

  const columnTaskMap = new Map<number, KanbanTask[]>()
  for (const task of tasks) {
    const list = columnTaskMap.get(task.colIdx) ?? []
    list.push(task)
    columnTaskMap.set(task.colIdx, list)
  }

  const children: React.ReactElement[] = []

  for (let ci = 0; ci < columns.length; ci++) {
    const col = columns[ci]!
    const colTasks = columnTaskMap.get(ci) ?? []
    const tasksHeight = colTasks.length > 0
      ? colTasks.length * CARD_HEIGHT + (colTasks.length - 1) * CARD_GAP
      : 0
    const colH = HEADER_HEIGHT + PADDING + tasksHeight + PADDING
    const colX = START_X + ci * (COL_WIDTH + COL_GAP)
    const colY = START_Y
    const elementId = `col-${sanitizeId(col.title)}`
    const bgColor = diagramColors[elementId] ?? diagramColors[col.id] ?? data.colors?.[elementId] ?? '#f0f0f0'
    const isSelected = selectedIds.has(elementId) || selectedIds.has(col.id)

    children.push(
      <rect
        key={`col-bg-${col.id}`}
        x={colX}
        y={colY}
        width={COL_WIDTH}
        height={colH}
        rx={COL_RADIUS}
        ry={COL_RADIUS}
        fill={bgColor}
        stroke={isSelected ? '#2196F3' : '#555'}
        strokeWidth={isSelected ? 2 : 1}
        strokeDasharray={isSelected ? '4 2' : 'none'}
        cursor="pointer"
        onClick={() => toggleElement(elementId)}
      />
    )

    children.push(
      <text
        key={`col-title-${col.id}`}
        x={colX + COL_WIDTH / 2}
        y={colY + HEADER_HEIGHT / 2 + 5}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={14}
        fontWeight={700}
        fill="#333"
        pointerEvents="none"
      >
        {col.title}
      </text>
    )

    for (let ti = 0; ti < colTasks.length; ti++) {
      const task = colTasks[ti]!
      const taskElementId = `task-${sanitizeId(task.title)}`
      const isTaskSelected = selectedIds.has(taskElementId) || selectedIds.has(task.id)
      const tx = colX + CARD_OFFSET_X
      const ty = colY + HEADER_HEIGHT + PADDING + ti * (CARD_HEIGHT + CARD_GAP)

      children.push(
        <rect
          key={`task-bg-${task.id}`}
          x={tx}
          y={ty}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          rx={4}
          ry={4}
          fill="#fff"
          stroke={isTaskSelected ? '#2196F3' : '#ddd'}
          strokeWidth={isTaskSelected ? 2 : 1}
          strokeDasharray={isTaskSelected ? '4 2' : 'none'}
          cursor="pointer"
          onClick={() => toggleElement(taskElementId)}
        />
      )

      let stripColor = '#999'
      if (task.isCrit) stripColor = '#e91e63'
      else if (task.isActive) stripColor = '#2196F3'
      else if (task.isDone) stripColor = '#4caf50'

      children.push(
        <rect
          key={`task-strip-${task.id}`}
          x={tx}
          y={ty + 3}
          width={4}
          height={CARD_HEIGHT - 6}
          rx={1}
          ry={1}
          fill={stripColor}
          opacity={0.85}
          pointerEvents="none"
        />
      )

      children.push(
        <text
          key={`task-title-${task.id}`}
          x={tx + CARD_CONTENT_X}
          y={ty + CARD_HEIGHT / 2 - 2}
          fontFamily="Arial, sans-serif"
          fontSize={12}
          fill="#333"
          fontWeight={600}
          pointerEvents="none"
        >
          {task.title}
        </text>
      )

      const badges: { label: string; color: string }[] = []
      if (task.isCrit) badges.push({ label: 'CRIT', color: '#e91e63' })
      if (task.isActive) badges.push({ label: 'ACTIVE', color: '#2196F3' })
      if (task.isDone) badges.push({ label: 'DONE', color: '#4caf50' })

      for (let bi = 0; bi < badges.length; bi++) {
        const badge = badges[bi]!
        const bx = tx + CARD_CONTENT_X + bi * 54
        const by = ty + CARD_HEIGHT - 18

        children.push(
          <rect
            key={`task-${task.id}-badge-bg-${badge.label}`}
            x={bx}
            y={by}
            width={48}
            height={14}
            rx={3}
            ry={3}
            fill={badge.color}
            opacity={0.85}
            pointerEvents="none"
          />
        )
        children.push(
          <text
            key={`task-${task.id}-badge-txt-${badge.label}`}
            x={bx + 24}
            y={by + 10}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={7}
            fontWeight={700}
            fill="#fff"
            pointerEvents="none"
          >
            {badge.label}
          </text>
        )
      }
    }
  }

  return <g>{children}</g>
}
