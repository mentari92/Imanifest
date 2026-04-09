import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import type { QuranVerse } from "@imanifest/shared";

interface VerseCardProps {
  verse: QuranVerse;
}

export function VerseCard({ verse }: VerseCardProps) {
  const [tafsirOpen, setTafsirOpen] = useState(false);

  return (
    <View className="bg-surface rounded-verse p-card-p border-l-2 border-primary shadow-verse">
      {/* Verse key */}
      <Text className="font-mono text-mono text-ink-secondary mb-2">
        {verse.verseKey}
      </Text>

      {/* Arabic text — right-to-left */}
      <Text
        className="font-arabic text-[26px] leading-[1.8] text-primary text-right mb-3"
        style={{ writingDirection: "rtl" }}
      >
        {verse.arabicText}
      </Text>

      {/* English translation */}
      <Text className="font-sans text-body-lg text-text-primary leading-[1.6]">
        {verse.translation}
      </Text>

      {/* Collapsible tafsir */}
      {verse.tafsirSnippet && (
        <TouchableOpacity
          onPress={() => setTafsirOpen(!tafsirOpen)}
          className="mt-3 flex-row items-center gap-1"
          activeOpacity={0.7}
        >
          {tafsirOpen ? (
            <ChevronUp size={14} color="#54161B" />
          ) : (
            <ChevronDown size={14} color="#54161B" />
          )}
          <Text className="font-sans text-body-sm text-accent">
            {tafsirOpen ? "Hide Tafsir" : "Tafsir"}
          </Text>
        </TouchableOpacity>
      )}

      {tafsirOpen && verse.tafsirSnippet && (
        <Text className="font-sans text-body-sm text-ink-secondary mt-2 leading-[1.5]">
          {verse.tafsirSnippet}
        </Text>
      )}
    </View>
  );
}