import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useResident } from "../../lib/resident-context";
import { useLanguage } from "../../lib/i18n";

const money = (n: number) => "$" + (n ?? 0).toFixed(2);

const METHODS = [
  { id: "EcoCash", label: "EcoCash", sub: "Mobile Money", icon: "phone-portrait-outline" },
  { id: "Cash", label: "Cash", sub: "Pay at council office", icon: "cash-outline" },
  { id: "Bank Transfer", label: "Bank Transfer", sub: "Direct to council account", icon: "business-outline" },
];

export default function MakePayment() {
  const { billId } = useLocalSearchParams<{ billId?: string }>();
  const { bills } = useResident();
  const { t } = useLanguage();
  const bill = useMemo(
    () => bills.find((b) => b.$id === billId) ?? bills.find((b) => b.balanceDue > 0) ?? bills[0],
    [billId, bills]
  );
  const [method, setMethod] = useState("EcoCash");
  const [note, setNote] = useState("");

  if (!bill) return null;
  const payable = bill.balanceDue > 0 ? bill.balanceDue : bill.amount;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <View className="bg-navy flex-row items-center px-4 h-16">
        <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-lg font-extrabold">{t('makePayment')}</Text>
        <View className="w-10" />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[10px] font-black text-muted uppercase tracking-wider mb-2">Bill</Text>
        <View className="bg-white border border-edge rounded-2xl p-4 mb-5">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-brand items-center justify-center mr-3">
              <Ionicons name="cash-outline" size={18} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] font-black text-ink">{bill.description}</Text>
              <Text className="text-[10px] text-muted mt-0.5">{bill.billNumber}</Text>
            </View>
          </View>
          {[
            ["Amount", money(bill.amount)],
            ["Paid", money(bill.amountPaid)],
            ["Payable", money(payable)],
          ].map(([l, v]) => (
            <View key={l} className="flex-row justify-between py-2 border-t border-edge">
              <Text className="text-[11px] text-muted font-bold">{l}</Text>
              <Text className="text-[11px] font-black text-ink">{v}</Text>
            </View>
          ))}
        </View>

        <Text className="text-[10px] font-black text-muted uppercase tracking-wider mb-2">
          Payment Method
        </Text>
        <View className="bg-white border border-edge rounded-2xl overflow-hidden mb-5">
          {METHODS.map((m, i) => {
            const on = method === m.id;
            return (
              <TouchableOpacity
                key={m.id}
                activeOpacity={0.8}
                onPress={() => setMethod(m.id)}
                className={"flex-row items-center px-4 py-3.5 " + (i > 0 ? "border-t border-edge" : "")}
              >
                <View
                  className={
                    "w-9 h-9 rounded-xl items-center justify-center mr-3 " +
                    (on ? "bg-brand" : "bg-surface")
                  }
                >
                  <Ionicons name={m.icon as any} size={17} color={on ? "#ffffff" : "#71809A"} />
                </View>
                <View className="flex-1">
                  <Text className={"text-[13px] font-black " + (on ? "text-brand" : "text-ink")}>
                    {m.label}
                  </Text>
                  <Text className="text-[10px] text-muted mt-0.5">{m.sub}</Text>
                </View>
                {on ? <Ionicons name="checkmark-circle" size={20} color="#1769FF" /> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-[10px] font-black text-muted uppercase tracking-wider mb-2">
          Notes (optional)
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder={t('addNote')}
          placeholderTextColor="#9AA7BC"
          multiline
          className="bg-white border border-edge rounded-2xl px-4 py-3 text-[13px] text-ink mb-5"
          style={{ minHeight: 76, textAlignVertical: "top" }}
        />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            Alert.alert("Payment", "Payment request created for demonstration. Connect your gateway here.")
          }
          className="bg-brand rounded-2xl py-4 items-center"
        >
          <Text className="text-white font-black text-[15px]">Pay {money(payable)}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
