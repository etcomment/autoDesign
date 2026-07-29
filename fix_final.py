import os
import re

files_to_fix_transform = [
    "src/templates/components/Business11Template.tsx",
    "src/templates/components/Puzzle2Template.tsx",
    "src/templates/components/Puzzle5Template.tsx",
    "src/templates/components/Puzzle6Template.tsx",
    "src/templates/components/Puzzle7Template.tsx",
    "src/templates/components/PuzzleTemplate.tsx",
    "src/templates/components/Roadmap12Template.tsx"
]

for f in files_to_fix_transform:
    with open(f, 'r') as file:
        content = file.read()
    
    # We will search for all <g ...> tags and manually clean them up
    # We know the two transforms are:
    # 1. transform={`translate(...) scale(...) ...`}
    # 2. transform={getTransform(...)}
    
    # Let's find any element that has both
    def replacer(match):
        g_tag = match.group(0)
        # Find all transform=...
        transforms = re.findall(r'transform=(\{`[^`]+`\}|\{[^}]+\}|"[^"]+")', g_tag)
        if len(transforms) < 2:
            return g_tag
            
        # Clean it
        clean_g = re.sub(r'\s*transform=(\{`[^`]+`\}|\{[^}]+\}|"[^"]+")', '', g_tag)
        
        parts = []
        for t in transforms:
            if t.startswith('`') or (t.startswith('{`') and t.endswith('`}')):
                # It's `{`translate(...)`}` -> extract the backtick string
                val = t[1:-1] # strip { }
                parts.append(val)
            elif t.startswith('{') and t.endswith('}'):
                val = t[1:-1]
                parts.append(val)
            else:
                parts.append(f"`{t[1:-1]}`")
                
        # Combine
        combined = f" transform={{[{', '.join(parts)}].filter(Boolean).join(' ')}}"
        if clean_g.endswith('/>'):
            return clean_g[:-2] + combined + ' />'
        return clean_g[:-1] + combined + '>'
        
    new_content = re.sub(r'<g[^>]+>', replacer, content)
    with open(f, 'w') as file:
        file.write(new_content)

files_to_fix_imports = [
    "src/templates/components/Budget3Template.tsx",
    "src/templates/components/Budget5Template.tsx"
]

for f in files_to_fix_imports:
    with open(f, 'r') as file:
        content = file.read()
    content = content.replace("startDrag, renderHandles", "startDrag, renderHandles, getTransform")
    content = content.replace("startDrag, getTransform, getTransform", "startDrag, getTransform")
    with open(f, 'w') as file:
        file.write(content)

