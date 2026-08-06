import os
import re

dir_path = "src/templates/components"

for filename in os.listdir(dir_path):
    if not filename.endswith(".tsx"): continue
    
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r') as f:
        content = f.read()

    # Find elements with startDrag
    # Pattern: <g ... onMouseDown={e => startDrag(e, ID, RECT)} ... >
    # We want to add transform={getTransform(ID, RECT)} to the tag if not present
    
    # We can just look for `onMouseDown={e => startDrag(e, ID, RECT)}`
    # and replace it with `onMouseDown={e => startDrag(e, ID, RECT)} transform={getTransform(ID, RECT)}`
    
    def replacer(match):
        full_match = match.group(0)
        id_var = match.group(1)
        rect_var = match.group(2)
        
        return f"{full_match} transform={{getTransform({id_var}, {rect_var})}}"
        
    
    # We need to only replace if transform={getTransform...} is not already there.
    # A slightly more robust regex for the line:
    lines = content.split('\n')
    new_lines = []
    changed = False
    
    for line in lines:
        if 'startDrag(e,' in line and 'getTransform(' not in line:
            # extract ID and RECT
            # Usually like: startDrag(e, elementId, bbox)
            m = re.search(r"startDrag\([^,]+,\s*([^,]+),\s*([^\)]+)\)", line)
            if m:
                id_var = m.group(1).strip()
                rect_var = m.group(2).strip()
                
                # Check if it's already got a transform (maybe a static one)
                # Actually, some might have transform={`translate(...)`}. We should append if needed, but wait:
                # The way templates are built, the <g onMouseDown> is the wrapper, and the visual scale/translate is usually on an inner <g> or it is static on this <g>?
                # Let's just insert transform={getTransform(id, rect)} right after the onMouseDown.
                # If there's an existing transform, we might conflict. 
                if 'transform=' not in line:
                    line = re.sub(
                        r"(onMouseDown=\{[^\}]+\})",
                        lambda m2: f"{m2.group(1)} transform={{getTransform({id_var}, {rect_var})}}",
                        line
                    )
                    changed = True
        new_lines.append(line)
        
    if changed:
        with open(filepath, 'w') as f:
            f.write('\n'.join(new_lines))
        print(f"Updated {filename}")

