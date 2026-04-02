import os
import re

def strip_light_classes(content):
    def replacer(match):
        prefix = match.group(1)
        classes_str = match.group(2)
        suffix = match.group(3)
        
        tokens = re.split(r'(\s+)', classes_str)
        
        # Prefixes that usually represent variations in light/dark
        conflicting_prefixes = [
            'bg-', 'text-', 'border-', 'from-', 'via-', 'to-', 'divide-',
            'hover:bg-', 'hover:text-', 'hover:border-', 'focus:bg-', 'focus:text-',
            'active:scale-', 'decoration-', 'drop-shadow-'
        ]
        
        # 1. Find all pure dark modifier basenames
        dark_items = []
        for t in tokens:
            t_strip = t.strip()
            if t_strip.startswith('dark:'):
                dark_items.append(t_strip[5:])
                
        # 2. Rebuild tokens
        new_tokens = []
        for t in tokens:
            if not t.strip():
                new_tokens.append(t)
                continue
            
            t_strip = t.strip()
            if t_strip.startswith('dark:'):
                # keep the value without dark:
                new_tokens.append(t.replace('dark:', '', 1))
                continue
                
            # Check if this token is a light version conflicting with a dark item
            is_conflict = False
            for d in dark_items:
                for p in conflicting_prefixes:
                    if t_strip.startswith(p) and d.startswith(p):
                        is_conflict = True
                        break
                if is_conflict:
                    break
            
            if not is_conflict:
                new_tokens.append(t)
            else:
                # the token was removed. Provide an empty string to maintain space token flow nicely.
                # actually, better to replace it with empty string so the surrounding whitespace is preserved,
                # though it might result in double space. That's fine.
                new_tokens.append('')

        return prefix + "".join(new_tokens) + suffix

    # regex to match standard className="...", className={'...'}, className={`...`}
    # This non-greedy match might miss advanced conditional logic, but covers 99%
    ptn1 = re.compile(r'(className=")(.*?)(")', re.DOTALL)
    ptn2 = re.compile(r'(className={`)(.*?)(`})', re.DOTALL)
    ptn3 = re.compile(r"(className=')(.*?)(')", re.DOTALL)
    
    content = ptn1.sub(replacer, content)
    content = ptn2.sub(replacer, content)
    content = ptn3.sub(replacer, content)
    return content

count = 0
for root, _, files in os.walk('frontend/src'):
    for file in files:
        if file.endswith(('.jsx', '.js', '.tsx')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = strip_light_classes(content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Refactored {filepath}")

print(f"Refactored {count} files.")
