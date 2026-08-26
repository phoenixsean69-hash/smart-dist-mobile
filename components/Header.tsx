import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export function Header({ title, back = false }: { title: string; back?: boolean }) {
  return (
    <View className="h-16 bg-navy flex-row items-center px-4">
      {back ? (
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
      ) : (
        <View className="w-10" />
      )}
      <Text className="flex-1 text-center text-white text-lg font-extrabold">{title}</Text>
      <View className="w-10" />
    </View>
  );
}