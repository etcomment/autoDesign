const fs = require('fs');
let parse = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');

parse = parse.replace(/if \(tokens\.tokens\[0\] === 'node' && tokens\.tokens\.length >= 2\)/, 
`const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'node' && tokens.tokens.length >= 2)`);

parse = parse.replace(/if \(tokens\.tokens\[0\] === 'support' && tokens\.tokens\.length >= 2\)/, 
`const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'support' && tokens.tokens.length >= 2)`);

parse = parse.replace(/if \(tokens\.tokens\[0\] === 'below' && tokens\.tokens\.length >= 2\)/, 
`const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'below' && tokens.tokens.length >= 2)`);

parse = parse.replace(/if \(tokens\.tokens\[0\] === 'entry' && tokens\.tokens\.length >= 2\)/, 
`const tokens = tokenizeLine(line)\n    if (tokens.tokens[0] === 'entry' && tokens.tokens.length >= 2)`);

fs.writeFileSync('src/templates/dsl/parseTemplate.ts', parse);
