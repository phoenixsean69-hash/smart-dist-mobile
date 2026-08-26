import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusPill } from "../../components/StatusPill";
import { useResident } from "../../lib/resident-context";

const money = (n: number) => "$" + (n ?? 0).toFixed(2);
const fmt = (s: string) =>
  new Date(s).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function BillDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { bills, payments } = useResident();
  const bill = bills.find((x) => x.$id === id) ?? bills[0];
  const payment = payments.find((x) => x.billId === bill?.$id);

  if (!bill) return null;

  const detail: [string, string][] = [
    ["Amount", money(bill.amount)],
    ["Amount Paid", money(bill.amountPaid)],
    ["Balance Due", money(bill.balanceDue)],
    ["Billing Date", fmt(bill.billingDate)],
    ["Due Date", fmt(bill.dueDate)],
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy flex-row items-center px-4 h-16">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-lg font-extrabold">Bill Details</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-edge rounded-2xl p-4 mb-4">
          <View className="flex-row items-center">
            <View className="w-11 h-11 rounded-full bg-brand items-center justify-center mr-3">
              <Ionicons name="cash-outline" size={20} color="#ffffff" />
            </View>
            <View className="flex-1 pr-2">
              <Text className="text-[13px] font-black text-ink">{bill.description}</Text>
              <Text className="text-[10px] text-muted mt-0.5">{bill.billNumber}</Text>
            </View>
            <StatusPill value={bill.status} />
          </View>

          <View className="h-px bg-edge my-4" />

          {detail.map(([l, v], i) => (
            <View
              key={l}
              className={"flex-row justify-between py-2.5 " + (i < detail.length - 1 ? "border-b border-edge" : "")}
            >
              <Text className="text-[11px] text-muted font-bold">{l}</Text>
              <Text className="text-[11px] font-black text-ink">{v}</Text>
            </View>
          ))}
        </View>

        {payment ? (
          <View className="bg-successSoft border border-edge rounded-2xl p-4 mb-4">
            <View className="flex-row items-center mb-3">
              <Ionicons name="checkmark-circle" size={16} color="#12A95C" />
              <Text className="text-[12px] font-black text-success ml-2">Payment Record</Text>
            </View>
            {[
              ["Reference", payment.paymentReference],
              ["Method", payment.paymentMethod],
              ["Date", fmt(payment.paymentDate)],
              ["Amount", money(payment.amount)],
            ].map(([l, v]) => (
              <View key={l} className="flex-row justify-between py-1.5">
                <Text className="text-[11px] text-muted font-bold">{l}</Text>
                <Text className="text-[11px] font-black text-ink">{v}</Text>
              </View>
            ))}
          </View>
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-row items-center justify-center border border-brand rounded-2xl py-3 mb-3"
        >
          <Ionicons name="download-outline" size={16} color="#1769FF" />
          <Text className="text-[13px] font-black text-brand ml-2">Download Bill</Text>
        </TouchableOpacity>

        {bill.balanceDue > 0 ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: "/payments/make", params: { billId: bill.$id } })}
            className="bg-brand rounded-2xl py-4 items-center"
          >
            <Text className="text-white font-black text-[14px]">Pay {money(bill.balanceDue)}</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}