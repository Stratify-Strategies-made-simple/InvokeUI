const fs = require('fs');

const appPath = 'src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

// Add import
if (!content.includes('import Header from "./components/layout/Header";')) {
  content = content.replace(
    'import AgentConfiguration from "./pages/AgentConfiguration";',
    'import AgentConfiguration from "./pages/AgentConfiguration";\nimport Header from "./components/layout/Header";'
  );
}

// Remove Header definition
const headerStart = content.indexOf('const Header = ({');
if (headerStart !== -1) {
  const headerEndStr = '  );\n};\n';
  const headerEnd = content.indexOf(headerEndStr, headerStart) + headerEndStr.length;
  content = content.substring(0, headerStart) + '// Header extracted to src/components/layout/Header.jsx\n' + content.substring(headerEnd);
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('App.jsx updated.');
