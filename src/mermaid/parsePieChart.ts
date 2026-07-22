export interface PieSlice {
  label: string
  value: number
}

export function parsePieChart(dsl: string): PieSlice[] {
  const slices: PieSlice[] = []
  const lines = dsl.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('%%') || /^pie/i.test(trimmed)) continue
    if (trimmed.startsWith('title') || trimmed.startsWith('accTitle')) continue

    const quoted = /^"([^"]+)"\s*:\s*([\d.]+)/.exec(trimmed)
    if (quoted) {
      slices.push({ label: quoted[1]!, value: parseFloat(quoted[2]!) })
      continue
    }

    const plain = /^(\w[\w\s-]*?)\s*:\s*([\d.]+)/.exec(trimmed)
    if (plain) {
      slices.push({ label: plain[1]!.trim(), value: parseFloat(plain[2]!) })
      continue
    }
  }

  return slices
}

export function isPieChart(dsl: string): boolean {
  return /^\s*pie/i.test(dsl)
}
