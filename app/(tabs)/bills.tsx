import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResident } from "../../lib/resident-context";

const money = (n: number) => "$" + (n ?? 0).toFixed(2);
const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function Bills() {
  const { bills } = useResident();
  const [tab, setTab] = useState<"all" | "unpaid" | "paid">("all");

  const filtered = useMemo(() => {
    if (tab === "paid") return bills.filter((b) => b.status === "paid");
    if (tab === "unpaid") return bills.filter((b) => b.balanceDue > 0);
    return bills;
  }, [tab, bills]);

  const total = bills.reduce((s, b) => s + b.amount, 0);
  const paid = bills.reduce((s, b) => s + b.amountPaid, 0);
  const due = bills.reduce((s, b) => s + b.balanceDue, 0);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy px-5 pt-4 pb-10">
        <Text className="text-white text-2xl font-black">My Bills</Text>
        <Text className="text-blue-200 text-xs mt-1 font-bold">
          Track your council charges
        </Text>
      </View>

      <View className="mx-4 -mt-7 bg-white border border-edge rounded-2xl flex-row">
        {[
          ["Total", money(total), "text-ink"],
          ["Paid", money(paid), "text-success"],
          ["Due", money(due), "text-danger"],
        ].map(([l, v, c], i) => (
          <View key={l} className={"flex-1 px-3 py-4 " + (i > 0 ? "border-l border-edge" : "")}>
            <Text className="text-[9px] text-muted font-bold uppercase tracking-wide">{l}</Text>
            <Text className={"text-base font-black mt-1 " + c}>{v}</Text>
          </View>
        ))}
      </View>

      <View className="flex-row mx-4 mt-4 bg-white border border-edge rounded-xl overflow-hidden">
        {(["all", "unpaid", "paid"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            className={"flex-1 py-2.5 items-center " + (tab === t ? "bg-brand" : "bg-white")}
          >
            <Text
              className={
                "text-[11px] font-black capitalize " +
                (tab === t ? "text-white" : "text-muted")
              }
            >
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        className="flex-1 mt-4"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View className="items-center py-16">
            <Ionicons name="document-outline" size={38} color="#71809A" />
            <Text className="text-sm font-black text-ink mt-3">No bills here</Text>
            <Text className="text-xs text-muted mt-1">Nothing in this category.</Text>
          </View>
        ) : (
          filtered.map((bill) => {
            const isPaid = bill.status === "paid";
            return (
              <View key={bill.$id} className="bg-white border border-edge rounded-2xl p-4 mb-3">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-full bg-brand items-center justify-center mr-3">
                    <Ionicons name="cash-outline" size={18} color="#ffffff" />
                  </View>
                  <View className="flex-1 pr-2">
                    <Text className="text-[13px] font-black text-ink">{bill.description}</Text>
                    <Text className="text-[10px] text-muted mt-0.5">{bill.billNumber}</Text>
                  </View>
                  <View className={"px-3 py-1 rounded-full " + (isPaid ? "bg-successSoft" : "bg-dangerSoft")}>
                    <Text className={"text-[10px] font-black " + (isPaid ? "text-success" : "text-danger")}>
                      {isPaid ? "Paid" : "Unpaid"}
                    </Text>
                  </View>
                </View>

                <View className="flex-row mt-3 pt-3 border-t border-edge">
                  {[
                    ["Amount", money(bill.amount)],
                    ["Paid", money(bill.amountPaid)],
                    ["Due", money(bill.balanceDue)],
                  ].map(([l, v], i) => (
                    <View key={l} className={"flex-1 " + (i > 0 ? "border-l border-edge pl-3" : "")}>
                      <Text className="text-[9px] text-muted font-bold uppercase">{l}</Text>
                      <Text className="text-[13px] font-black text-ink mt-0.5">{v}</Text>
                    </View>
                  ))}
                </View>

                <View className="flex-row justify-between mt-3 pt-3 border-t border-edge">
                  <View>
                    <Text className="text-[9px] text-muted font-bold uppercase">Billing date</Text>
                    <Text className="text-[11px] font-bold text-ink mt-0.5">{fmt(bill.billingDate)}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-[9px] text-muted font-bold uppercase">Due date</Text>
                    <Text className="text-[11px] font-bold text-ink mt-0.5">{fmt(bill.dueDate)}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push({ pathname: "/bills/[id]", params: { id: bill.$id } })}
                  className="mt-3 border border-brand rounded-xl py-2.5 items-center"
                >
                  <Text className="text-[11px] font-black text-brand">View bill details</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}