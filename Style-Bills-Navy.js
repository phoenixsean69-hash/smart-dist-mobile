#!/usr/bin/env node
// style-bills-navy.js - RUN IN VS CODE TERMINAL
// Usage: node .\style-bills-navy.js
// Makes Bills header navy like others

const fs = require('fs');
const path = 'app/(tabs)/bills.tsx';

let s = fs.readFileSync(path, 'utf8');

s = s.replace(
`      <View style={{ backgroundColor: '#fff', paddingTop: 60, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '900', color: '#0F172A' }}>My Bills</Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Stand {resident?.standNumber || '----'} • {filtered.length} bills</Text>
          </View>
          <View style={{ backgroundColor: totalUnpaid > 0 ? '#FEF2F2' : '#F0FDF4', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color: totalUnpaid > 0 ? '#DC2626' : '#16A34A' }}>\${totalUnpaid.toFixed(2)} DUE</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
          {(['all','unpaid','paid'] as BillFilter[]).map(f => (
            <TouchableOpacity key={f} onPress={() => setFilter(f)} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, backgroundColor: filter === f ? '#062B6F' : '#fff', borderWidth: 1, borderColor: filter === f ? '#062B6F' : '#E2E8F0' }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: filter === f ? '#fff' : '#64748B', textTransform: 'capitalize' }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>`,
`      <View style={{ backgroundColor: '#062B6F', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <View style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: '#0A3A8A', opacity: 0.5 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '900', color: '#fff' }}>My Bills</Text>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Stand {resident?.standNumber || '----'} • {filtered.length} bills</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color: '#fff' }}>\${totalUnpaid.toFixed(2)} DUE</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 18 }}>
          {(['all','unpaid','paid'] as BillFilter[]).map(f => (
            <TouchableOpacity key={f} onPress={() => setFilter(f)} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 12, backgroundColor: filter === f ? '#fff' : 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: filter === f ? '#fff' : 'rgba(255,255,255,0.18)' }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: filter === f ? '#062B6F' : 'rgba(255,255,255,0.8)', textTransform: 'capitalize' }}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>`
);

fs.writeFileSync(path, s, 'utf8');
console.log(`✔ Made ${path} navy header`);
