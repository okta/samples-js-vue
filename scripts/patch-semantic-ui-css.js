// OKTA-523251: remove patch script once the fix is available in fomantic-ui-css
const path = require('path');
const fs = require('fs');

try {
const semanticUIStylesheetPaths =
  ['okta-hosted-login', 'custom-login'].map(sampleName => 
    path.resolve(process.cwd(), sampleName, 'node_modules', 'fomantic-ui-css', 'semantic.min.css'));

semanticUIStylesheetPaths.forEach(path => {
  const content = fs.readFileSync(path, 'utf-8');
  fs.writeFileSync(path, content.replace(';;', ';'));
});

} catch(err) {
  console.error('Unable to patch semantic-ui-css:', err.message);
}
