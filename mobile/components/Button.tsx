import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "solid" | "outline";
}

export default function Button({ title, onPress, loading, variant = "solid" }: ButtonProps) {
  const isOutline = variant === "outline";

  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        styles.base,
        isOutline ? styles.outline : styles.solid,
        loading && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.text : colors.primaryText} />
      ) : (
        <Text style={isOutline ? styles.outlineText : styles.solidText}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  solid: { backgroundColor: colors.primary },
  outline: { borderWidth: 1.5, borderColor: colors.text },
  disabled: { opacity: 0.6 },
  solidText: { color: colors.primaryText, fontSize: 16, fontWeight: "600" },
  outlineText: { color: colors.text, fontSize: 16, fontWeight: "600" },
});
