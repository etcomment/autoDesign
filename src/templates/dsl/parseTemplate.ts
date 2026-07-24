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
  IcebergSection,
  DecisionTreeNode,
  GoalsMetric,
} from '../types'

function stripQuotes(s: string): string {
  return s.replace(/^["']|["']$/g, '').trim().replace(/\\n/g, '\n')
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

function parseHeader(trimmed: string): { type: string; title?: string } | null {
  const firstLine = trimmed.split('\n')[0]!.trim()
  const match = /^@(\w+)\s+"?([^"]*)"?\s*$/.exec(firstLine)
  if (!match) return null
  const [, type, rawTitle] = match
  return { type: type!, title: rawTitle ? stripQuotes(rawTitle) : undefined }
}

export function parseTemplateDsl(dsl: string): TemplateData | null {
  const trimmed = dsl.trim()
  if (!trimmed) return null

  const header = parseHeader(trimmed)
  if (!header) return null

  switch (header.type) {
    case 'roadmap':
      return parseRoadmap(trimmed)
    case 'process':
      return parseProcess(trimmed)
    case 'strategy':
      return parseStrategy(trimmed)
    case 'puzzle':
      return parsePuzzle(trimmed)
    case 'funnel':
      return parseFunnel(trimmed)
    case 'dashboard':
      return parseDashboard(trimmed)
    case 'table':
      return parseTable(trimmed)
    case 'agenda':
      return parseAgenda(trimmed)
    case 'comparison':
      return parseComparison(trimmed)
    case 'business':
      return parseBusiness(trimmed)
    case 'brain':
      return parseBrain(trimmed)
    case 'budget':
      return parseBudget(trimmed)
    case 'decision':
      return parseDecision(trimmed)
    case 'goals':
      return parseGoals(trimmed)
    case 'manufacturing':
      return parseManufacturing(trimmed)
    case 'valueChain':
      return parseValueChain(trimmed)
    case 'iceberg':
      return parseIceberg(trimmed)
    default:
      return null
  }
}

function getLines(dsl: string): string[] {
  return dsl.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'))
}

function parseRoadmap(dsl: string): RoadmapData | ProductRoadmapData {
  const lines = getLines(dsl)
  let title: string | undefined
  let startLabel: string | undefined
  let finishLabel: string | undefined
  const milestones: TemplateMilestone[] = []
  const quarters: string[] = []
  const lanes: string[] = []
  const globalStyles: Record<string, string | number> = {}
  let pendingStyle: Record<string, string | number> = {}
  let hasPendingStyle = false
  let pendingMilestone: { quarter?: string; lane?: string; title: string; subtitle?: string } | null = null

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
    if (line.startsWith('@roadmap')) {
      const titleMatch = /^@roadmap\s+"?([^"]*)"?\s*$/.exec(line)
      if (titleMatch && titleMatch[1]) title = stripQuotes(titleMatch[1])
      continue
    }

    const startMatch = /^start\s+"([^"]*)"\s*$/.exec(line)
    if (startMatch) { startLabel = startMatch[1]!; continue }

    const finishMatch = /^finish\s+"([^"]*)"\s*$/.exec(line)
    if (finishMatch) { finishLabel = finishMatch[1]!; continue }

    const quartersMatch = /^quarters\s+(.+)$/.exec(line)
    if (quartersMatch) { quarters.push(...quartersMatch[1]!.split(/\s+/).filter(Boolean)); continue }

    const lanesMatch = /^lanes\s+(.+)$/.exec(line)
    if (lanesMatch) { lanes.push(...lanesMatch[1]!.split(/\s+/).filter(Boolean)); continue }

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

    const milestoneMatch = /^milestone(?:\s+(\S+):(\S+))?\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (milestoneMatch) {
      flushMilestone()
      pendingMilestone = {
        quarter: milestoneMatch[1],
        lane: milestoneMatch[2],
        title: milestoneMatch[3]!,
        subtitle: milestoneMatch[4] ? stripQuotes(milestoneMatch[4]) : undefined,
      }
      pendingStyle = {}
      hasPendingStyle = false
      continue
    }
  }

  flushMilestone()

  const globalStyle = styleObj(globalStyles)

  if (quarters.length > 0 || lanes.length > 0) {
    const defaultQuarters = quarters.length > 0 ? quarters : ['Q1', 'Q2', 'Q3', 'Q4']
    const defaultLanes = lanes.length > 0 ? lanes : ['Default']

    return {
      type: 'productRoadmap',
      title,
      quarters: defaultQuarters.map(q => ({ label: q })),
      lanes: defaultLanes.map(l => ({ label: l })),
      milestones: milestones.map(m => ({
        title: m.title,
        subtitle: m.subtitle,
        quarter: m.quarter ?? defaultQuarters[0],
        lane: m.lane ?? defaultLanes[0],
        style: m.style ?? globalStyle,
      })),
    }
  }

  return {
    type: 'roadmap',
    title,
    startLabel,
    finishLabel,
    milestones: milestones.map(m => ({
      title: m.title,
      subtitle: m.subtitle,
      style: m.style ?? globalStyle,
    })),
  }
}

function parseProcess(dsl: string): ProcessData {
  const lines = getLines(dsl)
  let title: string | undefined
  const steps: ProcessStep[] = []

  for (const line of lines) {
    if (line.startsWith('@process')) {
      const m = /^@process\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const stepMatch = /^step\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (stepMatch) {
      steps.push({
        number: steps.length + 1,
        title: stripQuotes(stepMatch[1]!),
        subtitle: stepMatch[2] ? stripQuotes(stepMatch[2]) : undefined,
      })
      continue
    }
  }

  return { type: 'process', title, steps }
}

function parseStrategy(dsl: string): StrategyData {
  const lines = getLines(dsl)
  let title: string | undefined
  const blocks: StrategyBlock[] = []

  for (const line of lines) {
    if (line.startsWith('@strategy')) {
      const m = /^@strategy\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const blockMatch = /^block\s+"([^"]*)"\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (blockMatch) {
      blocks.push({
        number: blockMatch[1]!,
        title: stripQuotes(blockMatch[2]!),
        subtitle: blockMatch[3] ? stripQuotes(blockMatch[3]) : undefined,
      })
      continue
    }
  }

  return { type: 'strategy', title, blocks }
}

function parsePuzzle(dsl: string): PuzzleData {
  const lines = getLines(dsl)
  let title: string | undefined
  const pieces: PuzzlePiece[] = []

  for (const line of lines) {
    if (line.startsWith('@puzzle')) {
      const m = /^@puzzle\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'piece' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const pieceTitle = stripQuotes(args[0]!)
      const subtitle = args.length >= 2 && !args[1]!.startsWith('#')
        ? stripQuotes(args[1]!)
        : undefined
      const colorIdx = subtitle ? 2 : 1
      const color = args[colorIdx]?.startsWith('#') ? args[colorIdx]! : '#4a90d9'
      pieces.push({
        number: pieces.length + 1,
        title: pieceTitle,
        subtitle,
        color,
      })
      continue
    }
  }

  return { type: 'puzzle', title, pieces }
}

function parseFunnel(dsl: string): FunnelData {
  const lines = getLines(dsl)
  let title: string | undefined
  const levels: FunnelLevel[] = []

  for (const line of lines) {
    if (line.startsWith('@funnel')) {
      const m = /^@funnel\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const levelMatch = /^level\s+"([^"]*)"(?:\s+(\d+))?(?:\s+(#[0-9a-fA-F]+))?\s*$/.exec(line)
    if (levelMatch) {
      levels.push({
        title: stripQuotes(levelMatch[1]!),
        percentage: levelMatch[2] ? Number(levelMatch[2]) : undefined,
        color: levelMatch[3] || undefined,
      })
      continue
    }
  }

  return { type: 'funnel', title, levels }
}

function parseDashboard(dsl: string): DashboardData {
  const lines = getLines(dsl)
  let title: string | undefined
  const metrics: DashboardMetric[] = []

  for (const line of lines) {
    if (line.startsWith('@dashboard')) {
      const m = /^@dashboard\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const metricMatch = /^metric\s+"([^"]*)"\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (metricMatch) {
      metrics.push({
        label: metricMatch[1]!,
        value: metricMatch[2]!,
        change: metricMatch[3] || undefined,
      })
      continue
    }
  }

  return { type: 'dashboard', title, metrics }
}

function parseTable(dsl: string): TableData {
  const lines = getLines(dsl)
  let title: string | undefined
  let columns: string[] = []
  const rows: TableRow[] = []

  for (const line of lines) {
    if (line.startsWith('@table')) {
      const m = /^@table\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const tokens = tokenizeLine(line)
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

function parseAgenda(dsl: string): AgendaData {
  const lines = getLines(dsl)
  let title: string | undefined
  const items: AgendaItem[] = []

  for (const line of lines) {
    if (line.startsWith('@agenda')) {
      const m = /^@agenda\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const itemMatch = /^item\s+"([^"]*)"\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (itemMatch) {
      items.push({
        number: itemMatch[1]!,
        title: stripQuotes(itemMatch[2]!),
        subtitle: itemMatch[3] ? stripQuotes(itemMatch[3]) : undefined,
      })
      continue
    }
  }

  return { type: 'agenda', title, items }
}

function parseComparison(dsl: string): ComparisonData {
  const lines = getLines(dsl)
  let title: string | undefined
  let leftTitle = ''
  let rightTitle = ''
  const items: ComparisonItem[] = []

  for (const line of lines) {
    if (line.startsWith('@comparison')) {
      const m = /^@comparison\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const leftMatch = /^left\s+"([^"]*)"\s*$/.exec(line)
    if (leftMatch) { leftTitle = leftMatch[1]!; continue }

    const rightMatch = /^right\s+"([^"]*)"\s*$/.exec(line)
    if (rightMatch) { rightTitle = rightMatch[1]!; continue }

    const compMatch = /^comp\s+"([^"]*)"\s+"([^"]*)"\s+"([^"]*)"\s*$/.exec(line)
    if (compMatch) {
      items.push({
        label: compMatch[1]!,
        left: compMatch[2]!,
        right: compMatch[3]!,
      })
      continue
    }
  }

  return { type: 'comparison', title, leftTitle, rightTitle, items }
}

function parseBusiness(dsl: string): BusinessData {
  const lines = getLines(dsl)
  let title: string | undefined
  let centerLabel = ''
  const nodes: { title: string; subtitle?: string }[] = []

  for (const line of lines) {
    if (line.startsWith('@business')) {
      const m = /^@business\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    if (/^center\s+/.test(line)) {
      const m = /^center\s+"([^"]*)"\s*$/.exec(line)
      if (m) centerLabel = m[1]!
      continue
    }
    const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'nodes') {
      for (const t of tokens.tokens.slice(1)) {
        nodes.push({ title: stripQuotes(t) })
      }
      continue
    }
  }

  return { type: 'business', title, centerLabel, nodes }
}

function parseBrain(dsl: string): BrainData {
  const lines = getLines(dsl)
  let title: string | undefined
  let centerLabel = ''
  const branches: { title: string; subtitle?: string; color?: string }[] = []

  for (const line of lines) {
    if (line.startsWith('@brain')) {
      const m = /^@brain\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const centerMatch = /^center\s+"([^"]*)"\s*$/.exec(line)
    if (centerMatch) { centerLabel = centerMatch[1]!; continue }

    const branchMatch = /^branch\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (branchMatch) {
      branches.push({
        title: stripQuotes(branchMatch[1]!),
        subtitle: branchMatch[2] ? stripQuotes(branchMatch[2]) : undefined,
      })
      continue
    }
  }

  return { type: 'brain', title, centerLabel, branches }
}

function parseBudget(dsl: string): BudgetData {
  const lines = getLines(dsl)
  let title: string | undefined
  let totalAmount = ''
  const items: BudgetItem[] = []

  for (const line of lines) {
    if (line.startsWith('@budget')) {
      const m = /^@budget\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const totalMatch = /^total\s+"([^"]*)"\s*$/.exec(line)
    if (totalMatch) { totalAmount = totalMatch[1]!; continue }

    const lineMatch = /^line\s+"([^"]*)"\s+"([^"]*)"\s+(\d+)\s*$/.exec(line)
    if (lineMatch) {
      items.push({
        label: lineMatch[1]!,
        amount: lineMatch[2]!,
        percentage: Number(lineMatch[3]!),
      })
      continue
    }
  }

  return { type: 'budget', title, totalLabel: 'Total', totalAmount, items }
}

function parseDecision(dsl: string): DecisionTreeData {
  const lines = getLines(dsl)
  let title: string | undefined
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
      const m = /^@decision\s+"?([^"]*)"?\s*$/.exec(line)
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

function parseGoals(dsl: string): GoalsData {
  const lines = getLines(dsl)
  let title: string | undefined
  let centerGoal = ''
  const metrics: GoalsMetric[] = []

  for (const line of lines) {
    if (line.startsWith('@goals')) {
      const m = /^@goals\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const centerMatch = /^center\s+"([^"]*)"\s*$/.exec(line)
    if (centerMatch) { centerGoal = centerMatch[1]!; continue }

    const metricMatch = /^metric\s+"([^"]*)"\s+"([^"]*)"\s+"([^"]*)"\s*$/.exec(line)
    if (metricMatch) {
      metrics.push({
        label: metricMatch[1]!,
        value: metricMatch[2]!,
        target: metricMatch[3]!,
      })
      continue
    }
  }

  return { type: 'goals', title, centerGoal, metrics }
}

function parseManufacturing(dsl: string): ManufacturingData {
  const lines = getLines(dsl)
  let title: string | undefined
  const stations: ManufacturingStation[] = []

  for (const line of lines) {
    if (line.startsWith('@manufacturing')) {
      const m = /^@manufacturing\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const stationMatch = /^station\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (stationMatch) {
      stations.push({
        title: stripQuotes(stationMatch[1]!),
        subtitle: stationMatch[2] ? stripQuotes(stationMatch[2]) : undefined,
      })
      continue
    }
  }

  return { type: 'manufacturing', title, stations }
}

function parseValueChain(dsl: string): ValueChainData {
  const lines = getLines(dsl)
  let title: string | undefined
  const primary: ValueChainActivity[] = []
  const support: ValueChainActivity[] = []

  for (const line of lines) {
    if (line.startsWith('@valueChain')) {
      const m = /^@valueChain\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const primaryMatch = /^primary\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (primaryMatch) {
      primary.push({
        title: stripQuotes(primaryMatch[1]!),
        subtitle: primaryMatch[2] ? stripQuotes(primaryMatch[2]) : undefined,
      })
      continue
    }
    const supportMatch = /^support\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (supportMatch) {
      support.push({
        title: stripQuotes(supportMatch[1]!),
        subtitle: supportMatch[2] ? stripQuotes(supportMatch[2]) : undefined,
      })
      continue
    }
  }

  return { type: 'valueChain', title, primary, support }
}

function parseIceberg(dsl: string): IcebergData {
  const lines = getLines(dsl)
  let title: string | undefined
  const sections: IcebergSection[] = []

  for (const line of lines) {
    if (line.startsWith('@iceberg')) {
      const m = /^@iceberg\s+"?([^"]*)"?\s*$/.exec(line)
      if (m && m[1]) title = stripQuotes(m[1])
      continue
    }
    const aboveMatch = /^above\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (aboveMatch) {
      sections.push({
        title: stripQuotes(aboveMatch[1]!),
        subtitle: aboveMatch[2] ? stripQuotes(aboveMatch[2]) : undefined,
        isAbove: true,
      })
      continue
    }
    const belowMatch = /^below\s+"([^"]*)"(?:\s+"([^"]*)")?\s*$/.exec(line)
    if (belowMatch) {
      sections.push({
        title: stripQuotes(belowMatch[1]!),
        subtitle: belowMatch[2] ? stripQuotes(belowMatch[2]) : undefined,
        isAbove: false,
      })
      continue
    }
  }

  return { type: 'iceberg', title, sections }
}
