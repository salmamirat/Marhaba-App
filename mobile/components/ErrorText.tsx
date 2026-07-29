import { Text, StyleSheet } from "react-native";

interface ErrorTextProps {
  message?: string;
}

export default function ErrorText({ message }: ErrorTextProps) {
  if (!message) return null;
  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#FF4D4D",
    fontSize: 14,
    marginTop: -8,
    marginBottom: 16,
    fontWeight: "500",
  },
});
