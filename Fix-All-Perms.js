#!/usr/bin/env node
const { Client, Databases, Permission, Role } = require('node-appwrite');
const fs = require('fs');
let projectId = '', endpoint = 'https://cloud.appwrite.io/v1', apiKey = '';

// try read from lib/appwrite.ts
try {
  const txt = fs.readFileSync('lib/appwrite.ts','utf8');
  projectId = (txt.match(/projectId\s*[:=]\s*['"]([^'"]+)['"]/i) || [])[1] || (txt.match(/setProject\(['"]([^'"]+)['"]\)/i)||[])[1] || '';
} catch {}

if (!projectId) projectId = 'smart-pay'; // from your log

console.log('Using projectId:', projectId);
console.log('Paste API Key (standard_...):');
process.stdin.once('data', async (d) => {
  apiKey = d.toString().trim();
  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const db = new Databases(client);
  const dbId = 'smartpay-db';
  const cols = ['residents','resident_accounts','bills','payments','revenue_sources'];
  for (const colId of cols) {
    try {
      const col = await db.getCollection(dbId, colId);
      console.log(`\n→ ${colId}: docSec=${col.documentSecurity} perms=${JSON.stringify(col.$permissions)}`);
      const updated = await db.updateCollection(
        dbId, colId, col.name,
        [Permission.read(Role.any()), Permission.create(Role.any()), Permission.update(Role.any()), Permission.delete(Role.any())],
        false, true
      );
      console.log(`✅ ${colId} fixed:`, updated.$permissions);
    } catch (e) {
      console.error(`❌ ${colId}:`, e.message);
    }
  }
  console.log('\nDone. Run: npx expo start --clear');
  process.exit(0);
});
