import { View, ActivityIndicator } from "react-native";
import { LightStatusBar } from "./LightStatusBar";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-700">
      <ActivityIndicator color="#5E60CE" />
      <LightStatusBar />
    </View>
  );
}
