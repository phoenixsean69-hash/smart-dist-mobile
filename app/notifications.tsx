import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../lib/i18n";

const ITEMS = [
  { icon: "checkmark-circle-outline", title: "Payment Successful", body: "Your payment of $28.00 for August water charges was successful.", date: "14 Aug 2026 - 09:15", color: "#12A95C", bg: "#DDF7E7" },
  { icon: "notifications-outline", title: "Bill Due Soon", body: "Your August water charges bill is due on 25 Aug 2026.", date: "20 Jul 2026 - 08:30", color: "#1769FF", bg: "#EEF4FF" },
  { icon: "document-text-outline", title: "New Bill Generated", body: "Your August property rates bill is ready.", date: "31 Jul 2026 - 10:00", color: "#FF9B19", bg: "#FFF4E0" },
  { icon: "information-circle-outline", title: "Account Update", body: "Your account status is current.", date: "31 Jul 2026 - 09:45", color: "#7654D8", bg: "#F0ECFF" },
];

export default function Notifications() {
  const { t } = useLanguage();
  const items = [
    { ...ITEMS[0], title: t('paymentSuccessful'), body: t('paymentSuccessBody') },
    { ...ITEMS[1], title: t('billDueSoon'), body: t('billDueBody') },
    { ...ITEMS[2], title: t('newBill'), body: t('newBillBody') },
    { ...ITEMS[3], title: t('accountUpdate'), body: t('accountCurrent') },
  ];
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy flex-row items-center px-4 h-16">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-lg font-extrabold">{t('notifications')}</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <View key={item.title} className="bg-white border border-edge rounded-2xl p-4 mb-3 flex-row">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: item.bg }}
            >
              <Ionicons name={item.icon as any} size={18} color={item.color} />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] font-black text-ink">{item.title}</Text>
              <Text className="text-[11px] text-muted mt-1 leading-4">{item.body}</Text>
              <Text className="text-[9px] text-muted mt-2">{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
