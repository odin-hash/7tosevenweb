import os
import re

print("Starting theme bg fix...")

dirs = ['src/pages', 'src/components']

replacements = [
    (r'(?<![:\-])bg-\[\#111111\]', r'bg-gray-200 dark:bg-[#111111]'),
    (r'(?<![:\-])bg-white/\[0\.02\]', r'bg-black/5 dark:bg-white/[0.02]'),
    (r'(?<![:\-])bg-white/\[0\.03\]', r'bg-black/5 dark:bg-white/[0.03]'),
    (r'(?<![:\-])bg-white/\[0\.04\]', r'bg-black/5 dark:bg-white/[0.04]'),
    (r'(?<![:\-])bg-white/\[0\.06\]', r'bg-black/10 dark:bg-white/[0.06]'),
    (r'(?<![:\-])border-white/\[0\.04\]', r'border-black/5 dark:border-white/[0.04]'),
    (r'(?<![:\-])border-white/\[0\.06\]', r'border-black/10 dark:border-white/[0.06]'),
    (r'(?<![:\-])hover:bg-white/\[0\.04\]', r'hover:bg-black/5 dark:hover:bg-white/[0.04]'),
    (r'(?<![:\-])hover:bg-white/\[0\.06\]', r'hover:bg-black/10 dark:hover:bg-white/[0.06]'),
    (r'(?<![:\-])hover:bg-white/\[0\.08\]', r'hover:bg-black/10 dark:hover:bg-white/[0.08]'),
    (r'(?<![:\-])focus:bg-white/\[0\.04\]', r'focus:bg-black/5 dark:focus:bg-white/[0.04]'),
    (r'(?<![:\-])disabled:bg-white/10\b', r'disabled:bg-black/10 dark:disabled:bg-white/10'),
    (r'(?<![:\-])disabled:text-white/20\b', r'disabled:text-black/20 dark:disabled:text-white/20'),
    (r'(?<![:\-])bg-white text-\[\#0A0A0A\]', r'bg-black text-white dark:bg-white dark:text-[#0A0A0A]'),
]

for d in dirs:
    for filename in os.listdir(d):
        if not filename.endswith('.jsx'):
            continue
            
        path = os.path.join(d, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original = content
            
        for pattern, new_str in replacements:
            content = re.sub(pattern, new_str, content)
            
        if content != original:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filename}")
        else:
            print(f"No changes in {filename}")

print("Done.")
