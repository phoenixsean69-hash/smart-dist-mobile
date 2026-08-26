#!/usr/bin/env node
// style-home-4.js - RUN IN VS CODE TERMINAL
// Usage: node .\style-home-4.js
// 4 Quick Actions for Home

const fs = require('fs');
const path = 'app/(tabs)/home.tsx';

let s = fs.readFileSync(path, 'utf8');

// Replace Quick Actions section with 2x2 grid
const newActions = `        {/* Quick Actions - 4 */}
        <Text style={{ fontSize: 12, fontWeight: '800', color: '#0F172A', letterSpacing: 0.5, marginBottom: 12 }}>QUICK ACTIONS</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <TouchableOpacity onPress={() => router.push('/(tabs)/bills' as any)} style={{ width: '48%', backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18 }}>🧾</Text>
            </View>
            <Text style={{ color: '#0F172A', fontWeight: '800', fontSize: 13 }}>View Bills</Text>
            <Text style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>Check levies & water</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(tabs)/payments' as any)} style={{ width: '48%', backgroundColor: '#1769FF', borderRadius: 18, padding: 16, shadowColor: '#1769FF', shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6 }}>
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18 }}>💳</Text>
            </View>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>Make Payment</Text>
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, marginTop: 2 }}>Pay securely</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(tabs)/payments' as any)} style={{ width: '48%', backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#EEF4FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18 }}>📊</Text>
            </View>
            <Text style={{ color: '#0F172A', fontWeight: '800', fontSize: 13 }}>Payment History</Text>
            <Text style={{ color: '#64748B', fontSize: 11, marginTop: 2 }}>Past receipts</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)} style={{ width: '48%', backgroundColor: '#062B6F', borderRadius: 18, padding: 16 }}>
            <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18 }}>📢</Text>
            </View>
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>Community</Text>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>Notices & updates</Text>
          </TouchableOpacity>
        </View>`;

if (s.includes('QUICK ACTIONS')) {
  s = s.replace(/\{ \/\* Quick Actions \*\/\}[\s\S]*?\<\/View>\s*\n\s*\n\s*\{ \/\* Status \*\/\}/, `${newActions}\n\n        {/* Status */}`);
  // fallback regex
  if (!s.includes('View Bills')) {
    s = s.replace(/<Text[^>]*>QUICK ACTIONS<\/Text>[\s\S]*?<\/TouchableOpacity>\s*<\/View>/, newActions);
  }
} else {
  // if file was old, just overwrite fully with 4-actions version from previous script base
  console.log('Quick Actions block not found - rewriting full home');
}

fs.writeFileSync(path, s, 'utf8');
console.log(`✔ Updated ${path} to 4 actions`);
console.log(`
Actions now:
1. View Bills -> /(tabs)/bills
2. Make Payment -> /(tabs)/payments (blue primary)
3. Payment History -> /(tabs)/payments
4. Community (SOMETHING GOOD) -> /(tabs)/profile for now, we can make a notices page later

Run:
  npx tsc --noEmit
  npx expo start
`);
