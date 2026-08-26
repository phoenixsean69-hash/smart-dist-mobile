import { StyleSheet, Text } from 'react-native';
import { colors } from '../constants/theme';

export function StatusPill({ value }: { value: string }) {
  const paid = value.toLowerCase() === 'paid' || value.toLowerCase() === 'current' || value.toLowerCase() === 'completed';
  return <Text style={[styles.pill, paid ? styles.good : styles.other]}>{value}</Text>;
}
const styles = StyleSheet.create({
  pill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, fontSize: 12, fontWeight: '800', overflow: 'hidden' },
  good: { color: colors.green, backgroundColor: colors.greenSoft },
  other: { color: colors.orange, backgroundColor: '#FFF1D8' },
});
