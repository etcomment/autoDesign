import { useDiagramStore } from '../../store/diagramStore'

interface KanbanColumn {
  id: string
  title: string
}

interface KanbanTask {
  id: string
  title: string
  columnId: string
  modifiers: string[]
}

interface KanbanData {
  columns: KanbanColumn[]
  tasks: KanbanTask[]
  colors?: Record<string, string>
}

const COLUMN_WIDTH = 200
const COLUMN_GAP = 30
const HEADER_HEIGHT = 36
const CARD_MARGIN = 8
const CARD_PADDING = 10
const CARD_RADIUS = 6
const START_X = 30
const START_Y = 30
const TEXT_LINE_HEIGHT = 16
const BADGE_WIDTH = 40
const BADGE_HEIGHT = 14
const BADGE_GAP = 4
const BADGE_FONT_SIZE = 7
const STRIP_WIDTH = 4
const STRIP_OFFSET = 4
const MIN_CARD_HEIGHT = 56
const DEFAULT_COLUMN_BG = '#f5f5f5'
const DEFAULT_HEADER_BG = '#e0e0e0'
const SELECTION_STROKE = '#2196f3'
const DEFAULT_STRIP_COLOR = '#999'

const MODIFIER_COLORS: Record<string, string> = {
  crit: '#f44336',
  active: '#2196f3',
  done: '#4caf50',
}

const MODIFIER_LABELS: Record<string, string> = {
  crit: 'CRIT',
  active: 'ACTIVE',
  done: 'DONE',
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.startsWith('#') ? hex.slice(1) : hex
  if (normalized.length === 3) {
    const r = parseInt(normalized[0]! + normalized[0]!, 16)
    const g = parseInt(normalized[1]! + normalized[1]!, 16)
    const b = parseInt(normalized[2]! + normalized[2]!, 16)
    if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
    return { r, g, b }
  }
  if (normalized.length !== 6) return null
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
  return { r, g, b }
}

function darkenColor(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return DEFAULT_HEADER_BG
  const r = Math.max(0, rgb.r - 24)
  const g = Math.max(0, rgb.g - 24)
  const b = Math.max(0, rgb.b - 24)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (word.length === 0) continue
    const next = current ? `${current} ${word}` : word
    if (next.length > maxChars) {
      if (current) {
        lines.push(current)
        current = word
      } else {
        lines.push(word)
      }
    } else {
      current = next
    }
  }
  if (current) lines.push(current)
  return lines.length > 0 ? lines : [text]
}

function computeBadges(modifiers: string[]): { label: string; color: string }[] {
  const badges: { label: string; color: string }[] = []
  for (const modifier of modifiers) {
    const color = MODIFIER_COLORS[modifier]
    const label = MODIFIER_LABELS[modifier]
    if (color && label) {
      badges.push({ label, color })
    }
  }
  return badges
}

function computeCardHeight(title: string, hasBadges: boolean): number {
  const lines = wrapText(title, 18)
  const textHeight = lines.length * TEXT_LINE_HEIGHT
  const badgeArea = hasBadges ? BADGE_HEIGHT + 4 : 0
  return Math.max(MIN_CARD_HEIGHT, CARD_PADDING + textHeight + CARD_PADDING + badgeArea)
}

function getStripColor(modifiers: string[]): string {
  if (modifiers.includes('crit')) return MODIFIER_COLORS.crit!
  if (modifiers.includes('active')) return MODIFIER_COLORS.active!
  if (modifiers.includes('done')) return MODIFIER_COLORS.done!
  return DEFAULT_STRIP_COLOR
}

function columnElementId(title: string): string {
  return `col-${title}`
}

function taskElementId(title: string): string {
  return `task-${title}`
}

export function KanbanRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)
  const diagramColors = useDiagramStore(s => s.diagramColors)
  const selectedIds = useDiagramStore(s => s.selectedDiagramElementIds)
  const toggleElement = useDiagramStore(s => s.toggleDiagramElement)

  if (diagramType !== 'kanban' || !diagramData) return null

  const data = diagramData as unknown as KanbanData
  const columns = data.columns ?? []
  const tasks = data.tasks ?? []

  const tasksByColumn = new Map<string, KanbanTask[]>()
  for (const task of tasks) {
    const list = tasksByColumn.get(task.columnId) ?? []
    list.push(task)
    tasksByColumn.set(task.columnId, list)
  }

  const children: React.ReactElement[] = []

  for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
    const column = columns[columnIndex]!
    const columnTasks = tasksByColumn.get(column.id) ?? []
    const columnX = START_X + columnIndex * (COLUMN_WIDTH + COLUMN_GAP)
    const columnY = START_Y
    const columnId = columnElementId(column.title)

    let columnHeight = HEADER_HEIGHT + CARD_MARGIN
    if (columnTasks.length === 0) {
      columnHeight += 120
    } else {
      for (const task of columnTasks) {
        const badges = computeBadges(task.modifiers)
        columnHeight += computeCardHeight(task.title, badges.length > 0) + CARD_MARGIN
      }
    }

    const columnBg = diagramColors[columnId] ?? data.colors?.[columnId] ?? DEFAULT_COLUMN_BG
    const headerBg = darkenColor(columnBg)
    const isColumnSelected = selectedIds.has(columnId)

    children.push(
      <rect
        key={`column-bg-${column.id}`}
        x={columnX}
        y={columnY}
        width={COLUMN_WIDTH}
        height={columnHeight}
        rx={CARD_RADIUS}
        ry={CARD_RADIUS}
        fill={columnBg}
        stroke="none"
      />
    )

    children.push(
      <path
        key={`column-header-${column.id}`}
        d={`M ${columnX} ${columnY + HEADER_HEIGHT} L ${columnX} ${columnY + CARD_RADIUS} Q ${columnX} ${columnY} ${columnX + CARD_RADIUS} ${columnY} L ${columnX + COLUMN_WIDTH - CARD_RADIUS} ${columnY} Q ${columnX + COLUMN_WIDTH} ${columnY} ${columnX + COLUMN_WIDTH} ${columnY + CARD_RADIUS} L ${columnX + COLUMN_WIDTH} ${columnY + HEADER_HEIGHT} Z`}
        fill={headerBg}
        cursor="pointer"
        onClick={() => toggleElement(columnId)}
      />
    )

    children.push(
      <text
        key={`column-title-${column.id}`}
        x={columnX + COLUMN_WIDTH / 2}
        y={columnY + HEADER_HEIGHT / 2 + 5}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={13}
        fontWeight={700}
        fill="#333"
        pointerEvents="none"
      >
        {column.title}
      </text>
    )

    if (isColumnSelected) {
      children.push(
        <rect
          key={`column-select-${column.id}`}
          x={columnX}
          y={columnY}
          width={COLUMN_WIDTH}
          height={columnHeight}
          rx={CARD_RADIUS}
          ry={CARD_RADIUS}
          fill="none"
          stroke={SELECTION_STROKE}
          strokeWidth={2}
          strokeDasharray="4 2"
          pointerEvents="none"
        />
      )
    }

    let cardY = columnY + HEADER_HEIGHT + CARD_MARGIN
    for (const task of columnTasks) {
      const taskId = taskElementId(task.title)
      const cardWidth = COLUMN_WIDTH - CARD_MARGIN * 2
      const badges = computeBadges(task.modifiers)
      const cardHeight = computeCardHeight(task.title, badges.length > 0)
      const cardX = columnX + CARD_MARGIN
      const isTaskSelected = selectedIds.has(taskId)
      const stripColor = getStripColor(task.modifiers)
      const lines = wrapText(task.title, 18)

      children.push(
        <rect
          key={`task-bg-${task.id}`}
          x={cardX}
          y={cardY}
          width={cardWidth}
          height={cardHeight}
          rx={CARD_RADIUS}
          ry={CARD_RADIUS}
          fill="#fff"
          stroke="#ddd"
          strokeWidth={1}
          cursor="pointer"
          onClick={() => toggleElement(taskId)}
        />
      )

      children.push(
        <rect
          key={`task-strip-${task.id}`}
          x={cardX + 2}
          y={cardY + 4}
          width={STRIP_WIDTH}
          height={cardHeight - 8}
          rx={2}
          ry={2}
          fill={stripColor}
          pointerEvents="none"
        />
      )

      const textAreaWidth = cardWidth - STRIP_WIDTH - STRIP_OFFSET - CARD_PADDING * 2
      const textX = cardX + STRIP_WIDTH + STRIP_OFFSET + CARD_PADDING + textAreaWidth / 2
      const textAreaHeight = cardHeight - CARD_PADDING - (badges.length > 0 ? BADGE_HEIGHT + 4 : 0) - CARD_PADDING
      const textBlockHeight = lines.length * TEXT_LINE_HEIGHT
      const textStartY = cardY + CARD_PADDING + (textAreaHeight - textBlockHeight) / 2 + TEXT_LINE_HEIGHT / 2

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        children.push(
          <text
            key={`task-title-${task.id}-${lineIndex}`}
            x={textX}
            y={textStartY + lineIndex * TEXT_LINE_HEIGHT}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={12}
            fill="#333"
            fontWeight={500}
            pointerEvents="none"
          >
            {lines[lineIndex]}
          </text>
        )
      }

      if (badges.length > 0) {
        const totalBadgeWidth = badges.length * BADGE_WIDTH + (badges.length - 1) * BADGE_GAP
        const badgesStartX = cardX + cardWidth - CARD_PADDING - totalBadgeWidth
        const badgeY = cardY + cardHeight - CARD_PADDING - BADGE_HEIGHT

        for (let badgeIndex = 0; badgeIndex < badges.length; badgeIndex++) {
          const badge = badges[badgeIndex]!
          const badgeX = badgesStartX + badgeIndex * (BADGE_WIDTH + BADGE_GAP)

          children.push(
            <rect
              key={`task-badge-bg-${task.id}-${badge.label}`}
              x={badgeX}
              y={badgeY}
              width={BADGE_WIDTH}
              height={BADGE_HEIGHT}
              rx={3}
              ry={3}
              fill={badge.color}
              pointerEvents="none"
            />
          )

          children.push(
            <text
              key={`task-badge-text-${task.id}-${badge.label}`}
              x={badgeX + BADGE_WIDTH / 2}
              y={badgeY + BADGE_HEIGHT / 2 + 3}
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize={BADGE_FONT_SIZE}
              fontWeight={700}
              fill="#fff"
              pointerEvents="none"
            >
              {badge.label}
            </text>
          )
        }
      }

      if (isTaskSelected) {
        children.push(
          <rect
            key={`task-select-${task.id}`}
            x={cardX}
            y={cardY}
            width={cardWidth}
            height={cardHeight}
            rx={CARD_RADIUS}
            ry={CARD_RADIUS}
            fill="none"
            stroke={SELECTION_STROKE}
            strokeWidth={2}
            strokeDasharray="4 2"
            pointerEvents="none"
          />
        )
      }

      cardY += cardHeight + CARD_MARGIN
    }
  }

  return <g>{children}</g>
}
