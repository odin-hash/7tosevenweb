import os
import re

def brutalist_sweep(root_dir):
    rounded_pattern = re.compile(r'rounded-(sm|md|lg|xl|2xl|3xl)')
    shadow_pattern = re.compile(r'(?<!-)shadow(-sm|-md|-lg|-xl)?(?!\S)')
    
    # We want to add harsh shadows to standard buttons or interactive looking things 
    # but the easiest is just stripping soft shadows globally
    harsh_hover = "hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
    
    count = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.endswith(".jsx"):
                filepath = os.path.join(dirpath, filename)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content
                
                # 1. Strip all rounded radii directly to rounded-none
                content = rounded_pattern.sub('rounded-none', content)
                
                # Special handler for button.jsx since it's the core shadcn interaction
                if filename == 'button.jsx':
                    # Add harsh styling to all variants
                    content = content.replace('shadow hover:bg-primary/90', f'hover:bg-primary/90 border border-white {harsh_hover}')
                    content = content.replace('shadow-sm hover:bg-destructive/90', f'hover:bg-destructive/90 border border-red-500 {harsh_hover}')
                    content = content.replace('shadow-sm hover:bg-accent hover:text-accent-foreground', f'hover:bg-accent hover:text-accent-foreground {harsh_hover}')
                    content = content.replace('shadow-sm hover:bg-secondary/80', f'hover:bg-secondary/80 border border-white {harsh_hover}')
                    
                # 2. Convert standard soft shadows to none if not already modified
                if filename != 'button.jsx':
                    content = shadow_pattern.sub('shadow-none', content)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    count += 1
                    print(f"Brutalized: {filename}")

    print(f"Total files brutalized: {count}")

if __name__ == "__main__":
    frontend_src = r"c:\Users\govin\Downloads\7toSeven-main2\7toSeven-main\frontend\src"
    brutalist_sweep(frontend_src)
