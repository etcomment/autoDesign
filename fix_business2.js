const fs = require('fs')

let code = fs.readFileSync('src/templates/components/Business2Template.tsx', 'utf8')

// 1. Support real number of nodes
code = code.replace(
  /const visibleBlocksCount =.*?;/g,
  `const displayNodes = nodes.length > 0 ? nodes : DEFAULT_BLOCKS;`
)
code = code.replace(
  /DEFAULT_BLOCKS\.slice\(0, visibleBlocksCount\)\.map\(\(defaultConfig, i\) => {/,
  `displayNodes.map((nodeData, i) => {
        const defaultConfig = DEFAULT_BLOCKS[i % DEFAULT_BLOCKS.length]`
)
// Remove `const nodeData = nodes[i]` since we now have it in map args
code = code.replace(/const nodeData = nodes\[i\]\n/, '')

// 2 & 4: Fallbacks for geometry if i >= 4, and dynamic calculation for drag & resize
code = code.replace(/const defaultBbox = blockBboxes\[i\]!/, `const defaultBbox = blockBboxes[i] || {
          x: (i % 2 === 0) ? 135 : 450,
          y: botY + 40 + Math.floor((i - 4) / 2) * 200,
          width: 315,
          height: 180,
        }
        const poly = polygonPoints[i] || \`\${defaultBbox.x},\${defaultBbox.y} \${defaultBbox.x + defaultBbox.width},\${defaultBbox.y} \${defaultBbox.x + defaultBbox.width},\${defaultBbox.y + defaultBbox.height} \${defaultBbox.x},\${defaultBbox.y + defaultBbox.height}\``)

code = code.replace(/const iconPos = iconCenters\[i\]!/, `const iconPos = iconCenters[i] || {
          cx: (i % 2 === 0) ? 150 : 750,
          cy: defaultBbox.y + 90,
        }`)

// Transform polygon for scale
code = code.replace(/<g transform=\{\`translate\(\$\{dx\}, \$\{dy\}\)\`\}>\n\s*<polygon\n\s*points=\{polygonPoints\[i\]\}/, `const scaleX = bbox.width / defaultBbox.width;
        const scaleY = bbox.height / defaultBbox.height;

        return (
          <g key={i}>
            {/* Main Interactive Polygon Block */}
            <g onMouseDown={e => startDrag(e, elementId, bbox)} style={{ cursor: 'pointer' }}>
              <g transform={\`translate(\${bbox.x}, \${bbox.y}) scale(\${scaleX}, \${scaleY}) translate(\${-defaultBbox.x}, \${-defaultBbox.y})\`}>
                <polygon
                  points={poly}`)
// Remove the old return ( ...
code = code.replace(/return \(\n\s*<g key=\{i\}>\n\s*\{\/\* Main Interactive Polygon Block \*\/\}\n\s*<g onMouseDown=\{e => startDrag\(e, elementId, bbox\)\} style=\{\{ cursor: 'pointer' \}\}>\n\s*<g transform=\{\`translate\(\$\{dx\}, \$\{dy\}\)\`\}>\n\s*<polygon\n\s*points=\{polygonPoints\[i\]\}/, '')

// Multi-line text for subtitle
code = code.replace(/const textLines = textVal\.split\('\\n'\)\.flatMap\(line => \{[\s\S]*?return \[line\]\n\s*\}\)/, `const textLines = textVal.split('\\n').flatMap(line => {
          if (line.length > 35) {
            const words = line.split(' ');
            const res = [];
            let current = '';
            words.forEach(w => {
              if ((current + w).length > 35) { res.push(current); current = w + ' '; }
              else { current += w + ' '; }
            });
            if (current) res.push(current);
            return res.map(l => l.trim());
          }
          return [line]
        })`)

// Stroke props
code = code.replace(/const strokeColor = tplStrokeColors\[elementId\] \?\? \(isSelected \? '#4a90d9' : 'none'\)/, `const strokeColor = tplStrokeColors[elementId] || (isSelected ? '#4a90d9' : 'none')`)
code = code.replace(/const strokeWidth = tplStrokeWidths\[elementId\] \?\? \(isSelected \? 3 : 0\)/, `const strokeWidth = tplStrokeWidths[elementId] !== undefined ? tplStrokeWidths[elementId] : (isSelected ? 3 : 0)`)

fs.writeFileSync('src/templates/components/Business2Template.tsx', code)
