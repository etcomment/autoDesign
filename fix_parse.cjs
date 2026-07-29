const fs = require('fs');

let content = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');

const helpers = `
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
`;

content = content.replace('function parseHeader(trimmed: string): { type: string; title?: string } | null {', helpers + '\nfunction parseHeader(trimmed: string): { type: string; title?: string } | null {');

// Replace parsing logic using simple string replacement or regex
content = content.replace(/const milestoneMatch = \/\^milestone(?:[\s\S]*?)continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
        if (trailing.color || trailing.icon || trailing.value || trailing.percent) { 
          Object.assign(pendingStyle, trailing)
          hasPendingStyle = true 
        }
        continue
      }
    }`);

content = content.replace(/const stepMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'step' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      steps.push({
        number: steps.length + 1,
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const blockMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'block' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      blocks.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const tokens = tokenizeLine\(line\)\n\s+if \(tokens\.tokens\[0\] === 'piece' && tokens\.tokens\.length >= 2\) \{[\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

content = content.replace(/const levelMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

content = content.replace(/const metricMatch = \/\^metric(?:[\s\S]*?)continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

content = content.replace(/const itemMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'item' && tokens.tokens.length >= 3) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 2)
      items.push({
        number: stripQuotes(args[0]!),
        title: stripQuotes(args[1]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const compMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

content = content.replace(/if \(tokens\.tokens\[0\] === 'entry' && tokens\.tokens\.length >= 2\) \{[\s\S]*?continue\n\s+\}/, `if (tokens.tokens[0] === 'entry' && tokens.tokens.length >= 2) {
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
    }`);

content = content.replace(/const tokens = tokenizeLine\(line\)\n\s+if \(tokens\.tokens\[0\] === 'node' && tokens\.tokens\.length >= 2\) \{[\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'node' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const nodeTitle = stripQuotes(args[0]!)
      const trailing = extractTrailingArgs(args, 1)
      nodes.push({
        title: nodeTitle,
        ...trailing
      })
      continue
    }`);

content = content.replace(/const branchMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'branch' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      branches.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const lineMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

// For goals metric it's the second occurrence of metricMatch:
content = content.replace(/const metricMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

content = content.replace(/const stationMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'station' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      stations.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const primaryMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'primary' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      primary.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const supportMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'support' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      support.push({
        title: stripQuotes(args[0]!),
        ...trailing
      })
      continue
    }`);

content = content.replace(/const aboveMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'above' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      sections.push({
        title: stripQuotes(args[0]!),
        isAbove: true,
        ...trailing
      })
      continue
    }`);

content = content.replace(/const belowMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
    if (tokens.tokens[0] === 'below' && tokens.tokens.length >= 2) {
      const args = tokens.tokens.slice(1)
      const trailing = extractTrailingArgs(args, 1)
      sections.push({
        title: stripQuotes(args[0]!),
        isAbove: false,
        ...trailing
      })
      continue
    }`);

content = content.replace(/const segmentMatch = [\s\S]*?continue\n\s+\}/, `var tokens = tokenizeLine(line)
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
    }`);

// Update generateDslText

content = content.replace(/(\w+)\.subtitle \? ' "' \+ esc\(\1\.subtitle\) \+ '"' : ''/g, (match, p1) => {
  return match + ` + emitTrailingArgs(${p1})`;
});

content = content.replace(/m\.change \? ' "' \+ esc\(m\.change\) \+ '"' : ''/g, `m.change ? ' "' + esc(m.change) + '"' : ''} + emitTrailingArgs(m)`);

content = content.replace(/out \+= '  entry "' \+ esc\(e\.name \?\? e\.title \?\? ''\) \+ '" "' \+ \(e\.score \?\? 50\) \+ '"' \+ colStr \+ '\\n'/, 
  `out += '  entry "' + esc(e.name ?? e.title ?? '') + '" "' + (e.score ?? 50) + '"' + emitTrailingArgs(e) + '\\n'`);

content = content.replace(/out \+= '  node "' \+ esc\(n\.title\) \+ '"' \+ \(n\.subtitle \? ' "' \+ esc\(n\.subtitle\) \+ '"' : ''\) \+ valStr \+ pctStr \+ colStr \+ '\\n'/, 
  `out += '  node "' + esc(n.title) + '"' + (n.subtitle ? ' "' + esc(n.subtitle) + '"' : '') + emitTrailingArgs(n) + '\\n'`);

content = content.replace(/const valStr = n.value \? ' val:"' \+ esc\(n\.value\) \+ '"' : ''\n      const pctStr = n.percent \? ' pct:"' \+ esc\(n\.percent\) \+ '"' : ''\n      const colStr = n.color \? ' ' \+ n\.color : ''\n      /, '');

content = content.replace(/out \+= \`  segment "\$\{esc\(s\.number\)\}" "\$\{esc\(s\.title\)\}" "\$\{esc\(s\.description \?\? ''\)\}"\$\{s\.icon \? ' ' \+ s\.icon : ''\}\\n\`/, 
  `out += \`  segment "\$\{esc(s.number)\}" "\$\{esc(s.title)\}" "\$\{esc(s.description ?? '')\}"\$\{emitTrailingArgs(s)\}\\n\``);

content = content.replace(/const colStr = e\.color \? ' ' \+ e\.color : ''\n      out \+= '  entry "'/g, `out += '  entry "'`);

fs.writeFileSync('src/templates/dsl/parseTemplate.ts', content);

