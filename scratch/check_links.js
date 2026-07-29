const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('src/templates/components/{Process,Business}*.tsx');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.match(/<(Arrow|CurvedPath|path|line|ArrowLink)/)) {
    console.log(file);
  }
}
