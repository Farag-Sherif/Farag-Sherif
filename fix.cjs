const fs = require('fs');
const files = [
  'src/components/layout/Footer.tsx',
  'src/components/sections/About.tsx',
  'src/components/sections/Achievements.tsx',
  'src/components/sections/Contact.tsx',
  'src/components/sections/Experience.tsx',
  'src/components/sections/Skills.tsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/import\s*\{\s*memo\s*\}\s*from\s*['"]react['"];?\n?/g, '');
  content = content.replace(/import\s*\{\s*memo\s*,\s*([^}]+)\}\s*from\s*['"]react['"]/g, 'import { $1 } from "react"');
  content = content.replace(/import\s*\{\s*([^,]+),\s*memo\s*\}\s*from\s*['"]react['"]/g, 'import { $1 } from "react"');
  
  if (f.includes('Contact.tsx')) {
    content = content.replace(/import\s*\{[^}]*FaLinkedin[^}]*\}\s*from\s*['"]react-icons\/fa['"];?\n?/g, '');
    content = content.replace(/import\s*\{[^}]*FiExternalLink[^}]*\}\s*from\s*['"]react-icons\/fi['"];?\n?/g, '');
  }
  fs.writeFileSync(f, content);
});
console.log('Fixed imports');
