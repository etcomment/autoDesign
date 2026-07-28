const fs = require('fs');
let parse = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');

parse = parse.replace(/if \(tokens\.tokens\[0\] === 'nodes'\) \{\n\s+for \(const t of tokens\.tokens\.slice\(1\)\) \{\n\s+nodes\.push\(\{ title: stripQuotes\(t\) \}\)\n\s+\}\n\s+continue\n\s+\}/,
`if (tokens.tokens[0] === 'nodes') {
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
    }`);

fs.writeFileSync('src/templates/dsl/parseTemplate.ts', parse);
