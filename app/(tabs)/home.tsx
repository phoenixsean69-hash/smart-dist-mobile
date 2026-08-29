import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useResident } from '../../lib/resident-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLanguage } from '../../lib/i18n';

export default function Home() {
  const { resident, loading, refresh } = useResident() as any;
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const onRefresh = async () => {
    setRefreshing(true);
    try { await refresh?.(); } catch {}
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#1769FF" />
        <Text style={{ marginTop: 12, color: '#64748B', fontSize: 12, fontWeight: '600' }}>{t('loadingHome')}</Text>
      </View>
    );
  }

  const firstName = resident?.fullName?.split(' ')[0] || resident?.firstName || 'Resident';
  const stand = resident?.standNumber || resident?.stand || '----';
  const balance = resident?.balance ?? resident?.totalDue ?? 0;
  const waterDue = resident?.waterDue ?? 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F8FF' }}>
      {/* Header - Navy */}
      <View style={{ backgroundColor: '#062B6F', paddingTop: 60, paddingBottom: 28, paddingHorizontal: 24, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
        <View style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: '#0A3A8A', opacity: 0.5 }} />
        <View style={{ position: 'absolute', top: 20, right: 20, width: 80, height: 80, borderRadius: 40, backgroundColor: '#1769FF', opacity: 0.25 }} />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>{t('welcomeBack')}</Text>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 4 }}>{firstName} 👋</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: 'rgba(255,255,255,0.12)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '700' }}>STAND • {stand}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/profile' as any)} style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: '900', color: '#062B6F' }}>{firstName[0]}</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card - floating */}
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, marginTop: 20, shadowColor: '#062B6F', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#94A3B8', letterSpacing: 1, textTransform: 'uppercase' }}>Total Due</Text>
              <Text style={{ fontSize: 28, fontWeight: '900', color: '#0F172A', marginTop: 4 }}>${Number(balance).toFixed(2)}</Text>
              <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{balance > 0 ? 'Payment due soon' : 'All clear — no outstanding balance'}</Text>
            </View>
            <View style={{ backgroundColor: balance > 0 ? '#FEF2F2' : '#F0FDF4', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: balance > 0 ? '#DC2626' : '#16A34A' }}>{balance > 0 ? 'UNPAID' : 'PAID'}</Text>
            </View>
          </View>
          
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            <View style={{ flex: 1, backgroundColor: '#F8FAFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEF2FF' }}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#64748B' }}>WATER</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 2 }}>${Number(waterDue).toFixed(2)}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#F8FAFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#EEF2FF' }}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: '#64748B' }}>LEVIES</Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: '#0F172A', marginTop: 2 }}>${(Number(balance) - Number(waterDue)).toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 100 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1769FF" />}>
        
        {/* Quick Actions */}
                {/* Quick Actions - 4 */}
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
        </View>

        {/* Status */}
        <View style={{ backgroundColor: '#fff', borderRadius: 18, padding: 16, marginTop: 20, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontWeight: '800', fontSize: 13, color: '#0F172A' }}>Account Status</Text>
            <View style={{ backgroundColor: '#F0FDF4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: '#16A34A' }}>VERIFIED</Text>
            </View>
          </View>
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, color: '#64748B' }}>Resident</Text>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{resident?.fullName || 'Tapiwa Moyo'}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#F1F5F9' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, color: '#64748B' }}>Stand Number</Text>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#0F172A' }}>{stand}</Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#F1F5F9' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 12, color: '#64748B' }}>Email</Text>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>{resident?.email || 'tapiwa@test.com'}</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
