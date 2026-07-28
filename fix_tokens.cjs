const fs = require('fs');
let parse = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');

parse = parse.replace(/const tokens = tokenizeLine\(line\)/g, `const tokens = tokenizeLine(line)`);
// Actually, it's easier to just replace all `const tokens = tokenizeLine(line)` with `let tokens = tokenizeLine(line)` 
// but `let` would also clash if declared multiple times.
// Better to just declare `let tokens: any;` at the top of the loop? No, just wrap the second one in a block.

// In parseComparison:
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n    if \(tokens\.tokens\[0\] === 'entry'/g, 
`{ const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'entry'`);
parse = parse.replace(/entries\.push\(\{ name, score, \.\.\.trailing \}\)\n      continue\n    \}/g, 
`entries.push({ name, score, ...trailing })\n      continue\n    } }`);

// In parseBusiness:
// It has nodes, and node.
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n    if \(tokens\.tokens\[0\] === 'nodes'\)/g, 
`{ const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'nodes')`);
parse = parse.replace(/nodes\.push\(\{ title: stripQuotes\(t\) \}\)\n      \}\n      continue\n    \}/g, 
`nodes.push({ title: stripQuotes(t) })\n      }\n      continue\n    } }`);

// In parseValueChain:
// has primary, and support.
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n    if \(tokens\.tokens\[0\] === 'support'/g, 
`{ const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'support'`);
parse = parse.replace(/support\.push\(\{\n\s+title: stripQuotes\(args\[0\]!\),\n\s+\.\.\.trailing\n\s+\}\)\n\s+continue\n\s+\}/g, 
`support.push({\n        title: stripQuotes(args[0]!),\n        ...trailing\n      })\n      continue\n    } }`);

// In parseIceberg:
// has above, and below.
parse = parse.replace(/const tokens = tokenizeLine\(line\)\n    if \(tokens\.tokens\[0\] === 'below'/g, 
`{ const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'below'`);
parse = parse.replace(/isAbove: false,\n\s+\.\.\.trailing\n\s+\}\)\n\s+continue\n\s+\}/g, 
`isAbove: false,\n        ...trailing\n      })\n      continue\n    } }`);

// In parseCircle:
// circle has circle and segment?
// parseCircle has `if (line.startsWith('@circle'))` and `const tokens = tokenizeLine(line)`

fs.writeFileSync('src/templates/dsl/parseTemplate.ts', parse);
