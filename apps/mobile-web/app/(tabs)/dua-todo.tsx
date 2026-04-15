import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Platform } from "react-native";
import { useRouter } from "expo-router";

const glass = (radius = 24) => ({
  backgroundColor: "rgba(255,255,255,0.65)",
  borderRadius: radius,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  ...(Platform.OS === "web" ? ({ backdropFilter: "blur(24px) saturate(130%)", WebkitBackdropFilter: "blur(24px) saturate(130%)" } as any) : {}),
});

const TASKS = [
  { label: "Purify Intention with morning Dhikr", done: true, time: "Completed at 06:15 AM" },
  { label: "Visualize Divine Support after Dhuhr", done: true, time: "Completed at 12:45 PM" },
  { label: "Journalize 3 Gratitude Anchors", done: true, time: "Completed at 04:30 PM" },
  { label: "Practice Deep Presence during Isha", done: false, active: true, desc: "Connect with the Infinite Source through focused breath and conscious movement." },
  { label: "Release Outcome before Sleep", done: false, locked: true, time: "Unlocks after Task 4" },
];

export default function DuaTodoScreen() {
  const [tasks, setTasks] = useState(TASKS);
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
      {/* Decorative blobs */}
      <View pointerEvents="none" style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: -1 } as any}>
        <View style={{ position: "absolute", top: "25%", left: -80, width: 256, height: 256, backgroundColor: "rgba(229,223,248,0.2)", borderRadius: 9999, ...(Platform.OS === "web" ? ({ filter: "blur(100px)" } as any) : {}) } as any} />
        <View style={{ position: "absolute", bottom: "25%", right: -80, width: 320, height: 320, backgroundColor: "rgba(255,228,242,0.2)", borderRadius: 9999, ...(Platform.OS === "web" ? ({ filter: "blur(120px)" } as any) : {}) } as any} />
      </View>

      {/* Header */}
      <View style={{ paddingHorizontal: 24, paddingVertical: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(255,255,255,0.6)", ...(Platform.OS === "web" ? ({ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(24px)" } as any) : {}) }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#e5dff8", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" }}>
          <Text style={{ fontSize: 18 }}>🌟</Text>
        </View>
        <Text style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", fontWeight: "600", color: "#1e1b2e" }}>Dua-to-Do</Text>
        <TouchableOpacity style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 24, paddingTop: 28 }}>
        {/* Title */}
        <Text style={{ fontFamily: "Newsreader", fontSize: 38, fontStyle: "italic", fontWeight: "600", color: "#2f3338", lineHeight: 46, maxWidth: 320, marginBottom: 24 }}>5 Steps to Manifest your Intention</Text>

        {/* Progress Card */}
        <View style={[glass(32), { padding: 28, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 36, overflow: "hidden" }]}>
          <View>
            <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, textTransform: "uppercase", letterSpacing: 3, color: "#5b5f65", fontWeight: "700", marginBottom: 6 }}>Journey Status</Text>
            <Text style={{ fontFamily: "Newsreader", fontSize: 26, fontStyle: "italic", color: "#5b5f65" }}>3/5 Steps Completed</Text>
          </View>
          {/* Circle Progress */}
          <View style={{ width: 88, height: 88, alignItems: "center", justifyContent: "center" }}>
            <View style={{ position: "absolute", width: 88, height: 88, borderRadius: 44, borderWidth: 6, borderColor: "#eceef3" }} />
            <View style={{ position: "absolute", width: 88, height: 88, borderRadius: 44, borderWidth: 6, borderColor: "#206c3a", borderStyle: "dashed", opacity: 0.6 }} />
            <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 15, fontWeight: "700", color: "#206c3a" }}>60%</Text>
          </View>
        </View>

        {/* Task List */}
        <View style={{ gap: 0, marginBottom: 40 }}>
          {tasks.map((task, i) => {
            if (task.done) {
              return (
                <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: 20, marginBottom: 20 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#206c3a", alignItems: "center", justifyContent: "center", marginTop: 4, flexShrink: 0, shadowColor: "#206c3a", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}>
                    <Text style={{ color: "#e8ffe8", fontSize: 18 }}>✓</Text>
                  </View>
                  <View style={{ flex: 1, paddingBottom: 12 }}>
                    <Text style={{ fontFamily: "Noto Serif", fontSize: 18, color: "rgba(47,51,56,0.4)", textDecorationLine: "line-through" }}>{task.label}</Text>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#777b81", marginTop: 4, fontStyle: "italic" }}>{task.time}</Text>
                  </View>
                </View>
              );
            }
            if (task.active) {
              return (
                <View key={i} style={[glass(24), { padding: 20, flexDirection: "row", alignItems: "flex-start", gap: 20, marginLeft: 8, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: "#166534" }]}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "rgba(119,123,129,0.3)", alignItems: "center", justifyContent: "center", marginTop: 4, flexShrink: 0 }}>
                    <Text style={{ fontSize: 18, color: "#777b81" }}>○</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: "Noto Serif", fontSize: 20, fontWeight: "500", color: "#2f3338", marginBottom: 6 }}>{task.label}</Text>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 13, color: "#5b5f65", lineHeight: 20, maxWidth: 260 }}>{task.desc}</Text>
                  </View>
                </View>
              );
            }
            return (
              <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: 20, marginBottom: 20, opacity: 0.5 }}>
                <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "rgba(119,123,129,0.2)", alignItems: "center", justifyContent: "center", marginTop: 4, flexShrink: 0 }}>
                  <Text style={{ fontSize: 18, color: "rgba(119,123,129,0.4)" }}>○</Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 12 }}>
                  <Text style={{ fontFamily: "Noto Serif", fontSize: 18, color: "#2f3338" }}>{task.label}</Text>
                  <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 12, color: "#777b81", marginTop: 4, fontStyle: "italic" }}>{task.time}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* CTA */}
        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 16 }}>
          <TouchableOpacity activeOpacity={0.85} style={{ backgroundColor: "#166534", paddingHorizontal: 32, paddingVertical: 18, borderRadius: 9999, flexDirection: "row", alignItems: "center", gap: 10, shadowColor: "#166534", shadowOpacity: 0.3, shadowRadius: 24, shadowOffset: { width: 0, height: 8 } }}>
            <Text style={{ fontSize: 20, color: "#fff" }}>✚</Text>
            <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 14, fontWeight: "600", letterSpacing: 1, color: "#fcf7ff" }}>Add to Daily Tasks</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/tafakkur")}
          activeOpacity={0.85}
          style={{
            backgroundColor: "#605d71", paddingVertical: 20, paddingHorizontal: 32,
            borderRadius: 9999, flexDirection: "row", alignItems: "center",
            justifyContent: "center", gap: 10, marginBottom: 8,
            shadowColor: "#605d71", shadowOpacity: 0.15, shadowRadius: 32, shadowOffset: { width: 0, height: 16 },
          }}
        >
          <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 3, color: "#fff" }}>
            Begin Tafakkur
          </Text>
          <Text style={{ fontSize: 18, color: "#fff" }}>🌿</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
