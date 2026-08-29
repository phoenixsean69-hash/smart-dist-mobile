import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useResident } from '../../lib/resident-context';
import { useState } from 'react';
import { useLanguage } from '../../lib/i18n';

export default function Payments() {
  const { resident, loading } = useResident() as any;
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('EcoCash');
  const [paying, setPaying] = useState(false);
  const { t } = useLanguage();

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
    if (!amount) { Alert.alert(t('enterAmount')); return; }
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      Alert.alert(t('paymentInitiated'), t('processing', { method, amount: `$${amount}` }));
      setAmount('');
    }, 1200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F8FF' }}>
      <View style={{ backgroundColor: '#062B6F', paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' }}>{t('totalOutstanding')}</Text>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900', marginTop: 6 }}>${Number(balance).toFixed(2)}</Text>
        <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>Stand {resident?.standNumber || '----'} • {resident?.fullName || ''}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Make Payment Card */}
        <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ fontSize: 13, fontWeight: '800', color: '#0F172A' }}>{t('makePayment')}</Text>
          <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t('securePayment')}</Text>

          <Text style={{ fontSize: 10, fontWeight: '700', color: '#334155', letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 20, marginBottom: 8 }}>{t('amountUsd')}</Text>
          <View style={{ backgroundColor: '#F8FAFF', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 14, paddingHorizontal: 16, height: 52, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: '800', color: '#0F172A', marginRight: 8 }}>$</Text>
            <TextInput value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder={balance.toFixed(2)} placeholderTextColor="#94A3B8" style={{ flex: 1, fontSize: 16, fontWeight: '700', color: '#0F172A' }} />
            <TouchableOpacity onPress={() => setAmount(balance.toFixed(2))} style={{ backgroundColor: '#EEF4FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
              <Text style={{ fontSize: 10, fontWeight: '800', color: '#1769FF' }}>FULL</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 10, fontWeight: '700', color: '#334155', letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 16, marginBottom: 8 }}>{t('paymentMethod')}</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['EcoCash','ZiG','Card'].map(m => (
              <TouchableOpacity key={m} onPress={() => setMethod(m)} style={{ flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', backgroundColor: method === m ? '#062B6F' : '#fff', borderWidth: 1, borderColor: method === m ? '#062B6F' : '#E2E8F0' }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: method === m ? '#fff' : '#64748B' }}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={handlePay} disabled={paying} style={{ marginTop: 20, backgroundColor: paying ? '#8AA8FF' : '#1769FF', borderRadius: 14, height: 52, alignItems: 'center', justifyContent: 'center' }}>
            {paying ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>Pay ${amount || balance.toFixed(2)} with {method}</Text>}
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
                  <Text style={{ fontWeight: '800', fontSize: 13, color: '#0F172A' }}>${p.amount.toFixed(2)} • {p.method}</Text>
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
