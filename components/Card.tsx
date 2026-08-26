import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

export function Card({
  children,
  style,
  className = "",
}: PropsWithChildren<{ style?: ViewStyle; className?: string }>) {
  return (
    <View
      className={"bg-white border border-edge rounded-2xl p-4 " + className}
      style={style}
    >
      {children}
    </View>
  );
}