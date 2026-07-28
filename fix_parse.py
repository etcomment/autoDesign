import re

with open('src/templates/dsl/parseTemplate.ts', 'r') as f:
    content = f.read()

# 1. Insert extractTrailingArgs and emitTrailingArgs
helpers = """
export function extractTrailingArgs(args: string[], startIndex: number) {
  let subtitle: string | undefined
  let color: string | undefined
  let icon: string | undefined
  let value: string | undefined
  let percent: string | undefined

  let idx = startIndex
  if (idx < args.length && !args[idx]!.startsWith('#') && !args[idx]!.startsWith('val:') && !args[idx]!.startsWith('pct:') && !args[idx]!.startsWith('icon:')) {
    subtitle = stripQuotes(args[idx]!)
    idx++
  }

  while (idx < args.length) {
    const arg = args[idx]!
    if (arg.startsWith('val:')) {
      value = stripQuotes(arg.slice(4))
    } else if (arg.startsWith('pct:')) {
      percent = stripQuotes(arg.slice(4))
    } else if (arg.startsWith('icon:')) {
      icon = stripQuotes(arg.slice(5))
    } else if (arg.startsWith('#')) {
      color = arg
    }
    idx++
  }

  return { subtitle, color, icon, value, percent }
}

function emitTrailingArgs(n: Record<string, any>): string {
  let out = ''
  if (n.value) out += ' val:"' + escapeField(n.value) + '"'
  if (n.percent) out += ' pct:"' + escapeField(n.percent) + '"'
  if (n.icon) out += ' icon:' + escapeField(n.icon)
  if (n.color) out += ' ' + n.color
  return out
}
"""
content = content.replace('function parseHeader(trimmed: string): { type: string; title?: string } | null {', helpers + '\nfunction parseHeader(trimmed: string): { type: string; title?: string } | null {')

# 2. Replace parsers

def repl_roadmap(m):
    return """
    const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'milestone' || (tokens.tokens[0] && tokens.tokens[0].startsWith('milestone'))) {
      const token0 = tokens.tokens[0]
      let quarter: string | undefined
      let lane: string | undefined
      if (token0.startsWith('milestone') && token0.length > 'milestone'.length) {
         const parts = token0.substring(9).trim()
         const m2 = /^\\s*([\\w.-]+):([\\w.-]*)$/.exec(parts)
         if (m2) {
             quarter = m2[1]
             lane = m2[2]
         }
      }
      
      const args = tokens.tokens.slice(1)
      if (args.length >= 1) {
          flushMilestone()
          const title = stripQuotes(args[0]!)
          const trailing = extractTrailingArgs(args, 1)
          pendingMilestone = {
            quarter,
            lane,
            title,
            ...trailing
          }
          if (trailing.color || trailing.icon || trailing.value || trailing.percent) {
              pendingStyle = { ...pendingStyle, ...trailing }
              hasPendingStyle = true
          }
          continue
      }
    }
"""
# Roadmap had regex for milestone. Let's just do roadmap properly.
# Actually, roadmap parses style, start, finish. 
content = re.sub(
    r'const milestoneMatch = /\^milestone\(\?:\\s\+\(\[\\w\.-\]\+\):(\[\\w\.-\]\*\)\)\?\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(milestoneMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    const tok0 = tokens.tokens[0]
    if (tok0 && tok0.startsWith('milestone')) {
      let quarter: string | undefined
      let lane: string | undefined
      if (tok0.includes(':')) {
        const parts = tok0.substring('milestone'.length).trim().split(':')
        quarter = parts[0]
        lane = parts[1]
      }
      const args = tokens.tokens.slice(1)
      if (args.length >= 1) {
        flushMilestone()
        const title = stripQuotes(args[0]!)
        const trailing = extractTrailingArgs(args, 1)
        pendingMilestone = {
          quarter,
          lane,
          title,
          ...trailing
        }
        pendingStyle = {}
        hasPendingStyle = false
        if (trailing.color) { pendingStyle.fontColor = trailing.color; hasPendingStyle = true }
        continue
      }
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Process
content = re.sub(
    r'const stepMatch = /\^step\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(stepMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'step' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      steps.push({
        number: steps.length + 1,
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Strategy
content = re.sub(
    r'const blockMatch = /\^block\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(blockMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'block' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      blocks.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Puzzle
content = re.sub(
    r'const tokens = tokenizeLine\(line\)\s+if \(tokens\.tokens\[0\] === \'piece\' && tokens\.tokens\.length >= 2\) \{.*?continue\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'piece' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const pieceTitle = stripQuotes(args[0]!)
      const trailing = extractTrailingArgs(args, 1)
      pieces.push({
        number: pieces.length + 1,
        title: pieceTitle,
        ...trailing,
        color: trailing.color ?? '#4a90d9'
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Funnel
content = re.sub(
    r'const levelMatch = /\^level\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+\(\\d\+\)\)\?\(\?:\\s\+\(#\[0-9a-fA-F\]\+\)\)\?\\s\*\$\/\.exec\(line\)\s+if \(levelMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
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
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Dashboard
content = re.sub(
    r'const metricMatch = /\^metric\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(metricMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'metric' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      metrics.push({
        label: stripQuotes(args[0]!),
        value: stripQuotes(args[1]!),
        change: trailing.subtitle,
        ...trailing,
        subtitle: undefined // cleanup
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Agenda
content = re.sub(
    r'const itemMatch = /\^item\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(itemMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'item' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      items.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Comparison comp
content = re.sub(
    r'const compMatch = /\^comp\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\\s\*\$\/\.exec\(line\)\s+if \(compMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
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
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Comparison entry
content = re.sub(
    r'const tokens = tokenizeLine\(line\)\s+if \(tokens\.tokens\[0\] === \'entry\' && tokens\.tokens\.length >= 2\) \{.*?continue\s+\}',
    """if (tokens.tokens[0] === 'entry' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const name = stripQuotes(args[0]!)
      
      let idx = 1
      let score = 50
      if (idx < args.length && !args[idx]!.startsWith('#') && !args[idx]!.startsWith('val:') && !args[idx]!.startsWith('pct:') && !args[idx]!.startsWith('icon:')) {
        const val = parseFloat(stripQuotes(args[idx]!))
        if (!isNaN(val)) {
            score = val
        }
        idx++
      }
      const trailing = extractTrailingArgs(args, idx)

      entries.push({ name, score, ...trailing })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Business (Already done manually but we can simplify it using extractTrailingArgs)
content = re.sub(
    r'const args = tokens\.tokens\.slice\(1\)\s+const nodeTitle = stripQuotes\(args\[0\]!\)\s+let subtitle: string \| undefined.*?continue\s+\}',
    """const args = tokens.tokens.slice(1)
      const nodeTitle = stripQuotes(args[0]!)
      const trailing = extractTrailingArgs(args, 1)
      nodes.push({
        title: nodeTitle,
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Brain branch
content = re.sub(
    r'const branchMatch = /\^branch\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(branchMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'branch' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      branches.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Budget line
content = re.sub(
    r'const lineMatch = /\^line\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\\s\+\(\\d\+\)\\s\*\$\/\.exec\(line\)\s+if \(lineMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'line' && tokens.tokens.length >= 4) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 3)
      items.push({
        label: stripQuotes(args[0]!),
        amount: stripQuotes(args[1]!),
        percentage: Number(args[2]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Goals metric
content = re.sub(
    r'const metricMatch = /\^metric\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\\s\*\$\/\.exec\(line\)\s+if \(metricMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'metric' && tokens.tokens.length >= 4) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 3)
      metrics.push({
        label: stripQuotes(args[0]!),
        value: stripQuotes(args[1]!),
        target: stripQuotes(args[2]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Manufacturing station
content = re.sub(
    r'const stationMatch = /\^station\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(stationMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'station' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      stations.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# ValueChain primary & support
content = re.sub(
    r'const primaryMatch = /\^primary\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(primaryMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'primary' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      primary.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

content = re.sub(
    r'const supportMatch = /\^support\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(supportMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """if (tokens.tokens[0] === 'support' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      support.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Iceberg above & below
content = re.sub(
    r'const aboveMatch = /\^above\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(aboveMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'above' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      sections.push({
        title: stripQuotes(args[0]!),
        isAbove: true,
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

content = re.sub(
    r'const belowMatch = /\^below\\s\+"\(\[\^"\]\*\)"\(\?:\\s\+"\(\[\^"\]\*\)"\)\?\\s\*\$\/\.exec\(line\)\s+if \(belowMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """if (tokens.tokens[0] === 'below' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      sections.push({
        title: stripQuotes(args[0]!),
        isAbove: false,
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# Circle segment
content = re.sub(
    r'const segmentMatch = /\^segment\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\\s\+"\(\[\^"\]\*\)"\(\(\\s\+\(\\S\+\)\)\)\\?\\s\*\$\/\.exec\(line\)\s+if \(segmentMatch\) \{.*?(?=^\s+continue\n\s+\})^\s+continue\n\s+\}',
    """const tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'segment' && tokens.tokens.length >= 4) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 3)
      segments.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        description: stripQuotes(args[2]!),
        ...trailing
      })
      continue
    }""",
    content, flags=re.DOTALL|re.MULTILINE
)

# 3. Modify generateDslText to use emitTrailingArgs
#   const milestones = list('milestones')
#   if (milestones) for (const m of milestones) out += `  milestone${m.quarter ? ' ' + m.quarter + ':' + (m.lane ?? '') : ''} "${esc(m.title)}"${m.subtitle ? ' "' + esc(m.subtitle) + '"' : ''}\n`
# 
def repl_gen(m):
    return m.group(0).replace('"' + m.group(2) + ' + \'"\' : \'\'}', 
                              '"\' + esc(' + m.group(2) + ') + \'"\' : \'\'}' + '${emitTrailingArgs(' + m.group(1) + ')}')
    
content = re.sub(r'(\w+)\.subtitle \? \' "\' \+ esc\((\w+)\.subtitle\) \+ \'"\' : \'\'', 
                 lambda m: m.group(0) + ' + emitTrailingArgs(' + m.group(1) + ')', content)

# Dashboard metric change:
content = re.sub(r'm\.change \? \' "\' \+ esc\(m\.change\) \+ \'"\' : \'\'', 
                 'm.change ? \' "\' + esc(m.change) + \'"\' : \'\'} + emitTrailingArgs(m)', content)

# Comparison entry:
content = re.sub(r'out \+= \'  entry "\' \+ esc\(e\.name \?\? e\.title \?\? \'\'\) \+ \'" "\' \+ \(e\.score \?\? 50\) \+ \'"\' \+ colStr \+ \'\\n\'',
                 'out += \'  entry "\' + esc(e.name ?? e.title ?? \'\') + \'" "\' + (e.score ?? 50) + \'"\' + emitTrailingArgs(e) + \'\\n\'', content)

# Business node:
content = re.sub(r'out \+= \'  node "\' \+ esc\(n\.title\) \+ \'"\' \+ \(n\.subtitle \? \' "\' \+ esc\(n\.subtitle\) \+ \'"\' : \'\'\) \+ valStr \+ pctStr \+ colStr \+ \'\\n\'',
                 'out += \'  node "\' + esc(n.title) + \'"\' + (n.subtitle ? \' "\' + esc(n.subtitle) + \'"\' : \'\') + emitTrailingArgs(n) + \'\\n\'', content)
content = content.replace('const valStr = n.value ? \' val:"\' + esc(n.value) + \'"\' : \'\'\n      const pctStr = n.percent ? \' pct:"\' + esc(n.percent) + \'"\' : \'\'\n      const colStr = n.color ? \' \' + n.color : \'\'\n      ', '')

# Circle segment:
content = re.sub(r'out \+= `  segment "\$\{esc\(s\.number\)\}" "\$\{esc\(s\.title\)\}" "\$\{esc\(s\.description \?\? \'\'\)\}"\$\{s\.icon \? \' \' \+ s\.icon : \'\'\}\\n`',
                 'out += `  segment "${esc(s.number)}" "${esc(s.title)}" "${esc(s.description ?? \'\')}"${emitTrailingArgs(s)}\\n`', content)

# Replace remaining .color manual usages
# Budget item
content = re.sub(r'const colStr = e\.color \? \' \' \+ e\.color : \'\'\n      out \+= \'  entry "', 'out += \'  entry "', content)

with open('src/templates/dsl/parseTemplate.ts', 'w') as f:
    f.write(content)

