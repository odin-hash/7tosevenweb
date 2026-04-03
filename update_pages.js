const fs = require('fs');

const files = [
  'c:/Users/govin/Downloads/7toSeven-main2/7toSeven-main/frontend/src/pages/TermsPage.jsx',
  'c:/Users/govin/Downloads/7toSeven-main2/7toSeven-main/frontend/src/pages/ShippingPolicyPage.jsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');

  // Fix main wrapper classes to just have the space-y-12
  content = content.replace(
    /<div className="max-w-\[800px\] mx-auto px-6 md:px-16 space-y-12.*?">/,
    '<div className="max-w-[800px] mx-auto px-6 md:px-16 space-y-12">'
  );

  // Replace each section block using a robust regex.
  // We match <div className="space-y-4 pt-8   border-white/10"> 
  // Then the <h2>...</h2>
  // Then all contents until the next </div> that matches the outer div.
  // Safe way: the contents inside the div don't have other </div> normally, but if they do (like an inner div), regex is risky.
  // However, in these files, the sections consist of <p> and <ul> elements, no nested <div> inside them!
  // So we can safely match everything up to the FIRST </div>!
  const blockRegex = /<div className="space-y-4 pt-8\s+border-white\/10">\s*<h2 className="[^"]+">\s*([^<]+)\s*<\/h2>([\s\S]*?)<\/div>/g;
  
  content = content.replace(blockRegex, (match, title, innerNodes) => {
    return `<div className="pt-8 border-white/10 transition-all duration-300">
            <h2 className="font-['Impact'] md:text-3xl uppercase tracking-widest text-white mb-6">
              ${title.trim()}
            </h2>
            <div className="space-y-4 md:text-sm font-sans font-bold uppercase tracking-[0.2em] text-white/50 leading-relaxed">
${innerNodes}            </div>
          </div>`;
  });

  fs.writeFileSync(f, content, 'utf8');
});
console.log('Done mapping formatting.');
