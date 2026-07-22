import { useDiagramStore } from '../../store/diagramStore'
import type { GitCommit } from '../../mermaid/parseGitGraph'

const BRANCH_COLORS = ['#4a90d9', '#e91e63', '#4caf50', '#ff9800', '#9c27b0', '#00bcd4', '#ff5722', '#607d8b']

export function GitGraphRenderer() {
  const diagramType = useDiagramStore(s => s.diagramType)
  const diagramData = useDiagramStore(s => s.diagramData)

  if (diagramType !== 'gitGraph' || !diagramData?.commits) return null
  const commits = diagramData.commits as GitCommit[]
  const branches = diagramData.branches as { name: string; order: number }[]

  const branchOrder = new Map<string, number>()
  for (const b of branches) branchOrder.set(b.name, b.order)

  const radius = 6
  const spacing = 35
  const xBase = 100
  const laneWidth = 30

  return (
    <g>
      {branches.map((b) => (
        <g key={b.name}>
          <text x={20} y={30 + b.order * 20} fontFamily="Arial, sans-serif" fontSize={11} fontWeight={600}
            fill={BRANCH_COLORS[b.order % BRANCH_COLORS.length]!}>{b.name}</text>
          <line x1={xBase + b.order * laneWidth} y1={50} x2={xBase + b.order * laneWidth} y2={50 + commits.length * spacing}
            stroke={BRANCH_COLORS[b.order % BRANCH_COLORS.length]!} strokeWidth={2} strokeDasharray={b.order === 0 ? 'none' : '4 3'} />
        </g>
      ))}

      {commits.map((commit, i) => {
        const order = branchOrder.get(commit.branch) ?? 0
        const cx = xBase + order * laneWidth
        const cy = 50 + (i + 1) * spacing

        return (
          <g key={commit.id}>
            <circle cx={cx} cy={cy} r={radius} fill={BRANCH_COLORS[order % BRANCH_COLORS.length]!}
              stroke="white" strokeWidth={1.5} />
            <text x={xBase + 120} y={cy + 4} fontFamily="Arial, sans-serif" fontSize={11} fill="#333">{commit.message}</text>
            <text x={xBase + 80} y={cy + 4} fontFamily="Arial, sans-serif" fontSize={9} fill="#999">{commit.id}</text>
          </g>
        )
      })}
    </g>
  )
}
