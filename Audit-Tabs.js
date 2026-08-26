#!/usr/bin/env node
// audit-tabs.js - RUN IN VS CODE TERMINAL
// Usage: node .\audit-tabs.js
// Checks what tabs you have and if they're broken

const fs = require('fs');
const path = require('path');

const tabsDir = 'app/(tabs)';
if (!fs.existsSync(tabsDir)) {
  console.log(`Folder ${tabsDir} not found`);
  process.exit(1);
}

console.log(`=== Auditing ${tabsDir} ===\n`);

const files = fs.readdirSync(tabsDir);
files.forEach(f => {
  const full = path.join(tabsDir, f);
  const stat = fs.statSync(full);
  if (stat.isFile()) {
    const content = fs.readFileSync(full, 'utf8');
    console.log(`FILE: ${f} (${content.length} chars)`);
    console.log(`  - has export default: ${content.includes('export default')}`);
    console.log(`  - uses useResident: ${content.includes('useResident')}`);
    console.log(`  - lines: ${content.split('\n').length}`);
    if (content.length < 50) {
      console.log(`  CONTENT: ${content}`);
    }
    console.log('');
  }
});

const layoutPath = path.join(tabsDir, '_layout.tsx');
if (fs.existsSync(layoutPath)) {
  console.log(`=== ${layoutPath} ===`);
  console.log(fs.readFileSync(layoutPath, 'utf8').slice(0, 2000));
} else {
  console.log('No _layout.tsx in (tabs) - THAT IS THE PROBLEM');
}
