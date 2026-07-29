import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import Button from "@/components/Button";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/theme/colors";
import { api } from "@/services/api";

export default function Home() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/auth/me").then(({ data }) => {
      useAuthStore.setState({ user: data });
    });
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Pressable style={styles.logoutIcon} onPress={handleLogout} hitSlop={12}>
        <Feather name="log-out" size={22} color={colors.text} />
      </Pressable>

      <Text style={styles.greeting}>Bonjour</Text>
      <Text style={styles.title}>
        Marhba,{"\n"}
        {user?.fullName ?? "..."}
      </Text>
      <Text style={styles.emoji}>👋</Text>

      <View style={{ flex: 1 }} />

      <Button
        title="Se deconnecter"
        variant="outline"
        onPress={handleLogout}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.card, padding: 24, paddingTop: 70 },
  logoutIcon: { alignSelf: "flex-end", marginBottom: 40 },
  greeting: { color: colors.subtext, fontSize: 16, marginBottom: 12 },
  title: { color: colors.text, fontSize: 34, fontWeight: "500", lineHeight: 42 },
  emoji: { fontSize: 44, marginTop: 16 },
});
