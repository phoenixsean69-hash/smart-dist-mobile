import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
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
      <View style={{ backgroundColor: '#062B6F', paddingTop: 60, paddingBottom: 20, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <View style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: '#0A3A8A', opacity: 0.5 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 22, fontWeight: '900', color: '#fff' }}>My Bills</Text>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Stand {resident?.standNumber || '----'} • {filtered.length} bills</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }}>
            <Text style={{ fontSize: 10, fontWeight: '800', color: '#fff' }}>${totalUnpaid.toFixed(2)} DUE</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 18 }}>
          {(['all','unpaid','paid'] as BillFilter[]).map(f => (
            <TouchableOpacity key={f} onPress={() => setFilter(f)} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 12, backgroundColor: filter === f ? '#fff' : 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: filter === f ? '#fff' : 'rgba(255,255,255,0.18)' }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: filter === f ? '#062B6F' : 'rgba(255,255,255,0.8)', textTransform: 'capitalize' }}>{f}</Text>
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
              <Text style={{ fontSize: 20, fontWeight: '900', color: '#0F172A' }}>${bill.amount.toFixed(2)}</Text>
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
