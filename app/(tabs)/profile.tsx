import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResident } from "../../lib/resident-context";

export default function Profile() {
  const { resident } = useResident();

  const rows: [string, string][] = [
    ["National ID", resident.nationalId ?? "-"],
    ["Address", resident.address],
    ["Ward", resident.ward],
    ["Property No.", resident.propertyNumber ?? "-"],
  ];

  const actions = [
    { icon: "pencil-outline", label: "Update Profile", color: "#1769FF", to: null },
    { icon: "lock-closed-outline", label: "Change Password", color: "#7654D8", to: "/settings" },
    { icon: "notifications-outline", label: "Notifications", color: "#12A95C", to: "/notifications" },
    { icon: "settings-outline", label: "Settings", color: "#FF9B19", to: "/settings" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy px-5 pt-4 pb-12">
        <Text className="text-white text-2xl font-black">Profile</Text>
        <Text className="text-blue-200 text-xs mt-1 font-bold">Your account details</Text>
      </View>

      <ScrollView
        className="flex-1 -mt-8"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-edge rounded-3xl p-5 mb-5">
          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full bg-brand items-center justify-center mr-4">
              <Text className="text-white text-xl font-black">
                {resident.firstName[0]}
                {resident.lastName[0]}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-black text-ink">
                {resident.firstName} {resident.lastName}
              </Text>
              <Text className="text-[11px] text-muted mt-1">{resident.email}</Text>
              <Text className="text-[11px] text-muted mt-0.5">{resident.phone}</Text>
            </View>
          </View>
        </View>

        <Text className="text-sm font-black text-ink mb-2 ml-1">Personal Information</Text>
        <View className="bg-white border border-edge rounded-2xl overflow-hidden mb-5">
          {rows.map(([k, v], i) => (
            <View
              key={k}
              className={
                "flex-row items-center justify-between px-4 py-3.5 " +
                (i < rows.length - 1 ? "border-b border-edge" : "")
              }
            >
              <Text className="text-[11px] font-bold text-muted">{k}</Text>
              <Text className="text-[11px] font-black text-ink text-right flex-1 ml-4">{v}</Text>
            </View>
          ))}
        </View>

        {actions.map((a) => (
          <TouchableOpacity
            key={a.label}
            activeOpacity={0.8}
            onPress={() => a.to && router.push(a.to as any)}
            className="bg-white border border-edge rounded-2xl flex-row items-center px-4 py-3.5 mb-3"
          >
            <View
              className="w-8 h-8 rounded-lg items-center justify-center mr-3"
              style={{ backgroundColor: a.color + "1A" }}
            >
              <Ionicons name={a.icon as any} size={16} color={a.color} />
            </View>
            <Text className="flex-1 text-[13px] font-bold text-ink">{a.label}</Text>
            <Ionicons name="chevron-forward" size={16} color="#71809A" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}