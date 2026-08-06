const fs = require('fs');
for (let i = 47; i <= 53; i++) {
  const content = fs.readFileSync(`slide_${i}.svg`, 'utf8');
  // extract everything between <text> or <tspan> tags
  const matches = content.match(/<tspan[^>]*>(.*?)<\/tspan>/g);
  if (matches) {
    const text = matches.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
    console.log(`Slide ${i}: ${text.substring(0, 150)}`);
  }
}
