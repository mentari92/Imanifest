import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const glass = (radius = 24) => ({
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: radius,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  ...(Platform.OS === "web"
    ? ({
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
      } as any)
    : {}),
});

export default function QalbResultScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Holographic blobs */}
      <View
        pointerEvents="none"
        style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: -1 } as any}
      >
        {[
          { top: "-10%", left: "-10%", w: "70%", h: "70%", bg: "rgba(229,223,248,0.4)" },
          { bottom: "-10%", right: "-10%", w: "60%", h: "60%", bg: "rgba(169,247,183,0.3)" },
          { top: "30%", right: "-5%", w: "40%", h: "40%", bg: "rgba(255,228,242,0.3)" },
        ].map((b, i) => (
          <View
            key={i}
            style={{
              position: "absolute",
              ...(b.top ? { top: b.top } : {}),
              ...(b.bottom ? { bottom: b.bottom } : {}),
              ...(b.left ? { left: b.left } : {}),
              ...(b.right ? { right: b.right } : {}),
              width: b.w,
              height: b.h,
              backgroundColor: b.bg,
              borderRadius: 9999,
              opacity: 0.35,
              ...(Platform.OS === "web" ? ({ filter: "blur(100px)" } as any) : {}),
            } as any}
          />
        ))}
      </View>

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.4)",
          ...(Platform.OS === "web"
            ? ({
                position: "sticky",
                top: 0,
                zIndex: 50,
                backdropFilter: "blur(24px)",
                borderBottom: "1px solid rgba(255,255,255,0.2)",
              } as any)
            : {}),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, color: "#2f3338" }}>←</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "Newsreader",
              fontSize: 22,
              fontStyle: "italic",
              fontWeight: "600",
              color: "#1e1b2e",
            }}
          >
            Your Qalb Answer
          </Text>
        </View>
        <TouchableOpacity
          style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20, color: "#2f3338" }}>↑</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 24, gap: 24, paddingTop: 24, maxWidth: 680, alignSelf: "center", width: "100%" }}>

        {/* Reflection Summary */}
        <View style={[glass(24), { padding: 24, gap: 16 }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "rgba(96,93,113,0.1)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 22 }}>🎙️</Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#5b5f65",
                  fontWeight: "700",
                }}
              >
                Reflection Theme
              </Text>
              <Text
                style={{
                  fontFamily: "Newsreader",
                  fontSize: 18,
                  fontStyle: "italic",
                  color: "#2f3338",
                }}
              >
                Anxiety about Career Transitions
              </Text>
            </View>
          </View>
          <View style={{ height: 1, backgroundColor: "rgba(174,178,185,0.2)" }} />
          <Text
            style={{
              fontFamily: "Noto Serif",
              fontSize: 13,
              fontStyle: "italic",
              color: "#5b5f65",
              lineHeight: 22,
            }}
          >
            "I feel lost after the company reorganization. I've been working so hard, and now everything feels uncertain. I'm worried about my family's future and whether my skills are still relevant..."
          </Text>
        </View>

        {/* Divine Response */}
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 18 }}>✨</Text>
            <Text
              style={{
                fontFamily: "Newsreader",
                fontSize: 22,
                fontStyle: "italic",
                color: "#0e6030",
              }}
            >
              Divine Response
            </Text>
          </View>

          {/* Quranic Verse Card */}
          <View
            style={[
              glass(24),
              {
                padding: 32,
                gap: 24,
                backgroundColor: "rgba(169,247,183,0.1)",
              },
            ]}
          >
            {/* Arabic Verse */}
            <View style={{ alignItems: "center", gap: 12 }}>
              <Text
                style={{
                  fontFamily: "Amiri",
                  fontSize: 28,
                  lineHeight: 54,
                  color: "#2f3338",
                  textAlign: "center",
                  writingDirection: "rtl",
                  ...(Platform.OS === "web" ? ({ direction: "rtl" } as any) : {}),
                }}
              >
                فَإِنَّ مَعَ الْعُسْرِ يُسْرًا • إِنَّ مَعَ الْعُسْرِ يُسْرًا
              </Text>
              <Text
                style={{
                  fontFamily: "Noto Serif",
                  fontSize: 16,
                  fontStyle: "italic",
                  color: "#5b5f65",
                  textAlign: "center",
                  lineHeight: 26,
                }}
              >
                "For indeed, with hardship [will be] ease.{"\n"}Indeed, with hardship [will be] ease."
              </Text>
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#777b81",
                }}
              >
                — Surah Ash-Sharh (94:5-6)
              </Text>
            </View>

            <View style={{ height: 1, backgroundColor: "rgba(174,178,185,0.2)" }} />

            {/* Prophetic Wisdom */}
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#206c3a",
                  fontWeight: "700",
                }}
              >
                Prophetic Wisdom
              </Text>
              <Text
                style={{
                  fontFamily: "Noto Serif",
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "#2f3338",
                  lineHeight: 24,
                }}
              >
                "How wonderful is the affair of the believer, for his affairs are all good… if something good happens to him, he is grateful and that is good for him. If something bad happens to him, he is patient and that is good for him."
              </Text>
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 11,
                  color: "#777b81",
                }}
              >
                — Sahih Muslim
              </Text>
            </View>

            <View style={{ height: 1, backgroundColor: "rgba(174,178,185,0.2)" }} />

            {/* Gentle Reminder */}
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#6d5965",
                  fontWeight: "700",
                }}
              >
                A Gentle Reminder
              </Text>
              <Text
                style={{
                  fontFamily: "Noto Serif",
                  fontSize: 14,
                  fontStyle: "italic",
                  color: "#5b5f65",
                  lineHeight: 24,
                }}
              >
                Beloved soul, your worth is not defined by a title or a contract, but by the Light within you. This transition is not a closure, but a sacred redirection toward a path that better serves your growth.
              </Text>
            </View>
          </View>
        </View>

        {/* Spiritual Context */}
        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontFamily: "Newsreader",
              fontSize: 22,
              fontStyle: "italic",
              color: "#2f3338",
            }}
          >
            Spiritual Context (Tafsir)
          </Text>
          <View style={[glass(24), { padding: 20 }]}>
            <Text
              style={{
                fontFamily: "Noto Serif",
                fontSize: 14,
                color: "#5b5f65",
                lineHeight: 26,
              }}
            >
              The repetition in Surah Ash-Sharh is a divine reassurance that ease doesn't just follow hardship, but it exists within it. Your current career transition is not a void, but a reshaping. This moment is an invitation to shift your reliance from your employer to the Provider (Ar-Razzaq).
            </Text>
          </View>
        </View>

        {/* Logical Path */}
        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontFamily: "Newsreader",
              fontSize: 22,
              fontStyle: "italic",
              color: "#2f3338",
            }}
          >
            Logical Path
          </Text>
          <View
            style={[
              glass(24),
              {
                padding: 20,
                borderLeftWidth: 4,
                borderLeftColor: "#166534",
                gap: 16,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "Noto Serif",
                fontSize: 14,
                fontWeight: "600",
                color: "#2f3338",
                marginBottom: 4,
              }}
            >
              To navigate your transition logically while maintaining spiritual peace:
            </Text>
            {[
              {
                n: "1",
                title: "Inventory of Blessings (Skills)",
                body: "List your transferable skills as 'tools' Allah has gifted you. This isn't just about a CV; it's recognizing your agency.",
              },
              {
                n: "2",
                title: "The 'Barakah' Routine",
                body: "Treat your job hunt as an act of worship (Ibadah). Set specific hours for applications, anchored between your prayers.",
              },
              {
                n: "3",
                title: "Calculated Tawakkul",
                body: "Review your financial safety net. Focus your Dua-to-Do list on high-impact actions today, trusting that your effort is the key that unlocks provision.",
              },
            ].map((step) => (
              <View key={step.n} style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: "#dcfce7",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Plus Jakarta Sans",
                      fontSize: 11,
                      fontWeight: "700",
                      color: "#166534",
                    }}
                  >
                    {step.n}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "Noto Serif",
                      fontSize: 13,
                      fontWeight: "700",
                      color: "#2f3338",
                    }}
                  >
                    {step.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Noto Serif",
                      fontSize: 13,
                      color: "#5b5f65",
                      lineHeight: 20,
                      marginTop: 2,
                    }}
                  >
                    {step.body}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          onPress={() => router.push("/imanifest")}
          activeOpacity={0.85}
          style={{
            backgroundColor: "#166534",
            paddingVertical: 20,
            paddingHorizontal: 32,
            borderRadius: 9999,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 8,
            shadowColor: "#166534",
            shadowOpacity: 0.15,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 8 },
          }}
        >
          <Text
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: 13,
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: 3,
              color: "#fff",
            }}
          >
            Plan with Imanifest
          </Text>
          <Text style={{ fontSize: 18 }}>✨</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
