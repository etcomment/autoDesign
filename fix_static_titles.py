import os
import re

dir_path = "src/templates/components"

def replacer(match):
    original_text = match.group(0)
    
    # We only want to replace if it's the simple static title.
    # Pattern is roughly `{title && (\s*<text ...>{title}</text>\s*)}`
    
    inner_text = match.group(1)
    
    # Check if W is defined in the file, we can just use 450 as default if W is not around, but W/2 is usually in the inner_text.
    
    replacement = """{title && (() => {
        const elementId = 'title'
        const defaultBbox = { x: 300, y: 28, width: 300, height: 40 }
        const customPos = templateElementPositions[elementId]
        const isSelected = selectedIds.has(elementId)
        const bbox = {
          x: customPos?.x ?? defaultBbox.x,
          y: customPos?.y ?? defaultBbox.y,
          width: customPos?.width ?? defaultBbox.width,
          height: customPos?.height ?? defaultBbox.height
        }
        const scaleX = bbox.width / defaultBbox.width
        const scaleY = bbox.height / defaultBbox.height
        return (
          <g onMouseDown={e => startDrag(e, elementId, bbox)} transform={getTransform(elementId, bbox)} style={{ cursor: 'pointer' }}>
            <g transform={`translate(${bbox.x}, ${bbox.y}) scale(${scaleX}, ${scaleY}) translate(${-defaultBbox.x}, ${-defaultBbox.y})`}>
              """ + inner_text.strip() + """
            </g>
            {isSelected && renderHandles(bbox, elementId)}
          </g>
        )
      })()}"""
      
    return replacement

for filename in os.listdir(dir_path):
    if not filename.endswith(".tsx"): continue
    
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # Find static title blocks
    # regex matches `{title && (\s*<text[^>]*>.*?\{title\}.*?</text>\s*)}`
    # We must be careful about nested braces.
    
    new_content = re.sub(r'\{title\s*&&\s*\(\s*(<text[^>]*>[\s\S]*?\{title\}[\s\S]*?</text>)\s*\)\}', replacer, content)
    
    # Some have `#222` or `TITLE_COLOR` inside. The regex `[\s\S]*?` will match.
    
    if new_content != content:
        # Check if W is not defined in the scope of the return? W is usually defined.
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated title in {filename}")

