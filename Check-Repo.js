#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
console.log('📂 ROOT:', ROOT);

function check(p) {
  const full = path.join(ROOT, p);
  const exists = fs.existsSync(full);
  console.log((exists ? '✅' : '❌') + ' ' + p + (exists ? ` (${fs.statSync(full).size} bytes)` : ''));
  if (exists && p.endsWith('.tsx')) {
    const c = fs.readFileSync(full,'utf8');
    if (p.includes('profile')) {
      console.log('   -> has LanguageSelector:', c.includes('LanguageSelector'));
      console.log('   -> has useTranslation:', c.includes('useTranslation'));
    }
    if (p.includes('_layout')) {
      console.log('   -> has initI18n:', c.includes('initI18n'));
    }
  }
  return exists;
}

console.log('\n--- i18n files ---');
check('lib/i18n/config.ts');
check('lib/i18n/locales/en.json');
check('lib/i18n/locales/sn.json');
check('lib/i18n/locales/nd.json');
check('components/LanguageSelector.tsx');

console.log('\n--- app structure ---');
check('app/_layout.tsx');
check('app/(tabs)/profile.tsx');
check('app/(tabs)/_layout.tsx');
check('lib/appwrite.ts');

console.log('\n--- package.json deps ---');
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT,'package.json'),'utf8'));
  console.log('i18next:', pkg.dependencies?.i18next || '❌ missing');
  console.log('react-i18next:', pkg.dependencies?.['react-i18next'] || '❌ missing');
  console.log('expo-localization:', pkg.dependencies?.['expo-localization'] || '❌ missing');
} catch(e){ console.log('no package.json'); }

console.log('\n--- lib/appwrite.ts platform check ---');
try {
  const aw = fs.readFileSync(path.join(ROOT,'lib/appwrite.ts'),'utf8');
  console.log('has .setPlatform:', aw.includes('.setPlatform'));
  if (aw.includes('.setPlatform')) console.log('⚠️ REMOVE this line, it causes not authorized');
} catch{}

console.log('\nDone. Paste this output here.');
