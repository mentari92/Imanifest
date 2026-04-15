import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

const glass = (radius = 28) => ({
  backgroundColor: "rgba(255,255,255,0.6)",
  borderRadius: radius,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.2)",
  ...(Platform.OS === "web"
    ? ({
        backdropFilter: "blur(24px) saturate(140%)",
        WebkitBackdropFilter: "blur(24px) saturate(140%)",
      } as any)
    : {}),
});

const SENTIMENTS = [
  { label: "Hopeful", color: "#524f63" },
  { label: "Peaceful", color: "#65515d" },
  { label: "Grounded", color: "#0e6030" },
  { label: "Anxious", color: "#5b5f65" },
  { label: "Seeking", color: "#524f63" },
  { label: "Grateful", color: "#65515d" },
];

export default function QalbScreen() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Holographic blobs */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: -1,
        } as any}
      >
        <View
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "60%",
            height: "60%",
            backgroundColor: "#e5dff8",
            borderRadius: 9999,
            opacity: 0.4,
            ...(Platform.OS === "web" ? ({ filter: "blur(80px)" } as any) : {}),
          } as any}
        />
        <View
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "50%",
            height: "50%",
            backgroundColor: "#ffe4f2",
            borderRadius: 9999,
            opacity: 0.4,
            ...(Platform.OS === "web" ? ({ filter: "blur(80px)" } as any) : {}),
          } as any}
        />
      </View>

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255,255,255,0.6)",
          ...(Platform.OS === "web"
            ? ({
                position: "sticky",
                top: 0,
                zIndex: 50,
                backdropFilter: "blur(24px)",
              } as any)
            : {}),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#e5dff8",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>🌸</Text>
          </View>
          <Text
            style={{
              fontFamily: "Newsreader",
              fontSize: 22,
              fontStyle: "italic",
              fontWeight: "600",
              color: "#1e1b2e",
            }}
          >
            Qalb Voice
          </Text>
        </View>
        <TouchableOpacity
          style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 22 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 24, gap: 48, paddingTop: 40 }}>
        {/* Hero */}
        <View style={{ gap: 12 }}>
          <Text
            style={{
              fontFamily: "Newsreader",
              fontSize: 40,
              fontStyle: "italic",
              fontWeight: "600",
              color: "#2f3338",
              lineHeight: 48,
              maxWidth: 320,
            }}
          >
            A Sanctuary for your Spiritual Voice
          </Text>
          <Text
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: 15,
              color: "#5b5f65",
              maxWidth: 280,
              lineHeight: 22,
            }}
          >
            Speak your truth into the silence. Let your intentions ripple through the holographic expanse.
          </Text>
        </View>

        {/* Central Mic Button */}
        <View style={{ alignItems: "center", paddingVertical: 24 }}>
          {/* Outer glow */}
          <View
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: 140,
              backgroundColor: "rgba(255,228,242,0.2)",
              ...(Platform.OS === "web"
                ? ({ filter: "blur(40px)" } as any)
                : {}),
            }}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/qalb-result")}
            style={[
              glass(9999),
              {
                width: 240,
                height: 240,
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              },
            ]}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: "rgba(96,93,113,0.1)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 36 }}>🎙️</Text>
            </View>
            <Text
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 10,
                fontWeight: "700",
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#605d71",
              }}
            >
              BEGIN
            </Text>
            <Text
              style={{
                fontFamily: "Newsreader",
                fontSize: 16,
                fontStyle: "italic",
                color: "#524f63",
                textAlign: "center",
                paddingHorizontal: 24,
              }}
            >
              Tap to Commence Reflection
            </Text>
          </TouchableOpacity>

          {/* Streak Pill */}
          <View
            style={[
              glass(9999),
              {
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 24,
                paddingVertical: 12,
                marginTop: 24,
              },
            ]}
          >
            <Text style={{ fontSize: 18 }}>⭐</Text>
            <Text
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 16,
                fontWeight: "700",
                color: "#6d5965",
              }}
            >
              12 Days
            </Text>
            <Text
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 13,
                color: "#5b5f65",
                borderLeftWidth: 1,
                borderLeftColor: "rgba(174,178,185,0.3)",
                paddingLeft: 10,
              }}
            >
              Reflection Streak
            </Text>
          </View>
        </View>

        {/* Sentiment Landscape */}
        <View style={{ gap: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Newsreader",
                fontSize: 26,
                fontStyle: "italic",
                color: "#2f3338",
              }}
            >
              Sentiment Landscape
            </Text>
            <Text
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: "#5b5f65",
              }}
            >
              Current Vibrations
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {SENTIMENTS.map((s) => (
              <TouchableOpacity
                key={s.label}
                onPress={() => setSelected(selected === s.label ? null : s.label)}
                style={[
                  glass(9999),
                  {
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor:
                      selected === s.label
                        ? "rgba(229,223,248,0.8)"
                        : "rgba(255,255,255,0.6)",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Plus Jakarta Sans",
                    fontSize: 14,
                    fontWeight: "500",
                    color: s.color,
                  }}
                >
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Write Section */}
        <View style={[glass(32), { padding: 28, gap: 16 }]}>
          <View>
            <Text
              style={{
                fontFamily: "Newsreader",
                fontSize: 22,
                fontStyle: "italic",
                color: "#2f3338",
              }}
            >
              Prefer to write?
            </Text>
            <Text
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 13,
                color: "#5b5f65",
                marginTop: 4,
              }}
            >
              Transcribe your internal dialogue into the physical realm.
            </Text>
          </View>
          <View>
            <TextInput
              value={note}
              onChangeText={setNote}
              multiline
              placeholder="Pour your thoughts here..."
              placeholderTextColor="rgba(119,123,129,0.6)"
              style={{
                backgroundColor: "rgba(236,238,243,0.3)",
                borderRadius: 16,
                padding: 20,
                fontFamily: "Noto Serif",
                fontSize: 16,
                color: "#2f3338",
                minHeight: 140,
                textAlignVertical: "top",
              }}
            />
            <TouchableOpacity
              onPress={() => router.push("/qalb-result")}
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: "#605d71",
                paddingHorizontal: 20,
                paddingVertical: 8,
                borderRadius: 9999,
                shadowColor: "#605d71",
                shadowOpacity: 0.2,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 4 },
              }}
            >
              <Text
                style={{
                  fontFamily: "Plus Jakarta Sans",
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#fcf7ff",
                }}
              >
                Archive Soul-Note
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
