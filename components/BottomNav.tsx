import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';

const items = [
  { label: 'Home', icon: 'home-outline', active: 'home', path: '/(tabs)/home' },
  { label: 'Bills', icon: 'receipt-outline', active: 'bills', path: '/(tabs)/bills' },
  { label: 'Payments', icon: 'card-outline', active: 'payments', path: '/(tabs)/payments' },
  { label: 'Profile', icon: 'person-outline', active: 'profile', path: '/(tabs)/profile' },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return <View style={styles.bar}>{items.map((item) => {
    const active = pathname.includes(`/${item.active}`);
    return <TouchableOpacity key={item.label} style={styles.item} onPress={() => router.replace(item.path)}>
      <Ionicons name={item.icon as any} size={22} color={active ? colors.blue : colors.text} />
      <Text style={[styles.label, active && styles.active]}>{item.label}</Text>
    </TouchableOpacity>;
  })}</View>;
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#eee', justifyContent: 'space-around' },
  item: { flex: 1, alignItems: 'center' },
  label: { fontSize: 11, color: '#888' },
  active: { color: '#062B6F', fontWeight: '700' },
});
