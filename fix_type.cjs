const fs = require('fs');

let types = fs.readFileSync('src/templates/types.ts', 'utf8');
for (let i = 2; i <= 11; i++) {
  types = types.replace(new RegExp(`export type Business${i}Data = BusinessData`), 
    `export type Business${i}Data = Omit<BusinessData, 'type'> & { type: 'business${i}' }`);
}
fs.writeFileSync('src/templates/types.ts', types);

let parse = fs.readFileSync('src/templates/dsl/parseTemplate.ts', 'utf8');
parse = parse.replace(/const nodes: \{ title: string; subtitle\?: string \}\[\] = \[\]/, 
  `const nodes: { title: string; subtitle?: string; value?: string; percent?: string; color?: string; icon?: string }[] = []`);
fs.writeFileSync('src/templates/dsl/parseTemplate.ts', parse);

