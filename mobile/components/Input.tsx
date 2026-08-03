import { View, Text, TextInput, StyleSheet, TextInputProps } from "react-native";
import { colors } from "@/theme/colors";

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
}

export default function Input({ label, helperText, ...inputProps }: InputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.placeholder}
        style={styles.input}
        {...inputProps}
      />
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { color: colors.text, fontSize: 13, marginBottom: 8 },
  input: {backgroundColor: colors.input, borderRadius: 14, height: 52, paddingHorizontal: 16, color: colors.text, fontSize: 15,},
  helper: { color: colors.subtext, fontSize: 12, marginTop: 6 },
});
