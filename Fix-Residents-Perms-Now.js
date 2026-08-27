#!/usr/bin/env node
// fix-residents-perms-now.js - TERMINAL ONLY FIX
// Usage: node .\fix-residents-perms-now.js

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(r => rl.question(q, a => r(a.trim())));

(async () => {
  let endpoint = 'https://cloud.appwrite.io/v1';
  let projectId = '';
  let apiKey = '';
  const databaseId = 'smartpay-db';
  const collectionId = 'residents';

  // try to get projectId from lib/appwrite.ts
  try {
    const txt = fs.readFileSync('lib/appwrite.ts', 'utf8');
    projectId = (txt.match(/projectId\s*[:=]\s*['"]([^'"]+)['"]/i) || txt.match(/setProject\(['"]([^'"]+)['"]\)/i) || [])[1] || '';
    const ep = (txt.match(/endpoint\s*[:=]\s*['"]([^'"]+)['"]/i) || [])[1];
    if (ep) endpoint = ep;
    if (projectId) console.log(`Found projectId in lib/appwrite.ts: ${projectId}`);
  } catch {}

  // try .env
  try {
    if (fs.existsSync('.env')) {
      const env = fs.readFileSync('.env', 'utf8');
      projectId = projectId || (env.match(/APPWRITE_PROJECT_ID\s*=\s*["']?([^"'\n]+)["']?/i)?.[1] || '').trim();
      apiKey = (env.match(/APPWRITE_API_KEY\s*=\s*["']?([^"'\n]+)["']?/i)?.[1] || '').trim();
    }
  } catch {}

  if (!projectId) {
    console.log('\n1) Get your Project ID:');
    console.log('   Run: appwrite projects list');
    projectId = await ask('Paste Project ID: ');
  }

  if (!apiKey) {
    console.log('\n2) Create API Key (30 sec, terminal only):');
    console.log(`   appwrite projects create-key --project-id ${projectId} --name fix-perms --scopes "databases.read,databases.write,collections.read,collections.write,documents.read,documents.write"`);
    console.log('   Copy the key it prints (starts with standard_...)');
    apiKey = await ask('Paste API Key: ');
  }

  let sdk;
  try { sdk = require('node-appwrite'); }
  catch {
    console.log('Installing node-appwrite...');
    require('child_process').execSync('npm install node-appwrite --save-dev', { stdio: 'inherit' });
    sdk = require('node-appwrite');
  }

  const { Client, Databases, Permission, Role } = sdk;
  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const db = new Databases(client);

  console.log(`\nUpdating ${databaseId}/${collectionId} @ ${endpoint}...`);
  try {
    const col = await db.getCollection(databaseId, collectionId);
    console.log(`Current: name=${col.name} docSecurity=${col.documentSecurity} perms=${JSON.stringify(col.$permissions)}`);

    const updated = await db.updateCollection(
      databaseId,
      collectionId,
      col.name,
      [
        Permission.read(Role.any()),
        Permission.create(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
      ],
      false, // documentSecurity OFF
      true
    );
    console.log('\n✅ FIXED');
    console.log('New perms:', updated.$permissions);
    console.log('documentSecurity:', updated.documentSecurity);
    console.log('\nNow run: npx expo start');
  } catch (e) {
    console.error('\n❌ Error:', e.message);
    if (e.response) console.log(JSON.stringify(e.response, null, 2));
  }
  rl.close();
})();
