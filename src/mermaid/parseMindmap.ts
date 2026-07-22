export interface MindmapNode {
  id: string
  text: string
  children: MindmapNode[]
}

export function parseMindmap(dsl: string): { root: MindmapNode | null } {
  const lines = dsl.split('\n')
  const root: MindmapNode | null = null
  const stack: { indent: number; node: MindmapNode }[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^mindmap/i.test(trimmed)) continue

    const indent = line.length - line.trimStart().length
    const text = trimmed.replace(/^[*-]\s*/, '').trim()

    const node: MindmapNode = { id: `mm-${Math.random().toString(36).slice(2, 8)}`, text, children: [] }

    while (stack.length > 0 && stack[stack.length - 1]!.indent >= indent) {
      stack.pop()
    }

    if (stack.length === 0) {
      if (root) {
        root.children.push(node)
      }
    } else {
      stack[stack.length - 1]!.node.children.push(node)
    }

    stack.push({ indent, node })
  }

  return { root }
}

export function isMindmap(dsl: string): boolean {
  return /^\s*mindmap/i.test(dsl)
}
