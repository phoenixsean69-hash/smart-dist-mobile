import { Text, View } from "react-native";

export function StatusPill({ value }: { value: string }) {
  const v = (value ?? "").toLowerCase();
  const good = v === "paid" || v === "current" || v === "completed";
  return (
    <View className={"px-3 py-1 rounded-full " + (good ? "bg-successSoft" : "bg-warnSoft")}>
      <Text className={"text-[10px] font-black capitalize " + (good ? "text-success" : "text-warn")}>
        {value}
      </Text>
    </View>
  );
}