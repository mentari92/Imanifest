import { Tabs } from "expo-router";
import { View, TouchableOpacity, Platform } from "react-native";
import { LayoutGrid, Heart, Sparkles, CheckSquare, Brain } from "lucide-react-native";

const TABS = [
  { name: "index", icon: LayoutGrid, label: "Dashboard" },
  { name: "qalb", icon: Heart, label: "Qalb" },
  { name: "imanifest", icon: Sparkles, label: "Imanifest" },
  { name: "dua-todo", icon: CheckSquare, label: "Dua-to-Do" },
  { name: "tafakkur", icon: Brain, label: "Tafakkur" },
];

function GlassTabBar({ state, navigation }: any) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 32,
        left: 16,
        right: 16,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: "rgba(255,255,255,0.75)",
        borderRadius: 32,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 24,
        elevation: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
        ...(Platform.OS === "web"
          ? ({
              backdropFilter: "blur(24px) saturate(140%)",
              WebkitBackdropFilter: "blur(24px) saturate(140%)",
            } as any)
          : {}),
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const Icon = TABS[index]?.icon ?? LayoutGrid;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 10,
              borderRadius: 9999,
              backgroundColor: isFocused ? "rgba(22,101,52,0.1)" : "transparent",
            }}
          >
            <Icon
              size={22}
              color={isFocused ? "#166534" : "#64748b"}
              strokeWidth={isFocused ? 2.2 : 1.5}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <GlassTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ title: tab.label }}
        />
      ))}
    </Tabs>
  );
}
