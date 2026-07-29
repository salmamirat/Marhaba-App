import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export default function SplashLoading() {
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
