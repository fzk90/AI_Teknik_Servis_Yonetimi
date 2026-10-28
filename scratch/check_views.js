const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="admin-view"') || l.includes('id="tech-view"') || l.includes('id="customer-view"') || l.includes('id="reports-view"')) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
