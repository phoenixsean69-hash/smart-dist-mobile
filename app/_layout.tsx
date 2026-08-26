import { Stack } from 'expo-router';
import { ResidentProvider } from '../lib/resident-context';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return <ResidentProvider><Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} /></ResidentProvider>;
}
