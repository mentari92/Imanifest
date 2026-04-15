import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const glass = (radius = 24) => ({
  backgroundColor: "rgba(255,255,255,0.45)",
  borderRadius: radius,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.5)",
  ...(Platform.OS === "web"
    ? ({
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
      } as any)
    : {}),
});

const RECITERS = [
  { name: "Mishary Rashid Alafasy", desc: "Kuwait · Melodic & Emotive", emoji: "🎙️", active: true },
  { name: "Abdur-Rahman as-Sudais", desc: "Makkah · Grand Mosque Imam", emoji: "🕌", active: false },
  { name: "Yasser Al-Dosari", desc: "Saudi Arabia · Clear & Soothing", emoji: "🌙", active: false },
];

const DHIKR_LIST = [
  { arabic: "سُبْحَانَ ٱللَّٰهِ", transliteration: "Subhanallah", meaning: "Glory be to Allah" },
  { arabic: "ٱلْحَمْدُ لِلَّٰهِ", transliteration: "Alhamdulillah", meaning: "All praise is to Allah" },
  { arabic: "ٱللَّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest" },
];

export default function TafakkurHubScreen() {
  const router = useRouter();
  const [activeReciter, setActiveReciter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dhikrIndex, setDhikrIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      {/* Holographic blobs */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: -1 } as any}
      >
        <View
          style={{
            position: "absolute", top: "-5%", left: "-10%",
            width: "65%", height: "50%",
            backgroundColor: "rgba(229,223,248,0.35)",
            borderRadius: 9999, opacity: 0.5,
            ...(Platform.OS === "web" ? ({ filter: "blur(90px)" } as any) : {}),
          } as any}
        />
        <View
          style={{
            position: "absolute", bottom: "10%", right: "-10%",
            width: "55%", height: "45%",
            backgroundColor: "rgba(169,247,183,0.25)",
            borderRadius: 9999, opacity: 0.5,
            ...(Platform.OS === "web" ? ({ filter: "blur(90px)" } as any) : {}),
          } as any}
        />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 24, paddingVertical: 16,
            flexDirection: "row", justifyContent: "space-between", alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.4)",
            ...(Platform.OS === "web"
              ? ({ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.2)" } as any)
              : {}),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40, height: 40, borderRadius: 20,
                backgroundColor: "#e5dff8", alignItems: "center", justifyContent: "center",
                borderWidth: 2, borderColor: "rgba(255,255,255,0.4)",
              }}
            >
              <Text style={{ fontSize: 18 }}>🌟</Text>
            </View>
            <Text style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", fontWeight: "600", color: "#1e1b2e" }}>
              Imanifest
            </Text>
          </View>
          <TouchableOpacity style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 22 }}>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 24, gap: 32, paddingTop: 32 }}>
          {/* Hero Title */}
          <View style={{ gap: 6 }}>
            <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, textTransform: "uppercase", letterSpacing: 3, color: "rgba(91,95,101,0.7)", fontWeight: "700" }}>
              Curated Spiritual Guidance
            </Text>
            <Text style={{ fontFamily: "Newsreader", fontSize: 44, fontStyle: "italic", fontWeight: "600", color: "#2f3338", lineHeight: 52 }}>
              Tafakkur Hub
            </Text>
            <Text style={{ fontFamily: "Noto Serif", fontSize: 15, fontStyle: "italic", color: "#5b5f65", lineHeight: 22, maxWidth: 300 }}>
              Contemplate the divine through recitation, reflection, and remembrance.
            </Text>
          </View>

          {/* Featured Surah Card */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "rgba(91,95,101,0.7)", fontWeight: "700" }}>
              Featured Recitation
            </Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsPlaying(!isPlaying)}
              style={[glass(32), {
                overflow: "hidden",
                backgroundColor: "rgba(14,96,48,0.08)",
                borderColor: "rgba(22,101,52,0.2)",
              }]}
            >
              {/* Gradient overlay area */}
              <View style={{
                padding: 32, gap: 20,
                backgroundColor: "rgba(14,96,48,0.06)",
                ...(Platform.OS === "web"
                  ? ({ background: "linear-gradient(135deg, rgba(14,96,48,0.12) 0%, rgba(169,247,183,0.15) 100%)" } as any)
                  : {}),
              }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                  <View style={{
                    width: 64, height: 64, borderRadius: 32,
                    backgroundColor: "rgba(22,101,52,0.12)",
                    alignItems: "center", justifyContent: "center",
                    borderWidth: 1, borderColor: "rgba(22,101,52,0.2)",
                  }}>
                    <Text style={{ fontSize: 32 }}>🌿</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#206c3a", fontWeight: "700" }}>
                      Now Playing
                    </Text>
                    <Text style={{ fontFamily: "Newsreader", fontSize: 24, fontStyle: "italic", fontWeight: "600", color: "#1e1b2e" }}>
                      Surah Ar-Rahman
                    </Text>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 13, color: "#5b5f65", marginTop: 2 }}>
                      Mishary Rashid Alafasy
                    </Text>
                  </View>
                  <View style={{
                    width: 52, height: 52, borderRadius: 26,
                    backgroundColor: "#206c3a",
                    alignItems: "center", justifyContent: "center",
                    shadowColor: "#166534", shadowOpacity: 0.3, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
                  }}>
                    <Text style={{ fontSize: 22, color: "#fff" }}>{isPlaying ? "⏸" : "▶️"}</Text>
                  </View>
                </View>

                {/* Progress bar */}
                <View style={{ gap: 8 }}>
                  <View style={{ height: 4, backgroundColor: "rgba(22,101,52,0.12)", borderRadius: 2, overflow: "hidden" }}>
                    <View style={{ width: "35%", height: "100%", backgroundColor: "#206c3a", borderRadius: 2 }} />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, color: "#5b5f65" }}>2:18</Text>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 10, color: "#5b5f65" }}>6:43</Text>
                  </View>
                </View>

                {/* Arabic title */}
                <View style={{ alignItems: "center" }}>
                  <Text style={{
                    fontFamily: "Amiri", fontSize: 28, color: "#1e1b2e",
                    ...(Platform.OS === "web" ? ({ direction: "rtl" } as any) : {}),
                  }}>
                    سُوْرَةُ الرَّحْمٰنِ
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Curated Reciters */}
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", color: "#2f3338" }}>
                Curated Reciters
              </Text>
              <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, color: "#545164" }}>
                See All →
              </Text>
            </View>
            <View style={{ gap: 10 }}>
              {RECITERS.map((r, i) => (
                <TouchableOpacity
                  key={r.name}
                  onPress={() => setActiveReciter(i)}
                  activeOpacity={0.85}
                  style={[glass(20), {
                    flexDirection: "row", alignItems: "center", gap: 16,
                    paddingHorizontal: 20, paddingVertical: 16,
                    backgroundColor: activeReciter === i ? "rgba(22,101,52,0.08)" : "rgba(255,255,255,0.45)",
                    borderColor: activeReciter === i ? "rgba(22,101,52,0.25)" : "rgba(255,255,255,0.5)",
                  }]}
                >
                  <View style={{
                    width: 48, height: 48, borderRadius: 24,
                    backgroundColor: activeReciter === i ? "rgba(22,101,52,0.12)" : "rgba(229,223,248,0.5)",
                    alignItems: "center", justifyContent: "center",
                  }}>
                    <Text style={{ fontSize: 22 }}>{r.emoji}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: "Noto Serif", fontSize: 15, fontWeight: "600", color: "#2f3338" }}>
                      {r.name}
                    </Text>
                    <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, color: "#5b5f65", marginTop: 2 }}>
                      {r.desc}
                    </Text>
                  </View>
                  {activeReciter === i && (
                    <View style={{
                      width: 8, height: 8, borderRadius: 4,
                      backgroundColor: "#206c3a",
                    }} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Read & Reflect */}
          <View style={{ gap: 12 }}>
            <Text style={{ fontFamily: "Newsreader", fontSize: 22, fontStyle: "italic", color: "#2f3338" }}>
              Read & Reflect
            </Text>
            <View style={[glass(28), {
              padding: 28, gap: 20,
              backgroundColor: "rgba(226,221,248,0.2)",
              borderColor: "rgba(226,221,248,0.5)",
            }]}>
              {/* Verse reference */}
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: "rgba(174,178,185,0.25)" }} />
                <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: "#605d71", fontWeight: "700" }}>
                  Surah Al-Mulk · 67:1
                </Text>
                <View style={{ flex: 1, height: 1, backgroundColor: "rgba(174,178,185,0.25)" }} />
              </View>

              {/* Arabic verse */}
              <Text style={{
                fontFamily: "Amiri", fontSize: 26, lineHeight: 50, color: "#2f3338",
                textAlign: "center",
                ...(Platform.OS === "web" ? ({ direction: "rtl" } as any) : {}),
              }}>
                تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ
              </Text>

              {/* Translation */}
              <Text style={{
                fontFamily: "Noto Serif", fontSize: 15, fontStyle: "italic",
                color: "#5b5f65", textAlign: "center", lineHeight: 24,
              }}>
                "Blessed is He in Whose hand is the dominion, and He is over all things competent."
              </Text>

              {/* Divider */}
              <View style={{ height: 1, backgroundColor: "rgba(174,178,185,0.2)" }} />

              {/* Tafakkur reflection */}
              <View style={{ gap: 6 }}>
                <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: "#605d71", fontWeight: "700" }}>
                  Tafakkur
                </Text>
                <Text style={{ fontFamily: "Noto Serif", fontSize: 13, color: "#5b5f65", lineHeight: 22, fontStyle: "italic" }}>
                  Pause and contemplate: every power, every provision, every moment of ease — it is all in His hand. The word تَبَٰرَكَ (Tabarak) carries layers of infinite blessing. How has His dominion manifested in your life today?
                </Text>
              </View>

              {/* Action buttons */}
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={{
                    flex: 1, backgroundColor: "#605d71",
                    paddingVertical: 14, borderRadius: 9999,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 2, color: "#fff" }}>
                    📖 Read More
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[glass(9999), {
                    flex: 1, paddingVertical: 14,
                    alignItems: "center",
                  }]}
                >
                  <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 2, color: "#605d71" }}>
                    ↑ Share
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Bento: Daily Dhikr + Nature Sounds */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            {/* Daily Dhikr */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setDhikrIndex((dhikrIndex + 1) % DHIKR_LIST.length)}
              style={[glass(24), {
                flex: 1, padding: 24, gap: 12,
                backgroundColor: "rgba(226,221,248,0.3)",
                borderColor: "rgba(226,221,248,0.5)",
              }]}
            >
              <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: "#605d71", fontWeight: "700" }}>
                Daily Dhikr
              </Text>
              <Text style={{
                fontFamily: "Amiri", fontSize: 22, lineHeight: 38, color: "#2f3338", textAlign: "center",
                ...(Platform.OS === "web" ? ({ direction: "rtl" } as any) : {}),
              }}>
                {DHIKR_LIST[dhikrIndex].arabic}
              </Text>
              <Text style={{ fontFamily: "Noto Serif", fontSize: 13, fontStyle: "italic", color: "#605d71", textAlign: "center" }}>
                {DHIKR_LIST[dhikrIndex].transliteration}
              </Text>
              <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, color: "#5b5f65", textAlign: "center", letterSpacing: 1 }}>
                {DHIKR_LIST[dhikrIndex].meaning}
              </Text>
              <View style={{ alignItems: "center", marginTop: 4 }}>
                <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 8, textTransform: "uppercase", letterSpacing: 2, color: "rgba(96,93,113,0.5)" }}>
                  Tap to rotate
                </Text>
              </View>
            </TouchableOpacity>

            {/* Nature Sounds */}
            <View style={[glass(24), {
              flex: 1, padding: 24, gap: 12,
              backgroundColor: "rgba(169,247,183,0.15)",
              borderColor: "rgba(169,247,183,0.4)",
            }]}>
              <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, color: "#206c3a", fontWeight: "700" }}>
                Nature Sounds
              </Text>
              <Text style={{ fontSize: 36, textAlign: "center" }}>🌊</Text>
              <Text style={{ fontFamily: "Noto Serif", fontSize: 13, fontStyle: "italic", color: "#2f3338", textAlign: "center" }}>
                Gentle Rain & River
              </Text>
              {[
                { label: "Rain", emoji: "🌧️" },
                { label: "Forest", emoji: "🌲" },
                { label: "Ocean", emoji: "🌊" },
              ].map((s) => (
                <TouchableOpacity
                  key={s.label}
                  activeOpacity={0.8}
                  style={[glass(9999), { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, paddingVertical: 8 }]}
                >
                  <Text style={{ fontSize: 14 }}>{s.emoji}</Text>
                  <Text style={{ fontFamily: "Plus Jakarta Sans", fontSize: 11, color: "#206c3a", fontWeight: "600" }}>{s.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Mini Player */}
      <View
        style={{
          position: "absolute", bottom: 108, left: 16, right: 16,
          ...(Platform.OS === "web" ? { bottom: 100 } : {}),
        }}
      >
        <View style={[glass(20), {
          flexDirection: "row", alignItems: "center", gap: 12,
          paddingHorizontal: 20, paddingVertical: 14,
          backgroundColor: "rgba(255,255,255,0.8)",
          shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 4 },
        }]}>
          <View style={{
            width: 40, height: 40, borderRadius: 12,
            backgroundColor: "rgba(22,101,52,0.1)",
            alignItems: "center", justifyContent: "center",
          }}>
            <Text style={{ fontSize: 18 }}>🌿</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Noto Serif", fontSize: 13, fontWeight: "600", color: "#2f3338" }}>
              Al-Mulk · Mishary Rashid Alafasy
            </Text>
            <View style={{ height: 3, backgroundColor: "rgba(174,178,185,0.3)", borderRadius: 2, overflow: "hidden", marginTop: 6 }}>
              <View style={{ width: "35%", height: "100%", backgroundColor: "#206c3a", borderRadius: 2 }} />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <TouchableOpacity style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>⏮</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsPlaying(!isPlaying)}
              style={{
                width: 36, height: 36, borderRadius: 18,
                backgroundColor: "#206c3a",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 14, color: "#fff" }}>{isPlaying ? "⏸" : "▶"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 16 }}>⏭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
