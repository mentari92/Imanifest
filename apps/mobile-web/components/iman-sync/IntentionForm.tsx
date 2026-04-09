import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Sparkles } from "lucide-react-native";

interface IntentionFormProps {
  onSubmit: (intentText: string) => void;
  isLoading: boolean;
}

export function IntentionForm({ onSubmit, isLoading }: IntentionFormProps) {
  const [intentText, setIntentText] = useState("");

  const handleSubmit = () => {
    const trimmed = intentText.trim();
    if (!trimmed || trimmed.length > 500 || isLoading) return;
    onSubmit(trimmed);
  };

  const charCount = intentText.length;
  const isOverLimit = charCount > 500;
  const isEmpty = intentText.trim().length === 0;

  return (
    <View className="bg-surface rounded-verse p-card-p shadow-card">
      <Text className="font-sans text-body-md text-ink-secondary mb-3">
        What's your intention today?
      </Text>

      <TextInput
        className="bg-surface-input rounded-button p-4 font-sans text-body-lg text-text-primary min-h-[120px] text-top"
        placeholder="I want to become more patient in my daily life..."
        placeholderTextColor="#A8A29E"
        value={intentText}
        onChangeText={setIntentText}
        multiline
        maxLength={500}
        editable={!isLoading}
        textAlignVertical="top"
      />

      {/* Character counter */}
      <View className="flex-row justify-between items-center mt-2">
        <Text
          className={`font-sans text-body-sm ${
            isOverLimit ? "text-status-error" : "text-ink-secondary"
          }`}
        >
          {charCount}/500
        </Text>
      </View>

      {/* Submit button */}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading || isEmpty || isOverLimit}
        className={`mt-4 rounded-button py-3.5 px-6 flex-row items-center justify-center gap-2 ${
          isLoading || isEmpty || isOverLimit
            ? "bg-primary/40"
            : "bg-primary"
        }`}
        activeOpacity={0.8}
      >
        <Sparkles size={18} color="#F8FAFC" />
        <Text
          className={`font-sans text-label text-text-inverse ${
            isLoading || isEmpty || isOverLimit
              ? "opacity-60"
              : ""
          }`}
        >
          {isLoading ? "Finding your verses..." : "Validate with Quran"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}