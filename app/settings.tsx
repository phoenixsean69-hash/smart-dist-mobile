import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../lib/i18n";

const ROWS = [
  { icon: "notifications-outline", label: "Notification Settings", color: "#1769FF", to: "/notifications", value: "" },
  { icon: "lock-closed-outline", label: "Change Password", color: "#7654D8", to: "", value: "" },
  { icon: "globe-outline", label: "Language", color: "#FF9B19", to: "", value: "English" },
  { icon: "help-circle-outline", label: "Help & Support", color: "#12A95C", to: "", value: "" },
  { icon: "information-circle-outline", label: "About SmartPay", color: "#71809A", to: "", value: "v1.0.0" },
];

export default function Settings() {
  const { t } = useLanguage();
  const rows = [
    { ...ROWS[0], label: t('notificationSettings') }, { ...ROWS[1], label: t('changePassword') },
    { ...ROWS[2], label: t('language') }, { ...ROWS[3], label: t('helpSupport') }, { ...ROWS[4], label: t('aboutSmartPay') },
  ];
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy flex-row items-center px-4 h-16">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-lg font-extrabold">{t('settings')}</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-edge rounded-2xl overflow-hidden mb-4">
          {rows.map((row, i) => (
            <TouchableOpacity
              key={row.label}
              activeOpacity={0.8}
              onPress={() =>
                row.to
                  ? router.push(row.to as any)
                  : Alert.alert(row.label, "Ready for backend wiring.")
              }
              className={"flex-row items-center px-4 py-3.5 " + (i > 0 ? "border-t border-edge" : "")}
            >
              <View
                className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                style={{ backgroundColor: row.color + "1A" }}
              >
                <Ionicons name={row.icon as any} size={16} color={row.color} />
              </View>
              <Text className="flex-1 text-[13px] font-bold text-ink">{row.label}</Text>
              {row.value ? <Text className="text-[11px] text-muted mr-2">{row.value}</Text> : null}
              <Ionicons name="chevron-forward" size={15} color="#71809A" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Alert.alert("Logout", 'Connect to account.deleteSession("current").')}
          className="bg-white border border-edge rounded-2xl flex-row items-center px-4 py-3.5"
        >
          <View className="w-8 h-8 rounded-lg items-center justify-center mr-3 bg-dangerSoft">
            <Ionicons name="log-out-outline" size={16} color="#E5484D" />
          </View>
          <Text className="text-[13px] font-black text-danger">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
