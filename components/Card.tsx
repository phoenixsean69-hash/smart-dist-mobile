import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius } from '../constants/theme';

export function Card({ children, style }: PropsWithChildren<{ style?: any }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 14, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 1 },
});
