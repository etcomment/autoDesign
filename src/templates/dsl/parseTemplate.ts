import type {
  RoadmapData,
  ProductRoadmapData,
  ProcessData,
  StrategyData,
  PuzzleData,
  FunnelData,
  DashboardData,
  TableData,
  AgendaData,
  ComparisonData,
  BusinessData,
  BrainData,
  BudgetData,
  DecisionTreeData,
  GoalsData,
  ManufacturingData,
  ValueChainData,
  ValueChain3Data,
  ValueChain4Data,
  ValueChain5Data,
  ValueChain5Item,
  IcebergData,
  TemplateData,
  TemplateElementStyle,
  TemplateMilestone,
  ProcessStep,
  StrategyBlock,
  PuzzlePiece,
  FunnelLevel,
  DashboardMetric,
  TableRow,
  AgendaItem,
  ComparisonItem,
  BudgetItem,
  ManufacturingStation,
  ValueChainActivity,
  ValueChain3Item,
  IcebergSection,
  DecisionTreeNode,
  GoalsMetric,
  CircleData,
  CircleSegment,
  PieData,
  PieSlice,
  TemplateLane,
} from '../types'
import { MIGSO_PALETTE } from '../../lib/theme'

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, '').trim().replace(/\\n/g, '\n')
}

function escapeField(v: unknown): string {
  if (typeof v !== 'string' || !v) return String(v ?? '')
  return v.replace(/\n/g, '\\n')
}

function parseStyleValue(value: string): string | number {
  const num = Number(value)
  if (!isNaN(num)) return num
  return value.replace(/^["']|["']$/g, '')
}

function styleObj(record: Record<string, string | number>): TemplateElementStyle | undefined {
  const keys = Object.keys(record)
  if (keys.length === 0) return undefined
  return record as unknown as TemplateElementStyle
}

interface QuotedTokens {
  tokens: string[]
}

function tokenizeLine(line: string): QuotedTokens {
  const tokens: string[] = []
  let i = 0
  while (i < line.length) {
    if (line[i] === ' ' || line[i] === '\t') {
      i++
      continue
    }
    if (line[i] === '"' || line[i] === "'") {
      const quote = line[i]
      let j = i + 1
      while (j < line.length && line[j] !== quote) j++
      tokens.push(line.slice(i + 1, j))
      i = j + 1
      continue
    }
    let j = i
    while (j < line.length && line[j] !== ' ' && line[j] !== '\t') j++
    tokens.push(line.slice(i, j))
    i = j
  }
  return { tokens }
}


export function extractTrailingArgs(args: string[], startIndex: number) {
  const merged: string[] = []
  for (let i = startIndex; i < args.length; i++) {
    const arg = args[i]!
    const kvMatch = /^(val|pct|icon|date|lane):(.*)/.exec(arg)
    if (kvMatch && kvMatch[2]!.startsWith('"') && !kvMatch[2]!.endsWith('"') && i + 1 < args.length) {
      merged.push(arg + ' ' + args[i + 1]!)
      i++
    } else {
      merged.push(arg)
    }
  }

  let subtitle: string | undefined
  let color: string | undefined
  let icon: string | undefined
  let value: string | undefined
  let percent: string | undefined
  let date: string | undefined
  let lane: string | undefined
  let status: 'done' | 'current' | 'future' | undefined

  let idx = 0
  if (idx < merged.length && !merged[idx]!.startsWith('#') && !merged[idx]!.startsWith('val:') && !merged[idx]!.startsWith('pct:') && !merged[idx]!.startsWith('icon:') && !merged[idx]!.startsWith('date:') && !merged[idx]!.startsWith('lane:') && !merged[idx]!.startsWith('status:') && merged[idx] !== 'current' && merged[idx] !== 'active' && merged[idx] !== 'now' && merged[idx] !== 'done') {
    subtitle = stripQuotes(merged[idx]!)
    idx++
  }

  while (idx < merged.length) {
    const arg = merged[idx]!
    if (arg.startsWith('val:')) {
      value = stripQuotes(arg.slice(4))
    } else if (arg.startsWith('pct:')) {
      percent = stripQuotes(arg.slice(4))
    } else if (arg.startsWith('icon:')) {
      icon = stripQuotes(arg.slice(5))
    } else if (arg.startsWith('date:')) {
      date = stripQuotes(arg.slice(5))
    } else if (arg.startsWith('lane:')) {
      lane = stripQuotes(arg.slice(5))
    } else if (arg.startsWith('color:')) {
      color = stripQuotes(arg.slice(6))
    } else if (arg.startsWith('#')) {
      color = arg
    } else if (arg === 'current' || arg === 'active' || arg === 'now' || arg.startsWith('status:current') || arg.startsWith('status:active')) {
      status = 'current'
    } else if (arg === 'done' || arg === 'completed' || arg.startsWith('status:done')) {
      status = 'done'
    }
    idx++
  }

  return { subtitle, color, icon, value, percent, date, lane, status, current: status === 'current' ? true : undefined }
}

function emitTrailingArgs(n: Record<string, any>): string {
  let out = ''
  if (n.date) out += ' date:' + escapeField(n.date)
  if (n.lane) out += ' lane:' + (/\s/.test(n.lane) ? '"' + escapeField(n.lane) + '"' : escapeField(n.lane))
  if (n.value) out += ' val:"' + escapeField(n.value) + '"'
  if (n.percent) out += ' pct:"' + escapeField(n.percent) + '"'
  if (n.icon) out += ' icon:' + escapeField(n.icon)
  if (n.color) out += ' ' + n.color
  return out
}

function parseHeader(trimmed: string): { type: string; baseType: string; title?: string } | null {
  const firstLine = trimmed.split('\n')[0]!.trim()
  const match = /^@([a-zA-Z]+)(\d+[a-zA-Z]*)?\s*"?([^"]*)"?\s*$/.exec(firstLine)
  if (!match) return null
  const [, baseType, variant, rawTitle] = match
  const type = variant ? `${baseType}${variant}` : baseType
  return { type: type!, baseType: baseType!, title: rawTitle ? stripQuotes(rawTitle) : undefined }
}

export function parseTemplateDsl(dsl: string): TemplateData | null {
  const trimmed = dsl.trim()
  if (!trimmed) return null

  const header = parseHeader(trimmed)
  if (!header) return null

  const baseType = header.baseType
  let result: TemplateData | null = null

  switch (baseType) {
    case 'roadmap':
    case 'productRoadmap':
      result = parseRoadmap(trimmed, header.title)
      break
    case 'process':
      result = parseProcess(trimmed, header.title)
      break
    case 'strategy':
      result = parseStrategy(trimmed, header.title)
      break
    case 'puzzle':
      result = parsePuzzle(trimmed, header.title)
      break
    case 'funnel':
      result = parseFunnel(trimmed, header.title)
      break
    case 'dashboard':
      result = parseDashboard(trimmed, header.title)
      break
    case 'table':
      result = parseTable(trimmed, header.title)
      break
    case 'agenda':
      result = parseAgenda(trimmed, header.title)
      break
    case 'comparison':
      result = parseComparison(trimmed, header.title, header.type)
      break
    case 'business':
      result = parseBusiness(trimmed, header.title)
      break
    case 'brain':
      result = parseBrain(trimmed, header.title)
      break
    case 'budget':
      result = parseBudget(trimmed, header.title)
      break
    case 'decision':
    case 'decisionTree':
      result = parseDecision(trimmed, header.title)
      break
    case 'goals':
      result = parseGoals(trimmed, header.title)
      break
    case 'manufacturing':
      result = parseManufacturing(trimmed, header.title)
      break
    case 'valueChain':
      result = parseValueChain(trimmed, header.title, header.type)
      break
    case 'iceberg':
      result = parseIceberg(trimmed, header.title)
      break
    case 'circle':
      result = parseCircle(trimmed, header.title)
      break
    case 'pieChart':
      result = parsePieChart(trimmed, header.title)
      break
  }

  if (result) {
    (result as unknown as Record<string, unknown>).type = header.type
  }
  return result
}

function getLines(dsl: string): string[] {
  const physical = dsl.split('\n')
  const result: string[] = []
  let buffer = ''
  let inQuote = false
  let quoteChar = ''

  for (const rawLine of physical) {
    const line = rawLine.trim()
    if (!buffer && (!line || line.startsWith('//'))) continue

    buffer = buffer ? buffer + '\n' + line.trimStart() : line

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '\\') { i++; continue }
      if (ch === '"' || ch === "'") {
        if (!inQuote) { inQuote = true; quoteChar = ch }
        else if (ch === quoteChar) inQuote = false
      }
    }

    if (!inQuote) {
      result.push(buffer)
      buffer = ''
    }
  }
  if (buffer) result.push(buffer)
  return result
}

function parseRoadmap(dsl: string, headerTitle?: string): RoadmapData | ProductRoadmapData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let startLabel: string | undefined
  let finishLabel: string | undefined
  let current: string | undefined
  let progress: string | undefined
  let progressColor: string | undefined
  let trackColor: string | undefined
  let trackBgColor: string | undefined
  const milestones: TemplateMilestone[] = []
  const steps: ProcessStep[] = []
  const quarters: string[] = []
  const lanes: TemplateLane[] = []
  const globalStyles: Record<string, string | number> = {}
  let pendingStyle: Record<string, string | number> = {}
  let hasPendingStyle = false
  let pendingMilestone: { quarter?: string; lane?: string; title: string; subtitle?: string; date?: string; color?: string; icon?: string; value?: string; percent?: string } | null = null

  function flushMilestone() {
    if (pendingMilestone) {
      const merged = { ...globalStyles, ...(hasPendingStyle ? pendingStyle : {}) }
      milestones.push({
        ...pendingMilestone,
        style: styleObj(merged),
      })
      pendingMilestone = null
      pendingStyle = {}
      hasPendingStyle = false
    }
  }

  for (const line of lines) {
    if (line.startsWith('@roadmap') || line.startsWith('@productRoadmap')) {
      const titleMatch = /^@(roadmap|productRoadmap)\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (titleMatch && titleMatch[2]) title = stripQuotes(titleMatch[2])
      continue
    }

    const startMatch = /^start\s+"([^"]*)"\s*$/.exec(line)
    if (startMatch) { startLabel = startMatch[1]!; continue }

    const finishMatch = /^finish\s+"([^"]*)"\s*$/.exec(line)
    if (finishMatch) { finishLabel = finishMatch[1]!; continue }

    const trackMatch = /^(?:track|bar)\s+(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)(?:\s+(#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?/.exec(line)
    if (trackMatch) {
      trackColor = trackMatch[1]
      if (trackMatch[2]) trackBgColor = trackMatch[2]
      continue
    }

    const progressMatch = /^progress(?::\s*|\s+)(\S+)(?:\s+(#[0-9a-fA-F]{3,8}|[a-zA-Z]+))?\s*$/.exec(line)
    if (progressMatch) {
      if (progressMatch[1]?.startsWith('#')) {
        progressColor = progressMatch[1]
      } else {
        progress = progressMatch[1]
        if (progressMatch[2]) progressColor = progressMatch[2]
      }
      continue
    }

    const currentMatch = /^(?:current|now|active)(?::\s*|\s+)("?[^"]*"?)\s*$/.exec(line)
    if (currentMatch) {
      current = stripQuotes(currentMatch[1]!)
      continue
    }

    const quartersMatch = /^quarters\s+(.+)$/.exec(line)
    if (quartersMatch) { quarters.push(...quartersMatch[1]!.split(/\s+/).filter(Boolean)); continue }

    const lanesMatch = /^lanes\s+(.+)$/.exec(line)
    if (lanesMatch) {
      for (const m of lanesMatch[1]!.matchAll(/"([^"]*)":(#[0-9a-fA-F]+)|"([^"]*)"|(\S+):(#[0-9a-fA-F]+)|(\S+)/g)) {
        if (m[1] != null) {
          lanes.push({ label: m[1], color: m[2] })
        } else if (m[3] != null) {
          lanes.push({ label: m[3] })
        } else if (m[5] != null) {
          lanes.push({ label: m[4]!, color: m[5] })
        } else if (m[6] != null) {
          lanes.push({ label: m[6] })
        }
      }
      continue
    }

    const styleMatch = /^style\s+(\S+)\s+(.+)$/.exec(line)
    if (styleMatch) {
      const key = styleMatch[1]!
      const value = parseStyleValue(styleMatch[2]!)
      if (pendingMilestone) {
        pendingStyle[key] = value
        hasPendingStyle = true
      } else {
        globalStyles[key] = value
      }
      continue
    }

    var tokens = tokenizeLine(line)
    const tok0 = tokens.tokens[0]
    if (tok0 && (tok0 === 'step' || tok0.startsWith('step'))) {
      const args = tokens.tokens.slice(1)
      if (args.length >= 1) {
        const stepTitle = stripQuotes(args[0]!)
        const trailing = extractTrailingArgs(args, 1)
        steps.push({
          number: steps.length + 1,
          title: stepTitle,
          ...trailing
        })
        continue
      }
    }

    if (tok0 && (tok0 === 'milestone' || tok0.startsWith('milestone'))) {
      let quarter: string | undefined
      let lane: string | undefined
      let argsStart = 1

      if (tok0.startsWith('milestone:')) {
        const parts = tok0.slice('milestone:'.length).split(':')
        quarter = parts[0] || undefined
        lane = parts[1] || undefined
      } else if (tokens.tokens.length >= 2 && tokens.tokens[1]!.endsWith(':') && !tokens.tokens[1]!.startsWith('"') && !tokens.tokens[1]!.startsWith("'")) {
        const parts = tokens.tokens[1]!.slice(0, -1).split(':')
        quarter = parts[0] || undefined
        lane = parts[1] || undefined
        argsStart = 2
      } else if (tok0.includes(':')) {
        const parts = tok0.substring('milestone'.length).replace(/^:/, '').trim().split(':')
        quarter = parts[0] || undefined
        lane = parts[1] || undefined
      }

      const args = tokens.tokens.slice(argsStart)
      if (args.length >= 1) {
        flushMilestone()
        const msTitle = stripQuotes(args[0]!)
        const trailing = extractTrailingArgs(args, 1)
        pendingMilestone = {
          quarter,
          title: msTitle,
          ...trailing,
          lane: trailing.lane || lane,
        }
        pendingStyle = {}
        hasPendingStyle = false
        if (trailing.color || trailing.icon || trailing.value || trailing.percent) { 
          Object.assign(pendingStyle, trailing)
          hasPendingStyle = true 
        }
        continue
      }
    }
  }

  flushMilestone()

  const globalStyle = styleObj(globalStyles)

  const resolvedQuarters = quarters.length > 0 ? quarters.map(q => {
    const [label, year] = q.split(':')
    return { label: label!, year }
  }) : undefined
  const resolvedLanes = lanes.length > 0 ? lanes : undefined

  return {
    type: 'roadmap' as const,
    title,
    startLabel,
    finishLabel,
    current,
    progress,
    progressColor,
    trackColor,
    trackBgColor,
    quarters: resolvedQuarters,
    lanes: resolvedLanes,
    steps: steps.length > 0 ? steps : undefined,
    milestones: milestones.map(m => ({
      title: m.title,
      subtitle: m.subtitle,
      quarter: m.quarter,
      lane: m.lane,
      date: m.date,
      style: m.style ?? globalStyle,
      color: m.color,
      icon: m.icon,
      value: m.value,
      percent: m.percent,
    })),
  }
}

function parseProcess(dsl: string, headerTitle?: string): ProcessData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const steps: ProcessStep[] = []

  for (const line of lines) {
    if (line.startsWith('@process')) {
      const m = /^@process\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'step' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      steps.push({
        number: steps.length + 1,
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }
  }

  return { type: 'process', title, steps }
}

function parseStrategy(dsl: string, headerTitle?: string): StrategyData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const blocks: StrategyBlock[] = []

  for (const line of lines) {
    if (line.startsWith('@strategy')) {
      const m = /^@strategy\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'block' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      blocks.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        ...trailing
      })
      continue
    }
  }

  return { type: 'strategy', title, blocks }
}

function parsePuzzle(dsl: string, headerTitle?: string): PuzzleData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const pieces: PuzzlePiece[] = []

  for (const line of lines) {
    if (line.startsWith('@puzzle')) {
      const m = /^@puzzle\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'piece' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const pieceTitle = stripQuotes(args[0]!)
      const trailing = extractTrailingArgs(args, 1)
      const index = pieces.length
      pieces.push({
        number: index + 1,
        title: pieceTitle,
        ...trailing,
        color: trailing.color ?? MIGSO_PALETTE[index % MIGSO_PALETTE.length]!,
      })
      continue
    }
  }

  return { type: 'puzzle', title, pieces }
}

function parseFunnel(dsl: string, headerTitle?: string): FunnelData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const levels: FunnelLevel[] = []

  for (const line of lines) {
    if (line.startsWith('@funnel')) {
      const m = /^@funnel\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'level' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const title = stripQuotes(args[0]!)
      
      let idx = 1
      let percentage: number | undefined
      if (idx < args.length && !args[idx]!.startsWith('#') && !args[idx]!.startsWith('val:') && !args[idx]!.startsWith('pct:') && !args[idx]!.startsWith('icon:')) {
        const num = Number(args[idx])
        if (!isNaN(num)) {
          percentage = num
          idx++
        }
      }
      const trailing = extractTrailingArgs(args, idx)
      
      levels.push({
        title,
        percentage: percentage ?? (trailing.percent ? Number(trailing.percent) : undefined),
        ...trailing
      })
      continue
    }
  }

  return { type: 'funnel', title, levels }
}

function parseDashboard(dsl: string, headerTitle?: string): DashboardData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const metrics: DashboardMetric[] = []

  for (const line of lines) {
    if (line.startsWith('@dashboard')) {
      const m = /^@dashboard\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'metric' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      metrics.push({
        label: stripQuotes(args[0]!),
        value: trailing.value ?? stripQuotes(args[1]!),
        change: trailing.subtitle,
        color: trailing.color,
        icon: trailing.icon,
        percent: trailing.percent,
      })
      continue
    }
  }

  return { type: 'dashboard', title, metrics }
}

function parseTable(dsl: string, headerTitle?: string): TableData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let columns: string[] = []
  const rows: TableRow[] = []

  for (const line of lines) {
    if (line.startsWith('@table')) {
      const m = /^@table\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'columns') {
      columns = tokens.tokens.slice(1).map(t => stripQuotes(t))
      continue
    }
    if (tokens.tokens[0] === 'row') {
      const args = tokens.tokens.slice(1)
      if (args.length >= 2) {
        rows.push({
          label: stripQuotes(args[0]!),
          cells: args.slice(1).map(t => stripQuotes(t)),
        })
      }
      continue
    }
  }

  return { type: 'table', title, columns, rows }
}

function parseAgenda(dsl: string, headerTitle?: string): AgendaData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const items: AgendaItem[] = []

  for (const line of lines) {
    if (line.startsWith('@agenda')) {
      const m = /^@agenda\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'item' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      items.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        ...trailing
      })
      continue
    }
  }

  return { type: 'agenda', title, items }
}

function parseComparison(dsl: string, headerTitle?: string, headerType: string = 'comparison'): any {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let leftTitle = ''
  let rightTitle = ''
  const items: ComparisonItem[] = []
  const leftItems: string[] = []
  const rightItems: string[] = []
  const pros: string[] = []
  const cons: string[] = []

  for (const line of lines) {
    if (line.startsWith('@comparison')) {
      const m = /^@comparison\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const leftMatch = /^(?:leftTitle|left)\s+"([^"]*)"\s*$/.exec(line)
    if (leftMatch) { leftTitle = leftMatch[1]!; continue }

    const rightMatch = /^(?:rightTitle|right)\s+"([^"]*)"\s*$/.exec(line)
    if (rightMatch) { rightTitle = rightMatch[1]!; continue }

    const leftItemMatch = /^(?:leftItem|left_item)\s+"([^"]*)"\s*$/.exec(line)
    if (leftItemMatch) { leftItems.push(leftItemMatch[1]!); continue }

    const rightItemMatch = /^(?:rightItem|right_item)\s+"([^"]*)"\s*$/.exec(line)
    if (rightItemMatch) { rightItems.push(rightItemMatch[1]!); continue }

    const proMatch = /^(?:pro|pros)\s+"([^"]*)"\s*$/.exec(line)
    if (proMatch) { pros.push(proMatch[1]!); continue }

    const conMatch = /^(?:con|cons)\s+"([^"]*)"\s*$/.exec(line)
    if (conMatch) { cons.push(conMatch[1]!); continue }

    const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'comp' && tokens.tokens.length >= 4) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 3)
      items.push({
        label: stripQuotes(args[0]!),
        left: stripQuotes(args[1]!),
        right: stripQuotes(args[2]!),
        ...trailing
      })
      continue
    }
  }

  if (headerType === 'comparison6' || leftItems.length > 0 || rightItems.length > 0) {
    return {
      type: 'comparison6',
      title,
      leftTitle: leftTitle || 'Plan A',
      rightTitle: rightTitle || 'Plan B',
      leftItems: leftItems.length > 0 ? leftItems : ['Item 1', 'Item 2'],
      rightItems: rightItems.length > 0 ? rightItems : ['Item 1', 'Item 2'],
    }
  }

  if (headerType === 'comparison7' || pros.length > 0 || cons.length > 0) {
    return {
      type: 'comparison7',
      title,
      pros: pros.length > 0 ? pros : ['Avantage 1', 'Avantage 2'],
      cons: cons.length > 0 ? cons : ['Inconvénient 1', 'Inconvénient 2'],
    }
  }

  return { type: 'comparison', title, leftTitle, rightTitle, items }
}

function parseBusiness(dsl: string, headerTitle?: string): BusinessData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let centerLabel = ''
  const nodes: { title: string; subtitle?: string; value?: string; percent?: string; color?: string; icon?: string }[] = []

  for (const line of lines) {
    if (line.startsWith('@business')) {
      const m = /^@business\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    if (/^center\s+/.test(line)) {
      const m = /^center\s+"([^"]*)"\s*$/.exec(line)
      if (m) centerLabel = m[1]!
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'nodes') {
      for (const t of tokens.tokens.slice(1)) {
        nodes.push({ title: stripQuotes(t) })
      }
      continue
    }
    if (tokens.tokens[0] === 'node' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      nodes.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }
  }

  return { type: 'business', title, centerLabel, nodes }
}

function parseBrain(dsl: string, headerTitle?: string): BrainData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let centerLabel = ''
  const branches: { title: string; subtitle?: string; color?: string }[] = []

  for (const line of lines) {
    if (line.startsWith('@brain')) {
      const m = /^@brain\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const centerMatch = /^center\s+"([^"]*)"\s*$/.exec(line)
    if (centerMatch) { centerLabel = centerMatch[1]!; continue }

    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'branch' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      branches.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }
  }

  return { type: 'brain', title, centerLabel, branches }
}

function parseBudget(dsl: string, headerTitle?: string): BudgetData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let totalLabel = 'Total Budget'
  let totalAmount = ''
  const items: BudgetItem[] = []

  for (const line of lines) {
    if (line.startsWith('@budget')) {
      const m = /^@budget\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }

    const totalMatch = /^total\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (totalMatch) {
      if (totalMatch[2]) {
        totalLabel = stripQuotes(totalMatch[1]!)
        totalAmount = stripQuotes(totalMatch[2]!)
      } else {
        totalAmount = stripQuotes(totalMatch[1]!)
      }
      continue
    }

    var tokens = tokenizeLine(line)
    const firstKeyword = (tokens.tokens[0] || '').toLowerCase()
    if (['line', 'item', 'row', 'metric', 'block', 'node', 'station', 'level'].includes(firstKeyword) && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)

      const label = stripQuotes(args[0]!)

      const nonKvArgs: string[] = []
      for (let i = 1; i < args.length; i++) {
        const arg = args[i]!
        if (arg.startsWith('#') || arg.startsWith('val:') || arg.startsWith('pct:') || arg.startsWith('icon:') || arg.startsWith('date:') || arg.startsWith('lane:')) {
          break
        }
        nonKvArgs.push(stripQuotes(arg))
      }

      let rawAmount = trailing.value ?? (nonKvArgs[0] ?? '')
      let rawPct = trailing.percent ?? (nonKvArgs[1] ?? '')

      if (!rawPct && rawAmount && (rawAmount.endsWith('%') || (!isNaN(Number(rawAmount)) && nonKvArgs.length === 1))) {
        rawPct = rawAmount
        rawAmount = ''
      }

      let percentage = parseFloat(rawPct.replace('%', ''))
      if (isNaN(percentage)) {
        percentage = 0
      }

      items.push({
        label,
        amount: rawAmount,
        percentage,
        color: trailing.color,
        icon: trailing.icon,
        value: trailing.value || rawAmount,
        percent: trailing.percent || rawPct,
      })
      continue
    }
  }

  const zeroPctCount = items.filter(it => !it.percentage).length
  if (zeroPctCount > 0 && items.length > 0) {
    const defaultPct = Math.round(100 / items.length)
    items.forEach(it => {
      if (!it.percentage) {
        it.percentage = defaultPct
      }
    })
  }

  if (!totalAmount && items.length > 0) {
    let sum = 0
    let symbol = ''
    let valid = false
    for (const it of items) {
      if (it.amount) {
        const cleaned = it.amount.replace(/[^0-9.-]/g, '')
        const num = parseFloat(cleaned)
        if (!isNaN(num)) {
          sum += num
          valid = true
          const sym = /[$€£¥]/.exec(it.amount)
          if (sym) symbol = sym[0]!
        }
      }
    }
    if (valid && sum > 0) {
      totalAmount = `${symbol}${sum.toLocaleString()}`
    }
  }

  return { type: 'budget', title, totalLabel, totalAmount, items }
}

function parseDecision(dsl: string, headerTitle?: string): DecisionTreeData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let rootQuestion = ''

  interface DecisionEdge {
    sourceLabel: string
    answer: 'yes' | 'no'
    target: string
    isLeaf: boolean
  }

  const edgesByLabel = new Map<string, DecisionEdge[]>()
  const allTargets = new Set<string>()

  for (const line of lines) {
    if (line.startsWith('@decision')) {
      const m = /^@decision\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const questionMatch = /^question\s+"([^"]*)"\s*$/.exec(line)
    if (questionMatch) { rootQuestion = questionMatch[1]!; continue }

    const edgeMatch = /^(yes|no|leaf)\s+"([^"]*)"\s*->\s*"([^"]*)"\s*$/.exec(line)
    if (edgeMatch) {
      const [, answer, label, target] = edgeMatch
      const isLeaf = answer === 'leaf'
      const ans: 'yes' | 'no' = isLeaf ? 'yes' : answer as 'yes' | 'no'
      const existing = edgesByLabel.get(label!) ?? []
      existing.push({ sourceLabel: label!, answer: ans, target: target!, isLeaf })
      edgesByLabel.set(label!, existing)
      allTargets.add(target!)
      continue
    }
  }

  function buildNode(sourceLabel: string, answer: 'yes' | 'no', target: string, isLeaf: boolean): DecisionTreeNode {
    if (isLeaf) {
      return { label: sourceLabel, answer: 'yes', outcome: target }
    }
    const subEdges = edgesByLabel.get(target)
    if (!subEdges) {
      return { label: sourceLabel, answer, outcome: target }
    }
    const children: DecisionTreeNode[] = subEdges.map(e =>
      buildNode(target, e.answer, e.target, e.isLeaf)
    )
    if (children.length > 0) {
      return { label: sourceLabel, answer, children }
    }
    return { label: sourceLabel, answer, outcome: target }
  }

  const rootChildrenLabels: string[] = []
  for (const [label, _edges] of edgesByLabel) {
    if (!allTargets.has(label)) {
      rootChildrenLabels.push(label)
    }
  }

  const branches: DecisionTreeNode[] = []
  for (const label of rootChildrenLabels) {
    for (const edge of edgesByLabel.get(label) ?? []) {
      branches.push(buildNode(edge.sourceLabel, edge.answer, edge.target, edge.isLeaf))
    }
  }

  return { type: 'decisionTree', title, rootQuestion, branches }
}

function parseGoals(dsl: string, headerTitle?: string): GoalsData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let centerGoal = ''
  const metrics: GoalsMetric[] = []

  for (const line of lines) {
    if (line.startsWith('@goals')) {
      const m = /^@goals\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const centerMatch = /^center\s+"([^"]*)"\s*$/.exec(line)
    if (centerMatch) { centerGoal = centerMatch[1]!; continue }

    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'metric' && tokens.tokens.length >= 4) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 3)
      metrics.push({
        label: stripQuotes(args[0]!),
        value: trailing.value ?? stripQuotes(args[1]!),
        target: stripQuotes(args[2]!),
        color: trailing.color,
        icon: trailing.icon,
        percent: trailing.percent,
      })
      continue
    }
  }

  return { type: 'goals', title, centerGoal, metrics }
}

function parseManufacturing(dsl: string, headerTitle?: string): ManufacturingData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const stations: ManufacturingStation[] = []

  for (const line of lines) {
    if (line.startsWith('@manufacturing')) {
      const m = /^@manufacturing\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'station' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      stations.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }
  }

  return { type: 'manufacturing', title, stations }
}

function parseValueChain(dsl: string, headerTitle?: string, headerType?: string): ValueChainData | ValueChain3Data | ValueChain4Data | ValueChain5Data {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  let type = headerType || 'valueChain'
  let topBar: string | undefined
  let bottomBar: string | undefined
  let footerText: string | undefined
  let upperLabel: string | undefined
  let lowerLabel: string | undefined
  let centerLabel: string | undefined
  let rightLabel: string | undefined
  const items: ValueChain3Item[] = []
  const primary: ValueChainActivity[] = []
  const support: ValueChainActivity[] = []
  const leftBlocks: ValueChain5Item[] = []
  const centerBars: ValueChain5Item[] = []
  const rightChevrons: ValueChain5Item[] = []

  for (const line of lines) {
    if (line.startsWith('@valueChain')) {
      const m = /^@valueChain(\d*)\s+"?([^"]*)"?\s*$/.exec(line)
      if (m) {
        if (m[1]) type = `valueChain${m[1]}`
        if (m[2]) title = stripQuotes(m[2])
      }
      continue
    }
    const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'topBar' && tokens.tokens.length >= 2) {
      topBar = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'bottomBar' && tokens.tokens.length >= 2) {
      bottomBar = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'footerText' && tokens.tokens.length >= 2) {
      footerText = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'upperLabel' && tokens.tokens.length >= 2) {
      upperLabel = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'lowerLabel' && tokens.tokens.length >= 2) {
      lowerLabel = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'centerLabel' && tokens.tokens.length >= 2) {
      centerLabel = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'rightLabel' && tokens.tokens.length >= 2) {
      rightLabel = stripQuotes(tokens.tokens[1]!)
      continue
    }
    if (tokens.tokens[0] === 'left' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      leftBlocks.push({
        title: stripQuotes(args[0]!),
        ...trailing,
      })
      continue
    }
    if (tokens.tokens[0] === 'bar' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      centerBars.push({
        title: stripQuotes(args[0]!),
        ...trailing,
      })
      continue
    }
    if (tokens.tokens[0] === 'chevron' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      rightChevrons.push({
        title: stripQuotes(args[0]!),
        ...trailing,
      })
      continue
    }
    if (tokens.tokens[0] === 'item' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      items.push({
        title: stripQuotes(args[0]!),
        ...trailing,
      })
      continue
    }
    if (tokens.tokens[0] === 'primary' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      primary.push({
        title: stripQuotes(args[0]!),
        ...trailing,
      })
      continue
    }
    if (tokens.tokens[0] === 'support' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      support.push({
        title: stripQuotes(args[0]!),
        ...trailing,
      })
      continue
    }
  }

  if (type === 'valueChain5' || leftBlocks.length > 0 || centerBars.length > 0 || rightChevrons.length > 0) {
    return {
      type: 'valueChain5',
      title,
      leftBlocks: leftBlocks.length > 0 ? leftBlocks : undefined,
      centerBars: centerBars.length > 0 ? centerBars : undefined,
      rightChevrons: rightChevrons.length > 0 ? rightChevrons : undefined,
    } as ValueChain5Data
  }

  if (type === 'valueChain4' || upperLabel || lowerLabel || (centerLabel && !topBar) || rightLabel) {
    return {
      type: 'valueChain4',
      title,
      upperLabel,
      lowerLabel,
      centerLabel,
      rightLabel,
      primary: primary.length > 0 ? primary : undefined,
      support: support.length > 0 ? support : undefined,
    } as ValueChain4Data
  }

  if (topBar || bottomBar || footerText || items.length > 0) {
    return {
      type: 'valueChain3',
      title,
      topBar,
      bottomBar,
      footerText,
      items: items.length > 0 ? items : undefined,
      primary: primary.length > 0 ? primary : undefined,
      support: support.length > 0 ? support : undefined,
    } as ValueChain3Data
  }

  return { type: 'valueChain', title, primary, support }
}

function parseIceberg(dsl: string, headerTitle?: string): IcebergData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const sections: IcebergSection[] = []

  for (const line of lines) {
    if (line.startsWith('@iceberg')) {
      const m = /^@iceberg\d*\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'above' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      sections.push({
        title: stripQuotes(args[0]!),
        isAbove: true,
        ...trailing
      })
      continue
    }
    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'below' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      sections.push({
        title: stripQuotes(args[0]!),
        isAbove: false,
        ...trailing
      })
      continue
    }
  }

  return { type: 'iceberg', title, sections }
}

function parseCircle(dsl: string, headerTitle?: string): CircleData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const segments: CircleSegment[] = []

  for (const line of lines) {
    if (line.startsWith('@circle')) {
      const m = /^@circle\d*\s*"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }

    var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'segment' && tokens.tokens.length >= 4) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 3)
      segments.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        description: stripQuotes(args[2]!),
        ...trailing,
        icon: trailing.icon ?? ''
      })
      continue
    }
  }

  return { type: 'circle', title, segments }
}

// @pieChart1..5 : parts de camembert. `slice "Libellé" <valeur> ["desc"] [pct:] [#HEX]`
function parsePieChart(dsl: string, headerTitle?: string): PieData {
  const lines = getLines(dsl)
  let title: string | undefined = headerTitle
  const slices: PieSlice[] = []

  for (const line of lines) {
    if (line.startsWith('@pieChart')) {
      const m = /^@pieChart\d*\s*"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }

    const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'slice' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      const valueNum = Number(stripQuotes(args[1] ?? ''))
      slices.push({
        label: stripQuotes(args[0]!),
        value: isNaN(valueNum) ? undefined : valueNum,
        description: trailing.subtitle,
        pct: trailing.percent,
        color: trailing.color,
        icon: trailing.icon ?? '',
      })
    }
  }

  return { type: 'pieChart', title, slices }
}

export function generateDslText(type: string, data: TemplateData): string {
  const d = data as unknown as Record<string, unknown>
  const esc = escapeField
  let out = `@${type}`
  if (d.title) out += ` "${esc(d.title)}"`
  out += '\n'

  if (d.startLabel) out += `  start "${esc(d.startLabel)}"\n`
  if (d.finishLabel) out += `  finish "${esc(d.finishLabel)}"\n`
  if (d.current) out += `  current ${/\s/.test(String(d.current)) ? '"' + esc(String(d.current)) + '"' : d.current}\n`
  if (d.trackColor) out += `  track ${d.trackColor}${d.trackBgColor ? ' ' + d.trackBgColor : ''}\n`
  if (d.progress || d.progressColor) out += `  progress ${d.progress || ''}${d.progressColor ? ' ' + d.progressColor : ''}\n`

  const list = (key: string) => (d[key] as Array<Record<string, unknown>> | undefined)

  if (d.leftTitle) out += `  left "${esc(d.leftTitle)}"\n`
  if (d.rightTitle) out += `  right "${esc(d.rightTitle)}"\n`
  if (d.topBar) out += `  topBar "${esc(String(d.topBar))}"\n`
  if (d.bottomBar) out += `  bottomBar "${esc(String(d.bottomBar))}"\n`
  if (d.footerText) out += `  footerText "${esc(String(d.footerText))}"\n`
  if (d.upperLabel) out += `  upperLabel "${esc(String(d.upperLabel))}"\n`
  if (d.lowerLabel) out += `  lowerLabel "${esc(String(d.lowerLabel))}"\n`
  if (d.centerLabel && !list('branches') && !list('nodes')) out += `  centerLabel "${esc(String(d.centerLabel))}"\n`
  if (d.rightLabel) out += `  rightLabel "${esc(String(d.rightLabel))}"\n`

  const quarters = list('quarters')
  if (quarters?.length) out += `  quarters ${quarters.map((q: Record<string,unknown>) => q.label + (q.year ? ':' + q.year : '')).join(' ')}\n`
  const lanes = list('lanes')
  if (lanes?.length) out += `  lanes ${lanes.map((l: Record<string,unknown>) => { const label = String(l.label); const needsQuote = /\s/.test(label); return (needsQuote ? `"${esc(label)}"` : label) + (l.color ? ':' + l.color : '') }).join(' ')}\n`

  const milestones = list('milestones')
  if (milestones) {
    for (const m of milestones) {
      const qPrefix = m.quarter ? `:${m.quarter}${m.lane ? ':' + m.lane : ''}` : ''
      out += `  milestone${qPrefix} "${esc(m.title)}"${m.subtitle ? ' "' + esc(m.subtitle) + '"' : ''}${emitTrailingArgs(m)}\n`
    }
  }

  const steps = list('steps')
  if (steps) for (const s of steps) out += `  step "${esc(s.title)}"${s.subtitle ? ' "' + esc(s.subtitle) + '"' : ''}${emitTrailingArgs(s)}\n`

  const blocks = list('blocks')
  if (blocks) for (const b of blocks) out += `  block "${esc(b.number)}" "${esc(b.title)}"${b.subtitle ? ' "' + esc(b.subtitle) + '"' : ''}${emitTrailingArgs(b)}\n`

  const pieces = list('pieces')
  if (pieces) for (const p of pieces) out += `  piece "${esc(p.title)}"${p.subtitle ? ' "' + esc(p.subtitle) + '"' : ''}${emitTrailingArgs(p)}\n`

  const levels = list('levels')
  if (levels) for (const l of levels) out += `  level "${esc(l.title)}" ${l.percentage ?? ''}${emitTrailingArgs(l)}\n`

  const metrics = list('metrics')
  if (metrics) {
    for (const m of metrics) {
      const targetOrChange = m.target ? ` "${esc(m.target)}"` : (m.change ? ` "${esc(m.change)}"` : '')
      out += `  metric "${esc(m.label)}" "${esc(m.value)}"${targetOrChange}${emitTrailingArgs(m)}\n`
    }
  }

  const items = list('items')
  if (items) {
    if (d.totalLabel || d.totalAmount) out += `  total "${esc(d.totalLabel || '')}" "${esc(d.totalAmount || '')}"\n`
    for (const it of items) {
      if ('left' in it || 'right' in it) {
        out += `  comp "${esc(it.label)}" "${esc(it.left ?? '')}" "${esc(it.right ?? '')}"${emitTrailingArgs(it)}\n`
      } else if ('amount' in it || 'percentage' in it) {
        out += `  item "${esc(it.label)}" "${esc(it.amount ?? '')}" "${it.percentage ?? ''}%"${emitTrailingArgs(it)}\n`
      } else {
        out += `  item "${esc(it.title ?? it.label ?? '')}"${it.subtitle ? ' "' + esc(it.subtitle) + '"' : ''}${emitTrailingArgs(it)}\n`
      }
    }
  }

  const segments = list('segments')
  if (segments) for (const s of segments) out += `  segment "${esc(s.number)}" "${esc(s.title)}" "${esc(s.description ?? '')}"${emitTrailingArgs(s)}\n`

  const slices = list('slices')
  if (slices) {
    for (const s of slices) {
      let line = `  slice "${esc(s.label)}"`
      if (s.value != null) line += ` ${s.value}`
      if (s.description) line += ` "${esc(s.description)}"`
      if (s.pct) line += ` pct:"${esc(s.pct)}"`
      if (s.icon) line += ` icon:${esc(s.icon)}`
      if (s.color) line += ` ${s.color}`
      out += line + '\n'
    }
  }

  const stations = list('stations')
  if (stations) for (const s of stations) out += `  station "${esc(s.title)}"${s.subtitle ? ' "' + esc(s.subtitle) + '"' : ''}${emitTrailingArgs(s)}\n`

  const rows = list('rows')
  if (rows) {
    const cols = d.columns as string[] | undefined
    if (cols?.length) out += '  columns ' + cols.map((c: string) => '"' + esc(c) + '"').join(' ') + '\n'
    for (const r of rows) {
      const cells = r.cells as string[] | undefined
      out += '  row "' + esc(r.label) + '"' + (cells ? cells.map((c: string) => ' "' + esc(c) + '"').join('') : '') + '\n'
    }
  }

  const branches = list('branches')
  if (branches) {
    if (d.centerLabel) out += '  center "' + esc(d.centerLabel) + '"\n'
    if (branches.length > 0 && 'answer' in (branches[0] ?? {})) {
      function emitDecisionNodes(nodes: Array<Record<string, unknown>>) {
        for (const n of nodes) {
          const ans = String(n.answer ?? 'yes')
          const lbl = String(n.label ?? '')
          if (n.outcome) {
            out += `  leaf "${esc(lbl)}" -> "${esc(String(n.outcome))}"\n`
          }
          if (n.children && Array.isArray(n.children)) {
            for (const child of n.children as Array<Record<string, unknown>>) {
              const childAns = String(child.answer ?? 'yes')
              const childLbl = String(child.label ?? '')
              out += `  ${childAns} "${esc(lbl)}" -> "${esc(childLbl)}"\n`
            }
            emitDecisionNodes(n.children as Array<Record<string, unknown>>)
          } else if (!n.outcome) {
            out += `  ${ans} "${esc(lbl)}" -> ""\n`
          }
        }
      }
      emitDecisionNodes(branches)
    } else {
      for (const b of branches) out += '  branch "' + esc(b.title) + '"' + (b.subtitle ? ' "' + esc(b.subtitle) + '"' : '') + emitTrailingArgs(b) + '\n'
    }
  }

  const nodes = list('nodes')
  if (nodes) {
    if (d.centerLabel) out += '  center "' + esc(d.centerLabel) + '"\n'
    for (const n of nodes) {
      out += '  node "' + esc(n.title) + '"' + (n.subtitle ? ' "' + esc(n.subtitle) + '"' : '') + emitTrailingArgs(n) + '\n'
    }
  }

  const sections = list('sections')
  if (sections) for (const s of sections) out += '  ' + (s.isAbove ? 'above' : 'below') + ' "' + esc(s.title) + '"' + (s.subtitle ? ' "' + esc(s.subtitle) + '"' : '') + emitTrailingArgs(s) + '\n'

  const primaries = list('primary')
  if (primaries) for (const p of primaries) out += '  primary "' + esc(p.title) + '"' + (p.subtitle ? ' "' + esc(p.subtitle) + '"' : '') + emitTrailingArgs(p) + '\n'

  const supports = list('support')
  if (supports) for (const s of supports) out += '  support "' + esc(s.title) + '"' + (s.subtitle ? ' "' + esc(s.subtitle) + '"' : '') + emitTrailingArgs(s) + '\n'

  const leftBlocks = list('leftBlocks')
  if (leftBlocks) for (const l of leftBlocks) out += '  left "' + esc(String(l.title)) + '"' + (l.subtitle ? ' "' + esc(String(l.subtitle)) + '"' : '') + emitTrailingArgs(l) + '\n'

  const centerBars = list('centerBars')
  if (centerBars) for (const c of centerBars) out += '  bar "' + esc(String(c.title)) + '"' + (c.subtitle ? ' "' + esc(String(c.subtitle)) + '"' : '') + emitTrailingArgs(c) + '\n'

  const rightChevrons = list('rightChevrons')
  if (rightChevrons) for (const r of rightChevrons) out += '  chevron "' + esc(String(r.title)) + '"' + (r.subtitle ? ' "' + esc(String(r.subtitle)) + '"' : '') + emitTrailingArgs(r) + '\n'

  if (d.rootQuestion) out += '  question "' + esc(d.rootQuestion) + '"\n'
  if (d.centerGoal) out += '  center "' + esc(d.centerGoal) + '"\n'

  return out
}
