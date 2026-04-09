import { View, Text } from "react-native";
import { BookOpen } from "lucide-react-native";
import { VerseCard } from "./VerseCard";
import type { QuranVerse } from "@imanifest/shared";

interface ImanSyncResultProps {
  verses: QuranVerse[];
  aiSummary: string;
}

export function ImanSyncResult({ verses, aiSummary }: ImanSyncResultProps) {
  if (verses.length === 0) return null;

  return (
    <View className="mt-section">
      {/* AI Summary */}
      <View className="bg-surface rounded-verse p-card-p border-l-2 border-highlight shadow-gold mb-section">
        <Text className="font-sans text-body-md text-ink-secondary mb-2">
          Spiritual Validation
        </Text>
        <Text className="font-sans text-body-lg text-text-primary leading-[1.6]">
          {aiSummary}
        </Text>
      </View>

      {/* Section header */}
      <View className="flex-row items-center gap-2 mb-4">
        <BookOpen size={20} color="#064E3B" />
        <Text className="font-display text-display-md text-primary">
          Your Verses
        </Text>
      </View>

      {/* Verse cards */}
      <View className="gap-4">
        {verses.map((verse, index) => (
          <VerseCard key={verse.verseKey || index} verse={verse} />
        ))}
      </View>
    </View>
  );
}