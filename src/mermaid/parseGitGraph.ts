export interface GitCommit {
  id: string
  message: string
  branch: string
  type?: 'commit' | 'merge' | 'cherry-pick'
}

export interface GitBranch {
  name: string
  order: number
}

export function parseGitGraph(dsl: string): { commits: GitCommit[]; branches: GitBranch[] } {
  const commits: GitCommit[] = []
  const branches: GitBranch[] = [{ name: 'main', order: 0 }]
  const branchOrder = new Map<string, number>([['main', 0]])
  let currentBranch = 'main'
  const lines = dsl.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^gitGraph/i.test(trimmed)) continue

    const branchMatch = /^branch\s+(\S+)/i.exec(trimmed)
    if (branchMatch) {
      currentBranch = branchMatch[1]!
      if (!branchOrder.has(currentBranch)) {
        const order = branches.length
        branchOrder.set(currentBranch, order)
        branches.push({ name: currentBranch, order })
      }
      continue
    }

    const checkoutMatch = /^checkout\s+(\S+)/i.exec(trimmed)
    if (checkoutMatch) {
      currentBranch = checkoutMatch[1]!
      continue
    }

    const commitMatch = /^commit(?:\s+id:\s*"([^"]+)")?\s*(.*)?/i.exec(trimmed)
    if (commitMatch) {
      const id = commitMatch[1] ?? `c${commits.length}`
      const message = (commitMatch[2] ?? 'Commit').trim() || 'Commit'
      commits.push({ id, message, branch: currentBranch })
      continue
    }

    const mergeMatch = /^merge\s+(\S+)/i.exec(trimmed)
    if (mergeMatch) {
      commits.push({
        id: `m${commits.length}`,
        message: `Merge ${mergeMatch[1]!}`,
        branch: currentBranch,
        type: 'merge',
      })
    }
  }

  return { commits, branches }
}

export function isGitGraph(dsl: string): boolean {
  return /^\s*gitGraph/i.test(dsl)
}
