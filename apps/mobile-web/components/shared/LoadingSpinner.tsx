import { View, ActivityIndicator, Text } from "react-native";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center py-section">
      <ActivityIndicator size="large" color="#064E3B" />
      {message && (
        <Text className="font-sans text-body-sm text-ink-secondary mt-3 text-center">
          {message}
        </Text>
      )}
    </View>
  );
}