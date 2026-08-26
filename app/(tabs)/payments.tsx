import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResident } from "../../lib/resident-context";

const money = (n: number) => "$" + (n ?? 0).toFixed(2);
const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

const ICONS: Record<string, string> = {
  EcoCash: "phone-portrait-outline",
  Cash: "cash-outline",
  "Bank Transfer": "business-outline",
};

export default function Payments() {
  const { payments } = useResident();
  const totalPaid = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy px-5 pt-4 pb-10">
        <Text className="text-white text-2xl font-black">Payment History</Text>
        <Text className="text-blue-200 text-xs mt-1 font-bold">
          {payments.length} transaction{payments.length === 1 ? "" : "s"} recorded
        </Text>
      </View>

      <View className="mx-4 -mt-7 bg-white border border-edge rounded-2xl flex-row">
        <View className="flex-1 px-4 py-4">
          <Text className="text-[9px] text-muted font-bold uppercase tracking-wide">Total paid</Text>
          <Text className="text-lg font-black text-success mt-1">{money(totalPaid)}</Text>
        </View>
        <View className="flex-1 px-4 py-4 border-l border-edge">
          <Text className="text-[9px] text-muted font-bold uppercase tracking-wide">Transactions</Text>
          <Text className="text-lg font-black text-ink mt-1">{payments.length}</Text>
        </View>
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {payments.length === 0 ? (
          <View className="items-center py-16">
            <Ionicons name="card-outline" size={38} color="#71809A" />
            <Text className="text-sm font-black text-ink mt-3">No payments yet</Text>
            <Text className="text-xs text-muted mt-1">Your transactions will appear here.</Text>
          </View>
        ) : (
          payments.map((p) => (
            <View key={p.$id} className="bg-white border border-edge rounded-2xl p-4 mb-3">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-xl bg-successSoft items-center justify-center mr-3">
                  <Ionicons
                    name={(ICONS[p.paymentMethod] ?? "card-outline") as any}
                    size={18}
                    color="#12A95C"
                  />
                </View>
                <View className="flex-1 pr-2">
                  <Text className="text-[13px] font-black text-ink">{p.paymentReference}</Text>
                  {p.notes ? (
                    <Text className="text-[10px] text-muted mt-0.5">{p.notes}</Text>
                  ) : null}
                </View>
                <View className="items-end">
                  <Text className="text-[15px] font-black text-success">{money(p.amount)}</Text>
                  <Text className="text-[9px] text-muted mt-0.5">{fmt(p.paymentDate)}</Text>
                </View>
              </View>

              <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-edge">
                <View className="flex-row items-center">
                  <Ionicons name="layers-outline" size={12} color="#71809A" />
                  <Text className="text-[10px] text-muted font-bold ml-1.5">{p.paymentMethod}</Text>
                </View>
                <View className="px-2.5 py-1 bg-successSoft rounded-full">
                  <Text className="text-[9px] font-black text-success capitalize">{p.status}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}