import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
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
