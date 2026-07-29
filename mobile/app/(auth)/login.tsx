import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/theme/colors";

export default function Login() {
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError((err as any).response?.data?.error || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>Marhba</Text>

      <Text style={styles.title}>Bon retour</Text>
      <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>

      <Input
        label="Adresse email"
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Mot de passe"
        placeholder="••••••"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <ErrorText message={error} />

      <Button title="Se connecter" onPress={handleLogin} loading={loading} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pas de compte ? </Text>
        <Link href="/register" style={styles.link}>
          Créer un compte
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.card },
  content: { padding: 24, paddingTop: 80, flexGrow: 1 },
  brand: { color: colors.text, fontSize: 22, fontWeight: "700", marginBottom: 40 },
  title: { color: colors.text, fontSize: 28, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: colors.subtext, fontSize: 14, marginBottom: 28 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: colors.subtext, fontSize: 14 },
  link: { color: colors.text, fontSize: 14, fontWeight: "700", textDecorationLine: "underline" },
});
