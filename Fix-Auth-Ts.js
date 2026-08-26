#!/usr/bin/env node
// fix-auth-ts.js - RUN IN VS CODE TERMINAL
// Fixes TS2367 segments.length === 0
// Usage: node .\fix-auth-ts.js

const fs = require('fs');
const path = 'app/_layout.tsx';

let s = fs.readFileSync(path, 'utf8');

s = s.replace(/segments\.length === 0/g, "!segments[0]");
s = s.replace(/\(segments\[0\] === '\(tabs\)' \|\| !segments\[0\]\)/g, "(segments[0] === '(tabs)' || !segments[0])");

fs.writeFileSync(path, s, 'utf8');
console.log('✔ Fixed TS2367 - replaced segments.length === 0 with !segments[0]');
console.log(`
Run:
  npx tsc --noEmit
  npx expo start
`);
