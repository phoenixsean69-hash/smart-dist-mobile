import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TABS = [
  { name: "home", title: "Home", icon: "home-outline", active: "home" },
  { name: "bills", title: "Bills", icon: "receipt-outline", active: "receipt" },
  { name: "payments", title: "Payments", icon: "card-outline", active: "card" },
  { name: "profile", title: "Profile", icon: "person-outline", active: "person" },
] as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1769FF",
        tabBarInactiveTintColor: "#71809A",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5EAF1",
          borderTopWidth: 1,
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
      }}
    >
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={(focused ? t.active : t.icon) as any}
                size={size}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}