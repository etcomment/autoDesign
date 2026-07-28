const fs = require('fs');
let parse = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');

// Fix the extra `}` from my previous failed attempt
parse = parse.replace(/nodes\.push\(\{ title: stripQuotes\(t\) \}\)\n      \}\n      continue\n    \} \}/g, 
`nodes.push({ title: stripQuotes(t) })\n      }\n      continue\n    }`);

parse = parse.replace(/entries\.push\(\{ name, score, \.\.\.trailing \}\)\n      continue\n    \} \}/g, 
`entries.push({ name, score, ...trailing })\n      continue\n    }`);

parse = parse.replace(/support\.push\(\{\n\s+title: stripQuotes\(args\[0\]!\),\n\s+\.\.\.trailing\n\s+\}\)\n\s+continue\n\s+\} \}/g, 
`support.push({\n        title: stripQuotes(args[0]!),\n        ...trailing\n      })\n      continue\n    }`);

parse = parse.replace(/isAbove: false,\n\s+\.\.\.trailing\n\s+\}\)\n\s+continue\n\s+\} \}/g, 
`isAbove: false,\n        ...trailing\n      })\n      continue\n    }`);

// Fix block-scoped redeclaration by using `var`
parse = parse.replace(/const tokens = tokenizeLine\(line\)/g, `var tokens = tokenizeLine(line)`);

fs.writeFileSync('src/templates/dsl/parseTemplate.ts', parse);
