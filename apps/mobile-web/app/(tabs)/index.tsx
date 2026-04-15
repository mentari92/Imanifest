import { View, Text, ScrollView, TouchableOpacity, Animated } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { 
  Sparkles, 
  CheckSquare, 
  Heart, 
  Headphones, 
  Terminal 
} from "lucide-react-native";

// Card Component
function FeatureCard({ 
  icon: Icon, 
  emoji, 
  title, 
  desc, 
  onPress 
}: { 
  icon: any, 
  emoji: string, 
  title: string, 
  desc: string, 
  onPress: () => void 
}) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-1 bg-surface-card border border-white/10 rounded-[20px] p-5 m-2 shadow-card backdrop-blur-xl"
    >
      <Text className="text-[24px] mb-2">{emoji}</Text>
      <Text className="font-display text-body-lg text-primary mb-1">{title}</Text>
      <Text className="font-sans text-body-sm text-ink-secondary leading-5">
        {desc}
      </Text>
    </TouchableOpacity>
  );
}

export default function DashboardScreen() {
  const router = useRouter();
  
  // Pulse animation for status dot
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView 
      className="flex-1 bg-background px-screen-x"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 60, alignItems: 'center' }}
    >
      {/* Brand Header */}
      <View className="items-center mb-10">
        <Text className="text-[64px] mb-2">🕌</Text>
        <Text className="font-display text-[48px] text-primary tracking-tight">
          Imanifest
        </Text>
        <Text className="font-sans text-body-lg text-ink-secondary mt-1">
          Imanifest : Islamic Law of Attraction
        </Text>
      </View>

      {/* Status Pill */}
      <View className="bg-surface border border-primary/20 rounded-full px-6 py-2.5 flex-row items-center mb-12">
        <Animated.View 
          style={{ opacity: pulseAnim }}
          className="w-2.5 h-2.5 bg-accent/80 rounded-full mr-3" 
        />
        <Text className="font-sans text-label text-primary uppercase tracking-widest">
          All Systems Operational
        </Text>
      </View>

      {/* Features Grid */}
      <View className="w-full max-w-[500px]">
        <View className="flex-row">
          <FeatureCard 
            emoji="💚"
            icon={Heart}
            title="Heart Pulse"
            desc="Voice journaling with emotional AI sentiment analysis"
            onPress={() => router.push("/heartpulse")}
          />
          <FeatureCard 
            emoji="🙌"
            icon={Sparkles}
            title="Iman Sync"
            desc="AI-powered intention analysis with Quranic guidance"
            onPress={() => router.push("/niyyah-board")}
          />
        </View>
        <View className="flex-row">
          <FeatureCard 
            emoji="✅"
            icon={CheckSquare}
            title="Dua To-Do"
            desc="Smart task generation from your daily prayers"
            onPress={() => router.push("/dua-todo")}
          />
          <FeatureCard 
            emoji="🎧"
            icon={Headphones}
            title="Sakinah Hub"
            desc="Tafakkur & Divine recitations for spiritual peace"
            onPress={() => router.push("/sakinah")}
          />
        </View>
      </View>

      {/* Footer Backend Bar */}
      <View className="mt-16 bg-white/5 border border-white/10 rounded-xl px-5 py-3 flex-row items-center">
        <Terminal size={16} color="#94A3B8" className="mr-3" />
        <Text className="font-mono text-body-xs text-ink-secondary">
          API v1.0.0 — <Text className="text-red-400">Backend Running</Text>
        </Text>
      </View>

      {/* Copyright */}
      <View className="mt-12 items-center opacity-60">
        <Text className="font-sans text-[12px] text-ink-secondary">
          © 2026 Imanifest · Built with ❤️ for the Ummah
        </Text>
      </View>
    </ScrollView>
  );
}