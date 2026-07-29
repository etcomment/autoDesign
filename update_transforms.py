import os
import glob
import re

components_dir = "src/templates/components/"
files = glob.glob(os.path.join(components_dir, "*.tsx"))

def replace_transform(match):
    full_match = match.group(0)
    
    # We look for something like:
    # translate(${...}) scale(${...}) translate(${-defaultRect.x}, ${-defaultRect.y})
    # and we want to append rotate(...)
    
    # Actually, we can match the whole string and append it before the closing backtick
    
    # The regex matches transform={`...`}
    # We can try to extract the variables like defaultRect and elementId
    
    return full_match

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Find translate(${-XXX.x}
    # Then we know the bounding box is XXX
    
    # It's better to just write a Node script that uses TypeScript compiler API if we want to be safe, but a regex is faster.
    
    def replacer(m):
        prefix = m.group(1) # transform={`translate...translate(${-
        bbox_var = m.group(2) # defaultRect
        suffix = m.group(3) # .x}, ${-defaultRect.y})
        # We need to find the element ID. How? We can't easily.
        return m.group(0)
        
    pass

