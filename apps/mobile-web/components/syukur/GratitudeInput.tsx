import React from "react";
import { View, Text, TextInput } from "react-native";
import { Heart } from "lucide-react-native";

interface GratitudeInputProps {
  items: string[];
  setItems: (index: number, val: string) => void;
}

export const GratitudeInput: React.FC<GratitudeInputProps> = ({
  items,
  setItems,
}) => {
  return (
    <View className="mt-6 bg-surface-card border border-border rounded-[24px] p-6 shadow-card backdrop-blur-md">
      <View className="flex-row items-center gap-2 mb-4">
        <Heart size={20} color="#D4AF37" />
        <Text className="font-display text-display-md text-primary">
          3 Things I'm Grateful For
        </Text>
      </View>

      <Text className="font-sans text-body-sm text-ink-secondary mb-4 italic">
        "If you are grateful, I will surely increase you." (14:7)
      </Text>

      {items.map((item, idx) => (
        <View key={idx} className="flex-row items-center mb-3">
          <Text className="font-display text-display-sm text-primary mr-3">
            {idx + 1}.
          </Text>
          <TextInput
            className="flex-1 bg-surface-input border-b border-border/50 py-2 font-sans text-body-md text-primary"
            placeholder="I am grateful for..."
            placeholderTextColor="#475569"
            value={item}
            onChangeText={(val) => setItems(idx, val)}
          />
        </View>
      ))}
    </View>
  );
};
