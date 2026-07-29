const fs = require('fs');

// Fix types.ts
let types = fs.readFileSync('src/templates/types.ts', 'utf8');
types = types.replace(/export interface GoalsMetric \{\n  label: string\n  value: string\n  target: string\n  color\?: string\n  icon\?: string\n  value\?: string\n  percent\?: string\n\}/, 
`export interface GoalsMetric {
  label: string
  value: string
  target: string
  color?: string
  icon?: string
  percent?: string
}`);
fs.writeFileSync('src/templates/types.ts', types);

// Fix parseTemplate.ts
let parse = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');

// Fix parseDashboard (metric)
parse = parse.replace(/metrics\.push\(\{\n\s+label: stripQuotes\(args\[0\]!\),\n\s+value: stripQuotes\(args\[1\]!\),\n\s+change: trailing\.subtitle,\n\s+\.\.\.trailing,\n\s+subtitle: undefined \/\/ cleanup\n\s+\}\)/, 
`metrics.push({
        label: stripQuotes(args[0]!),
        value: trailing.value ?? stripQuotes(args[1]!),
        change: trailing.subtitle,
        color: trailing.color,
        icon: trailing.icon,
        percent: trailing.percent,
      })`);

// Fix parseGoals (metric)
parse = parse.replace(/metrics\.push\(\{\n\s+label: stripQuotes\(args\[0\]!\),\n\s+value: stripQuotes\(args\[1\]!\),\n\s+target: stripQuotes\(args\[2\]!\),\n\s+\.\.\.trailing\n\s+\}\)/, 
`metrics.push({
        label: stripQuotes(args[0]!),
        value: trailing.value ?? stripQuotes(args[1]!),
        target: stripQuotes(args[2]!),
        color: trailing.color,
        icon: trailing.icon,
        percent: trailing.percent,
      })`);

// Fix tokens redeclaration
// In parseBusiness, tokens is declared.
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n\s+if \(tokens\.tokens\[0\] === 'node' && tokens\.tokens\.length >= 2\)/g, 
`if (tokens.tokens[0] === 'node' && tokens.tokens.length >= 2)`);
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n\s+if \(tokens\.tokens\[0\] === 'support' && tokens\.tokens\.length >= 2\)/g, 
`if (tokens.tokens[0] === 'support' && tokens.tokens.length >= 2)`);
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n\s+if \(tokens\.tokens\[0\] === 'below' && tokens\.tokens\.length >= 2\)/g, 
`if (tokens.tokens[0] === 'below' && tokens.tokens.length >= 2)`);
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n\s+if \(tokens\.tokens\[0\] === 'entry' && tokens\.tokens\.length >= 2\)/g, 
`if (tokens.tokens[0] === 'entry' && tokens.tokens.length >= 2)`);

// Fix Circle segment icon
parse = parse.replace(/description: stripQuotes\(args\[2\]!\),\n\s+\.\.\.trailing\n\s+\}\)/, 
`description: stripQuotes(args[2]!),
        ...trailing,
        icon: trailing.icon ?? ''
      })`);

// Fix generateDslText node
// Currently: out += '  node "' + esc(n.title) + '"' + (n.subtitle ? ' "' + esc(n.subtitle) + '"' : '' + emitTrailingArgs(n)) + valStr + pctStr + colStr + '\n'
// We want: out += '  node "' + esc(n.title) + '"' + (n.subtitle ? ' "' + esc(n.subtitle) + '"' : '') + emitTrailingArgs(n) + '\n'
parse = parse.replace(/out \+= '  node "' \+ esc\(n\.title\) \+ '"' \+ \(n\.subtitle \? ' "' \+ esc\(n\.subtitle\) \+ '"' : '' \+ emitTrailingArgs\(n\)\) \+ valStr \+ pctStr \+ colStr \+ '\\n'/, 
`out += '  node "' + esc(n.title) + '"' + (n.subtitle ? ' "' + esc(n.subtitle) + '"' : '') + emitTrailingArgs(n) + '\\n'`);

fs.writeFileSync('src/templates/dsl/parseTemplate.ts', parse);

