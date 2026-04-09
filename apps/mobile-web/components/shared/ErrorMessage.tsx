import { View, Text } from "react-native";
import { AlertCircle } from "lucide-react-native";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <View className="bg-red-50 rounded-card p-card-p border-l-2 border-status-error flex-row items-start gap-3">
      <AlertCircle size={20} color="#9F1239" />
      <View className="flex-1">
        <Text className="font-sans text-body-md text-status-error">
          {message}
        </Text>
      </View>
    </View>
  );
}