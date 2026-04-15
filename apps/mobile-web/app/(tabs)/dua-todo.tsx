import { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Sparkles, ArrowRight } from "lucide-react-native";
import { useDuaToDo } from "../../hooks/useDuaToDo";
import { TaskChecklist } from "../../components/dua-todo/TaskChecklist";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { ErrorMessage } from "../../components/shared/ErrorMessage";
import { colors } from "../../constants/theme";

export default function DuaToDoScreen() {
  const { manifestationId: paramId } = useLocalSearchParams<{ manifestationId?: string }>();
  const { tasks, isLoading, error, generateTasks, toggleTask } = useDuaToDo();
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (paramId && !hasGenerated) {
      generateTasks(paramId).then(() => setHasGenerated(true)).catch(() => {});
    }
  }, [paramId]);

  // Has tasks from deep-link
  if (tasks.length > 0) {
    return (
      <View className="flex-1 bg-background px-screen-x py-screen-y">
        <TaskChecklist tasks={tasks} onToggle={toggleTask} />
      </View>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <View className="flex-1 bg-background px-screen-x py-screen-y">
        <LoadingSpinner message="Generating your action plan..." />
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View className="flex-1 bg-background px-screen-x py-screen-y">
        <ErrorMessage message={error} />
      </View>
    );
  }

  // Empty — no manifestationId provided
  return (
    <View className="flex-1 bg-background px-screen-x py-screen-y items-center justify-center">
      <View className="bg-surface-card rounded-full p-6 border border-border shadow-card backdrop-blur-md">
        <Sparkles size={48} color="#D4AF37" />
      </View>
      <Text className="font-display text-display-lg text-primary mt-6">
        Dua-to-Do
      </Text>
      <Text className="font-sans text-body-md text-ink-secondary mt-2 text-center max-w-[80%]">
        Please plant a Niyyah in the Niyyah Board first to generate your actionable manifestation roadmap.
      </Text>
    </View>
  );
}