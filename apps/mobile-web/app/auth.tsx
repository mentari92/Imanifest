import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../lib/auth";

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!isLogin && password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name || undefined);
      }
    } catch (err: any) {
      Alert.alert("Auth Error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleQuranOAuth() {
    // TODO: Implement Quran.com OAuth2 flow
    // Will use expo-auth-session with Quran.com as provider
    Alert.alert(
      "Coming Soon",
      "Quran.com login will be available once OAuth credentials are configured."
    );
  }

  return (
    <View className="flex-1 bg-background px-screen-x py-screen-y justify-center">
      <Text className="font-display text-display-xl text-primary text-center mb-section">
        Imanifest
      </Text>
      <Text className="font-sans text-body-lg text-primary text-center mb-8">
        Turn your intention into action.
      </Text>

      {/* Quran.com OAuth */}
      <TouchableOpacity
        className="bg-accent rounded-button py-4 items-center mb-6"
        onPress={handleQuranOAuth}
      >
        <Text className="font-sans text-label text-ink-inverse">
          Login with Quran.com
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-surface" />
        <Text className="font-sans text-body-sm text-muted mx-4">or</Text>
        <View className="flex-1 h-px bg-surface" />
      </View>

      {/* Email/Password Form */}
      {!isLogin && (
        <TextInput
          className="bg-surface-input rounded-button px-4 py-3 font-sans text-body-md text-primary mb-4 border border-surface"
          placeholder="Name (optional)"
          placeholderTextColor="stone-400"
          value={name}
          onChangeText={setName}
        />
      )}

      <TextInput
        className="bg-surface-input rounded-button px-4 py-3 font-sans text-body-md text-primary mb-4 border border-surface"
        placeholder="Email"
        placeholderTextColor="stone-400"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="bg-surface-input rounded-button px-4 py-3 font-sans text-body-md text-primary mb-6 border border-surface"
        placeholder="Password"
        placeholderTextColor="stone-400"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className="bg-primary rounded-button py-4 items-center"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-sans text-label text-ink-inverse">
            {isLogin ? "Sign In" : "Create Account"}
          </Text>
        )}
      </TouchableOpacity>

      {/* Toggle Login/Register */}
      <TouchableOpacity
        className="mt-4 items-center"
        onPress={() => setIsLogin(!isLogin)}
      >
        <Text className="font-sans text-body-sm text-highlight">
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}