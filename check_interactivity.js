const fs = require('fs');
const path = require('path');

const dir = 'src/templates/components';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Roadmap') || f.startsWith('ProductRoadmap'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  // Simple check: how many <rect, <circle, <line, <path don't have onMouseDown or aren't inside a <g onMouseDown
  // Actually easier: just print the file names.
});
