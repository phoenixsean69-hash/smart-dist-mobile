import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusPill } from "../../components/StatusPill";
import { useResident } from "../../lib/resident-context";

const money = (n: number) => "$" + (n ?? 0).toFixed(2);

const ACTIONS = [
  { icon: "receipt-outline", label: "View Bills", caption: "See all bills", color: "#1769FF", bg: "#EEF4FF", to: "/(tabs)/bills" },
  { icon: "cash-outline", label: "Make Payment", caption: "Pay securely", color: "#12A95C", bg: "#DDF7E7", to: "/payments/make" },
  { icon: "time-outline", label: "History", caption: "View payments", color: "#7654D8", bg: "#F0ECFF", to: "/(tabs)/payments" },
  { icon: "person-outline", label: "Profile", caption: "Update details", color: "#FF9B19", bg: "#FFF4E0", to: "/(tabs)/profile" },
];

export default function Home() {
  const { resident, account: acct, payments } = useResident();
  const recent = payments?.[0];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy px-5 pt-4 pb-12">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-white text-2xl font-black">
              Hello, {resident.firstName}
            </Text>
            <Text className="text-blue-200 text-xs mt-1 font-bold">
              {resident.ward} · {resident.propertyNumber}
            </Text>
          </View>
          <View className="w-12 h-12 rounded-full bg-brand items-center justify-center">
            <Text className="text-white font-black text-base">
              {resident.firstName[0]}
              {resident.lastName[0]}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 -mt-8"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-edge rounded-3xl p-5 mb-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-[10px] font-black text-muted uppercase tracking-widest">
              Current Balance
            </Text>
            <StatusPill value={acct.status} />
          </View>

          <Text className="text-4xl font-black text-ink">{money(acct.balance)}</Text>
          <Text className="text-[11px] text-muted mt-1 mb-4">
            Account {acct.accountNumber}
          </Text>

          <View className="h-px bg-edge mb-4" />

          <View className="flex-row">
            {[
              ["Outstanding", money(acct.balance)],
              ["Arrears", money(acct.arrears)],
              ["Credit", money(acct.credit)],
            ].map(([label, val], i) => (
              <View key={label} className={"flex-1 " + (i > 0 ? "border-l border-edge pl-3" : "")}>
                <Text className="text-[9px] text-muted font-bold uppercase">{label}</Text>
                <Text className="text-sm font-black text-ink mt-1">{val}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text className="text-base font-black text-ink mb-3">Quick Actions</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {ACTIONS.map((a) => (
            <TouchableOpacity
              key={a.label}
              activeOpacity={0.8}
              onPress={() => router.push(a.to as any)}
              style={{ width: "48%" }}
              className="bg-white border border-edge rounded-2xl p-3 mb-3 flex-row items-center"
            >
              <View
                className="w-9 h-9 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: a.bg }}
              >
                <Ionicons name={a.icon as any} size={18} color={a.color} />
              </View>
              <View className="flex-1">
                <Text className="text-[11px] font-black text-ink">{a.label}</Text>
                <Text className="text-[9px] text-muted mt-0.5">{a.caption}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-base font-black text-ink">Recent Payments</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/payments")}>
            <Text className="text-[11px] font-black text-brand">See all</Text>
          </TouchableOpacity>
        </View>

        {recent ? (
          <View className="bg-white border border-edge rounded-2xl p-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-successSoft items-center justify-center mr-3">
                <Ionicons name="checkmark-circle-outline" size={18} color="#12A95C" />
              </View>
              <View className="flex-1">
                <Text className="text-[13px] font-black text-ink">{recent.paymentReference}</Text>
                <Text className="text-[10px] text-muted mt-0.5">{recent.notes}</Text>
              </View>
              <View className="items-end">
                <Text className="text-[10px] text-muted">{recent.paymentMethod}</Text>
                <Text className="text-sm font-black text-success mt-0.5">
                  {money(recent.amount)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-white border border-edge rounded-2xl p-6 items-center">
            <Text className="text-xs text-muted">No payments yet.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}