import { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Platform,
} from "react-native";
import { useRouter } from "expo-router";

const glass = (radius = 24) => ({
  backgroundColor: "rgba(255,255,255,0.45)",
  borderRadius: radius,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.5)",
  ...(Platform.OS === "web" ? ({ backdropFilter: "blur(24px) saturate(140%)", WebkitBackdropFilter: "blur(24px) saturate(140%)" } as any) : {}),
});

export default function NiyyahBoardScreen() {
  const router = useRouter();
  const [intention, setIntention] = useState("");
  const [gratitude, setGratitude] = useState(["", "", ""]);
  const updateGratitude = (i: number, v: string) => { const a = [...gratitude]; a[i] = v; setGratitude(a); };
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: 24, paddingVertical: 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(255,255,255,0.4)", ...(Platform.OS === "web" ? ({ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.2)" } as any) : {}) }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#e5dff8", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.4)" }}>
          <Text style={{ fontSize: 18 }}>🌟</Text>
        </View>
        <Text style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", fontWeight: "600", color: "#1e1b2e" }}>Imanifest</Text>
        <TouchableOpacity style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 22 }}>🔔</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 24, gap: 36, paddingTop: 32 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: "Newsreader", fontSize: 42, fontStyle: "italic", fontWeight: "600", color: "#2f3338", lineHeight: 52 }}>Imanifest My Vision</Text>
          <Text style={{ fontFamily: "Noto Serif", fontSize: 16, fontStyle: "italic", color: "#5b5f65", opacity: 0.8 }}>Align your soul's purpose with intentional action.</Text>
        </View>
        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(91,95,101,0.8)" }}>Visual Focus</Text>
          <TouchableOpacity activeOpacity={0.9} style={[glass(32), { aspectRatio: 4/3, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(226,221,248,0.4)" }]}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(255,255,255,0.4)", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }}>
              <Text style={{ fontSize: 28 }}>📸</Text>
            </View>
            <Text style={{ fontFamily: "Newsreader", fontSize: 18, fontStyle: "italic", color: "#545164" }}>Capture Inspiration</Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(91,95,101,0.8)" }}>Soul's Intention</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={{ fontSize: 16 }}>🎙️</Text>
              <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: "#545164" }}>Voice Record</Text>
            </View>
          </View>
          <View style={[glass(32), { padding: 24, minHeight: 200 }]}>
            <TextInput value={intention} onChangeText={setIntention} multiline placeholder="Write what your soul desires to manifest today..." placeholderTextColor="rgba(229,223,248,0.6)" style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", color: "#2f3338", minHeight: 120, textAlignVertical: "top" }} />
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 }}>
              <Text style={{ fontSize: 14 }}>📜</Text>
              <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, fontWeight: "700", color: "rgba(32,108,58,0.6)" }}>Saved to Journey</Text>
            </View>
          </View>
        </View>
        <View style={{ gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "rgba(174,178,185,0.3)" }} />
            <Text style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", color: "#2f3338" }}>Moments of Grateful</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "rgba(174,178,185,0.3)" }} />
          </View>
          <View style={{ gap: 12 }}>
            {gratitude.map((val, i) => (
              <View key={i} style={[glass(16), { flexDirection: "row", alignItems: "center", gap: 16, paddingHorizontal: 24, paddingVertical: 16 }]}>
                <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 14, color: "rgba(32,108,58,0.4)", fontWeight: "600", width: 28 }}>{String(i+1).padStart(2,"0")}</Text>
                <TextInput value={val} onChangeText={(t) => updateGratitude(i,t)} placeholder={i===0?"Something I am grateful for...":i===1?"Another blessing today...":"A final moment of gratitude..."} placeholderTextColor="rgba(91,95,101,0.4)" style={{ flex: 1, fontFamily: "Noto Serif", fontSize: 16, fontStyle: "italic", color: "#2f3338" }} />
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={() => router.push("/dua-todo")} activeOpacity={0.85} style={{ backgroundColor: "#206c3a", paddingVertical: 20, paddingHorizontal: 32, borderRadius: 9999, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, shadowColor: "#166534", shadowOpacity: 0.15, shadowRadius: 32, shadowOffset: { width: 0, height: 16 }, marginBottom: 8 }}>
          <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 13, fontWeight: "700", textTransform: "uppercase", letterSpacing: 3, color: "#e8ffe8" }}>Manifest &amp; Start Dua-to-Do</Text>
          <Text style={{ fontSize: 18, color: "#e8ffe8" }}>→</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
