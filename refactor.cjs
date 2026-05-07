const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, 'src'),
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components'),
  path.join(__dirname, 'src/components/layout'),
];

function processFile(filePath) {
  if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace indigo with primary
  content = content.replace(/indigo-/g, 'primary-');
  
  // Replace standard background colors with semantic theme
  content = content.replace(/bg-gray-50/g, 'bg-background');
  content = content.replace(/text-gray-900/g, 'text-text-main');
  content = content.replace(/text-gray-500/g, 'text-text-muted');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log('Theme replacement complete.');
