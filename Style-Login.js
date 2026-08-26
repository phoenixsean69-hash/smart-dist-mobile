#!/usr/bin/env node
// style-login.js - RUN IN VS CODE TERMINAL
// Usage: node .\style-login.js
// Styles app/login.tsx with real SmartPay brand

const fs = require('fs');
const path = 'app/login.tsx';

const styledLogin = `import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { account } from '../lib/appwrite';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [email, setEmail] = useState('tapiwa@test.com');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Enter email and password');
      return;
    }
    try {
      setLoading(true);
      try {
        await account.createEmailPasswordSession(email, password);
      } catch (e: any) {
        if (typeof (account as any).createEmailSession === 'function') {
          await (account as any).createEmailSession(email, password);
        } else {
          throw e;
        }
      }
      const user = await account.get();
      console.log('[login] user:', user.$id);
      router.replace('/(tabs)/home' as any);
    } catch (err: any) {
      Alert.alert('Login failed', err?.message ?? 'Check credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#062B6F' }}>
      <StatusBar style="light" />
      
      {/* Top Brand Section */}
      <View style={{ height: 320, backgroundColor: '#062B6F', paddingHorizontal: 28, paddingTop: 70 }}>
        {/* Decorative circles */}
        <View style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: '#0A3A8A', opacity: 0.6 }} />
        <View style={{ position: 'absolute', top: 40, right: 40, width: 120, height: 120, borderRadius: 60, backgroundColor: '#1769FF', opacity: 0.3 }} />
        <View style={{ position: 'absolute', bottom: 40, left: -30, width: 180, height: 180, borderRadius: 90, backgroundColor: '#0A3A8A', opacity: 0.4 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#1769FF', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '900', fontSize: 18 }}>S</Text>
          </View>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 0.5 }}>SMARTPAY</Text>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginLeft: 6 }}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>RESIDENT</Text>
          </View>
        </View>

        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '900', lineHeight: 36, marginTop: 8 }}>
          Welcome{"\\n"}back home
        </Text>
        <Text style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginTop: 12, lineHeight: 20 }}>
          Sign in to manage your levies, water{ "\\n"}and community updates.
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 20, gap: 8 }}>
          <View style={{ height: 4, width: 24, borderRadius: 2, backgroundColor: '#1769FF' }} />
          <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
          <View style={{ height: 4, width: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)' }} />
        </View>
      </View>

      {/* Bottom White Sheet */}
      <View style={{ flex: 1, backgroundColor: '#F6F8FF', borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -28, overflow: 'hidden' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ padding: 28, paddingBottom: 40 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 6 }}>Sign in</Text>
            <Text style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>Use your Appwrite account linked to your stand</Text>

            {/* Email */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#334155', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>Email Address</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, height: 56, shadowColor: '#062B6F', shadowOpacity: 0.03, shadowRadius: 8 }}>
                <Text style={{ fontSize: 16, marginRight: 10 }}>✉️</Text>
                <TextInput
                  style={{ flex: 1, fontSize: 14, color: '#0F172A', fontWeight: '500' }}
                  placeholder="tapiwa@example.com"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* Password */}
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#334155', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>Password</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, paddingHorizontal: 16, height: 56 }}>
                <Text style={{ fontSize: 16, marginRight: 10 }}>🔒</Text>
                <TextInput
                  style={{ flex: 1, fontSize: 14, color: '#0F172A', fontWeight: '500' }}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPass}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ padding: 6 }}>
                  <Text style={{ fontSize: 12, fontWeight: '700', color: '#1769FF' }}>{showPass ? 'HIDE' : 'SHOW'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 10, marginBottom: 24 }}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: '#1769FF' }}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={{ backgroundColor: loading ? '#8AA8FF' : '#1769FF', borderRadius: 16, height: 56, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, shadowColor: '#1769FF', shadowOpacity: 0.3, shadowOffset: { width: 0, height: 8 }, shadowRadius: 16, elevation: 6 }}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15, letterSpacing: 0.3 }}>Continue to Home</Text>}
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, gap: 8 }}>
              <View style={{ height: 1, flex: 1, backgroundColor: '#E2E8F0' }} />
              <Text style={{ fontSize: 10, fontWeight: '600', color: '#94A3B8', letterSpacing: 1 }}>SECURE • ENCRYPTED • APPWRITE</Text>
              <View style={{ height: 1, flex: 1, backgroundColor: '#E2E8F0' }} />
            </View>

            <View style={{ backgroundColor: '#EEF4FF', borderRadius: 14, padding: 14, marginTop: 20, flexDirection: 'row', gap: 10, alignItems: 'flex-start', borderWidth: 1, borderColor: '#DBEAFE' }}>
              <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#DBEAFE' }}>
                <Text style={{ fontSize: 14 }}>💡</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#1E40AF', marginBottom: 2 }}>Testing on Expo Go?</Text>
                <Text style={{ fontSize: 11, color: '#3B82F6', lineHeight: 16 }}>Email must exist in both Appwrite Auth + residents collection. Seed user: tapiwa@test.com</Text>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
`;

fs.writeFileSync(path, styledLogin, 'utf8');
console.log(`✔ Styled ${path} with SmartPay brand colors #062B6F + #1769FF`);
console.log(`
Run:
  npx tsc --noEmit
  npx expo start
`);
