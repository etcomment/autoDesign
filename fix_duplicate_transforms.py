import os
import re

dir_path = "src/templates/components"

for filename in os.listdir(dir_path):
    if not filename.endswith(".tsx"): continue
    
    filepath = os.path.join(dir_path, filename)
    with open(filepath, 'r') as f:
        content = f.read()
        
    if content.count('transform=') == 0:
        continue
        
    # We are looking for `<g ... transform={...} ... transform={getTransform(...)} ... >`
    # or `<g ... transform="..." ... transform={getTransform(...)} ... >`
    
    # We can use a regex to find `<g` up to `>` that contains two `transform=` attributes.
    
    def replacer(match):
        g_tag = match.group(0)
        # Find all transform attributes
        transforms = re.findall(r'transform=(?:\{([^}]+)\}|"([^"]+)")', g_tag)
        if len(transforms) < 2:
            return g_tag
            
        # We have at least two transforms.
        # Remove all transform=... from the g_tag
        cleaned_g_tag = re.sub(r'\s*transform=(?:\{[^}]+\}|"[^"]+")', '', g_tag)
        
        # Combine the transform expressions
        # Some are `\translate(...)` (from string literal)
        # Some are getTransform(id, rect)
        
        parts = []
        for t_expr, t_str in transforms:
            if t_expr:
                # it's a JS expression
                if t_expr.startswith('`') and t_expr.endswith('`'):
                    parts.append(t_expr)
                else:
                    parts.append(t_expr)
            elif t_str:
                # it's a string literal
                parts.append(f"`{t_str}`")
                
        # create a single JS expression
        # transform={[expr1, expr2].filter(Boolean).join(" ")}
        combined = " ".join(parts) # Not quite, they are JS expressions, we want to array them.
        array_str = ", ".join(parts)
        new_transform = f' transform={{[{array_str}].filter(Boolean).join(" ")}}'
        
        # Insert it before the closing `>` or `/>`
        if cleaned_g_tag.endswith('/>'):
            return cleaned_g_tag[:-2] + new_transform + ' />'
        else:
            return cleaned_g_tag[:-1] + new_transform + '>'

    # It's better to just find `<g[^>]+>`
    new_content = re.sub(r'<g\s+[^>]+>', replacer, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filename}")

