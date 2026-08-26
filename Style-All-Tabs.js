#!/usr/bin/env node
// style-all-tabs.js - RUN IN VS CODE TERMINAL
// Usage: node .\style-all-tabs.js
// Crafts Bills, Payments & Profile with real brand

const fs = require('fs');

console.log('Styling Bills, Payments, Profile...');

// --- BILLS ---
const billsCode = `import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useResident } from '../../lib/resident-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';

type BillFilter = 'all' | 'unpaid' | 'paid';

export default function Bills() {
  const { resident, loading, refresh } = useResident() as any;
  const [filter, setFilter] = useState<BillFilter>('all');
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    try { await refresh?.(); } catch {}
    setRefreshing(false);
  };

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#1769FF" /></View>;
  }

  const mockBills = resident?.bills || [
    { id: '1', type: 'Water', amount: 45.50, dueDate: '2026-08-30', status: 'unpaid', month: 'August 2026' },
    { id: '2', type: 'Levies', amount: 120.00, dueDate: '2026-08-31', status: 'unpaid', month: 'August 2026' },
    { id: '3', type: 'Water', amount: 42.00, dueDate: '2026-07-31', status: 'paid', month: 'July 2026' },
    { id: '4', type: 'Levies', amount: 120.00, dueDate: '2026-07-31', status: 'paid', month: 'July 2026' },
  ];

  const filtered = mockBills.filter((b: any) => filter === 'all' ? true : b.status === filter);
  const totalUnpaid = mockBills.filter((b: any) => b.status === 'unpaid').reduce((s: number, b: any) => s + b.amount, 0);

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F8FF' }}>
      <View style={{ backgroundColor: '#fff', paddingTop: 60, paddingBottom: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' }}>
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
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1769FF" />}>
        {filtered.map((bill: any) => (
          <View key={bill.id} style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: bill.type === 'Water' ? '#EEF4FF' : '#F1F5F9', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 18 }}>{bill.type === 'Water' ? '💧' : '🏠'}</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: '800', fontSize: 14, color: '#0F172A' }}>{bill.type} • {bill.month}</Text>
                  <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Due {bill.dueDate}</Text>
                </View>
              </View>
              <View style={{ backgroundColor: bill.status === 'paid' ? '#F0FDF4' : '#FEF2F2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: bill.status === 'paid' ? '#16A34A' : '#DC2626' }}>{bill.status.toUpperCase()}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: '#0F172A' }}>\${bill.amount.toFixed(2)}</Text>
              {bill.status === 'unpaid' ? (
                <TouchableOpacity onPress={() => router.push('/(tabs)/payments' as any)} style={{ backgroundColor: '#1769FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 }}>
                  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>Pay</Text>
                </TouchableOpacity>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 12 }}>✅</Text>
                  <Text style={{ fontSize: 11, fontWeight: '600', color: '#16A34A' }}>Paid</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 32, alignItems: 'center', marginTop: 20, borderWidth: 1, borderColor: '#E2E8F0' }}>
            <Text style={{ fontSize: 32 }}>📭</Text>
            <Text style={{ fontWeight: '800', marginTop: 12, color: '#0F172A' }}>No {filter} bills</Text>
            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>You're all caught up</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
`;

// --- PAYMENTS ---
const paymentsCode = `import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useResident } from '../../lib/resident-context';
import { useState } from 'react';

export default function Payments() {
  const { resident, loading } = useResident() as any;
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('EcoCash');
  const [paying, setPaying] = useState(false);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#1769FF" /></View>;
  }

  const balance = resident?.balance ?? 165.50;
  const payments = resident?.payments || [
    { id: 'p1', amount: 120, date: '2026-07-28', method: 'EcoCash', status: 'success', ref: 'PAY-7821' },
    { id: 'p2', amount: 42, date: '2026-07-28', method: 'ZiG', status: 'success', ref: 'PAY-7820' },
    { id: 'p3', amount: 165.50, date: '2026-06-30', method: 'Card', status: 'success', ref: 'PAY-7654' },
  ];

  const handlePay = () => {
    if (!amount) { Alert.alert('Enter amount'); return; }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      Alert.alert('Payment initiated', \`\${method} payment of $\${amount} is processing\`);
      setAmount('');
    }, 1200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F8FF' }}>
      <View style={{ backgroundColor: '#062B6F', paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>Total Outstanding</Text>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 6 }}>\${Number(balance).toFixed(2)}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>Stand {resident?.standNumber || '----'} • {resident?.fullName || ''}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Make Payment Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>Make Payment</Text>
          <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>Secure payment powered by SmartPay</Text>

          <Text style={{ fontSize: 10, fontWeight: '700', color: '#334155', letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 20, marginBottom: 8 }}>Amount (USD)</Text>
          <View style={{ backgroundColor: '#F8FAFF', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 14, paddingHorizontal: 16, height: 52, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: '800', color: '#0F172A', marginRight: 8 }}>$</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder={balance.toFixed(2)} placeholderTextColor="#94A3B8" style={{ flex: 1, fontSize: 16, fontWeight: '700', color: '#0F172A' }} />
            <TouchableOpacity onPress={() => setAmount(balance.toFixed(2))} style={{ backgroundColor: '#EEF4FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: '#1769FF' }}>FULL</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 10, fontWeight: '700', color: '#334155', letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 16, marginBottom: 8 }}>Payment Method</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['EcoCash','ZiG','Card'].map(m => (
              <TouchableOpacity key={m} onPress={() => setMethod(m)} style={{ flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', backgroundColor: method === m ? '#062B6F' : '#fff', borderWidth: 1, borderColor: method === m ? '#062B6F' : '#E2E8F0' }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: method === m ? '#fff' : '#64748B' }}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={handlePay} disabled={paying} style={{ marginTop: 20, backgroundColor: paying ? '#8AA8FF' : '#1769FF', borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center' }}>
            {paying ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>Pay \${amount || balance.toFixed(2)} with {method}</Text>}
          </TouchableOpacity>
        </View>

        {/* History */}
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#0F172A', letterSpacing: 0.5 }}>PAYMENT HISTORY</Text>
            <Text style={{ fontSize: 11, color: '#64748B' }}>{payments.length} transactions</Text>
          </View>

          {payments.map((p: any) => (
            <View key={p.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 16 }}>✓</Text>
                </View>
                <View>
                  <Text style={{ fontWeight: '800', fontSize: 13, color: '#0F172A' }}>\${p.amount.toFixed(2)} • {p.method}</Text>
                  <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{p.date} • {p.ref}</Text>
                </View>
              </View>
              <View style={{ backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ fontSize: 10, fontWeight: '800', color: '#16A34A' }}>SUCCESS</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
`;

// --- PROFILE ---
const profileCode = `import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useResident } from '../../lib/resident-context';
import { useRouter } from 'expo-router';
import { account } from '../../lib/appwrite';

export default function Profile() {
  const { resident, loading } = useResident() as any;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      router.replace('/login' as any);
    } catch (e: any) {
      console.log('[logout]', e);
      router.replace('/login' as any);
    }
  };

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#1769FF" /></View>;
  }

  const firstName = resident?.fullName?.split(' ')[0] || 'Resident';
  const initials = (resident?.fullName || 'T M').split(' ').map((n: string) => n[0]).join('').slice(0,2).toUpperCase();

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F8FF' }}>
      <View style={{ backgroundColor: '#062B6F', paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20, alignItems: 'center', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <View style={{ width: 72, height: 72, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#062B6F' }}>{initials}</Text>
        </View>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '900' }}>{resident?.fullName || 'Tapiwa Moyo'}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>{resident?.email || 'tapiwa@test.com'}</Text>
        <View style={{ marginTop: 12, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 }}>
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>STAND {resident?.standNumber || '----'} • VERIFIED</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ fontSize: 11, fontWeight: '800', color: '#0F172A', letterSpacing: 0.5, marginBottom: 14 }}>PERSONAL INFORMATION</Text>
          {[
            { label: 'Full Name', value: resident?.fullName || 'Tapiwa Moyo' },
            { label: 'Email', value: resident?.email || 'tapiwa@test.com' },
            { label: 'Phone', value: resident?.phone || '+263 77 123 4567' },
            { label: 'Stand Number', value: resident?.standNumber || '1234' },
            { label: 'Account Created', value: resident?.$createdAt ? new Date(resident.$createdAt).toLocaleDateString() : '2026-01-15' },
          ].map((row, i, arr) => (
            <View key={row.label}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
                <Text style={{ fontSize: 12, color: '#64748B' }}>{row.label}</Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A', maxWidth: 180, textAlign: 'right' }}>{row.value}</Text>
              </View>
              {i < arr.length - 1 && <View style={{ height: 1, backgroundColor: '#F1F5F9' }} />}
            </View>
          ))}
        </View>

        <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ fontSize: 11, fontWeight: '800', color: '#0F172A', letterSpacing: 0.5, marginBottom: 12 }}>SUPPORT</Text>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
            <Text style={{ fontSize: 13, color: '#0F172A', fontWeight: '600' }}>💬  Contact Council</Text>
            <Text style={{ color: '#94A3B8' }}>›</Text>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: '#F1F5F9' }} />
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
            <Text style={{ fontSize: 13, color: '#0F172A', fontWeight: '600' }}>📄  Download Statement</Text>
            <Text style={{ color: '#94A3B8' }}>›</Text>
          </TouchableOpacity>
          <View style={{ height: 1, backgroundColor: '#F1F5F9' }} />
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
            <Text style={{ fontSize: 13, color: '#0F172A', fontWeight: '600' }}>🔒  Privacy & Security</Text>
            <Text style={{ color: '#94A3B8' }}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: '#fee2e2', borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 24, borderWidth: 1, borderColor: '#fecaca' }}>
          <Text style={{ color: '#dc2626', fontWeight: '800', fontSize: 14 }}>Sign Out</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: '#94A3B8', fontWeight: '600', letterSpacing: 1 }}>SMARTPAY RESIDENT • v1.0.0</Text>
          <Text style={{ fontSize: 10, color: '#CBD5E1', marginTop: 4 }}>Secure • Encrypted • Appwrite</Text>
        </View>
      </ScrollView>
    </View>
  );
}
`;

fs.writeFileSync('app/(tabs)/bills.tsx', billsCode, 'utf8');
fs.writeFileSync('app/(tabs)/payments.tsx', paymentsCode, 'utf8');
fs.writeFileSync('app/(tabs)/profile.tsx', profileCode, 'utf8');

console.log('✔ Wrote 3 files: bills.tsx, payments.tsx, profile.tsx');
console.log(`
Run:
  npx tsc --noEmit
  npx expo start

All tabs now:
- Bills: filter chips + bill cards with Pay button
- Payments: navy header + make payment + history
- Profile: avatar + info + support + sign out
`);
