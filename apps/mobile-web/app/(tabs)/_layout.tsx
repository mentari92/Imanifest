import { Tabs } from "expo-router";
import { LayoutDashboard, Sparkles, CheckSquare, Mic, Headphones } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D4AF37", // Gold
        tabBarInactiveTintColor: "#94A3B8", // Slate 400
        tabBarStyle: {
          backgroundColor: "rgba(2, 44, 34, 0.9)",
          borderTopColor: "rgba(212, 175, 55, 0.2)",
          height: 64,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: "Lora-Regular",
          fontSize: 10,
        },
        headerStyle: {
          backgroundColor: "#022C22",
        },
        headerTintColor: "#F8FAFC",
        headerTitleStyle: {
          fontFamily: "PlayfairDisplay-Bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="heartpulse"
        options={{
          title: "HeartPulse",
          tabBarIcon: ({ color, size }) => <Mic size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="niyyah-board"
        options={{
          title: "Niyyah Board",
          tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="dua-todo"
        options={{
          title: "Dua-to-Do",
          tabBarIcon: ({ color, size }) => <CheckSquare size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sakinah"
        options={{
          title: "Sakinah Hub",
          tabBarIcon: ({ color, size }) => <Headphones size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
