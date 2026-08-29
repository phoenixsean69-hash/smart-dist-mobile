import { useEffect, useState, useRef } from 'react';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Animated, Easing } from 'react-native';
import { account } from '../lib/appwrite';
import { ResidentProvider } from '../lib/resident-context';
import { LanguageProvider } from '../lib/i18n';

function AuthLoadingScreen() {
  const pulse = useRef(new Animated.Value(0.8)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.8, duration: 700, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotate, { toValue: 1, duration: 2000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
      <StatusBar style="dark" />
      <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', width: 88, height: 88 }}>
        <Animated.View style={{
          position: 'absolute',
          width: 88,
          height: 88,
          borderRadius: 44,
          borderWidth: 2,
          borderColor: '#EEF2FF',
          borderTopColor: '#1769FF',
          transform: [{ rotate: rotateInterpolate }]
        }} />
        <Animated.View style={{ 
          width: 64, 
          height: 64, 
          borderRadius: 20, 
          backgroundColor: '#062B6F', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: [{ scale: pulse }],
        }}>
          <Text style={{ color: '#fff', fontWeight: '900', fontSize: 28 }}>S</Text>
        </Animated.View>
      </View>
      <View style={{ marginTop: 28, alignItems: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: '800', color: '#0F172A', letterSpacing: 0.5 }}>SMARTPAY</Text>
        <Text style={{ fontSize: 11, fontWeight: '600', color: '#94A3B8', letterSpacing: 1.2, marginTop: 4 }}>CHECKING ACCOUNT</Text>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const rootNav = useRootNavigationState();
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 1. Check auth once
  useEffect(() => {
    const check = async () => {
      try {
        await account.get();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsAuthLoading(false);
      }
    };
    check();
  }, []);

  // 2. Redirect after nav is ready + auth known
  useEffect(() => {
    if (isAuthLoading) return;
    if (!rootNav?.key) return;

    const isLoginPage = segments[0] === 'login';
    const isInTabs = segments[0] === '(tabs)' || !segments[0]; // empty on cold start = tabs

    if (isAuthenticated === false && isInTabs) {
      router.replace('/login' as any);
    }
    if (isAuthenticated === true && isLoginPage) {
      router.replace('/(tabs)/home' as any);
    }
  }, [isAuthLoading, isAuthenticated, rootNav?.key, segments]);

  // BLOCK everything until we know auth + nav ready
  if (isAuthLoading || !rootNav?.key || isAuthenticated === null) {
    return <AuthLoadingScreen />;
  }

  // Extra block: if not authed but still on tabs (during redirect), keep showing loader
  if (isAuthenticated === false && (segments[0] === '(tabs)' || !segments[0])) {
    return <AuthLoadingScreen />;
  }
  if (isAuthenticated === true && segments[0] === 'login') {
    return <AuthLoadingScreen />;
  }

  return (
    <LanguageProvider>
      <ResidentProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </ResidentProvider>
    </LanguageProvider>
  );
}
