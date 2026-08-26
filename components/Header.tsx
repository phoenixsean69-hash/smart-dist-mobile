import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';

export function Header({ title, back = false }: { title: string; back?: boolean }) {
  return (
    <View style={styles.header}>
      {back ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Ionicons name="chevron-back" size={25} color={colors.white} />
        </TouchableOpacity>
      ) : <View style={styles.spacer} />}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 64, backgroundColor: colors.navy, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  title: { color: colors.white, fontSize: 18, fontWeight: '800' },
  back: { width: 42, height: 42, justifyContent: 'center' },
  spacer: { width: 42 },
});
