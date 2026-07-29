import { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorText from "@/components/ErrorText";
import { useAuthStore } from "@/store/useAuthStore";
import { colors } from "@/theme/colors";

export default function Register() {
  const register = useAuthStore((s) => s.register);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!fullName || !email || !password) {
      setError("Tous les champs sont requis");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      await register(fullName, email, password);
    } catch (err) {
      setError((err as any).response?.data?.error || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Feather name="arrow-left" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.brand}>Marhba</Text>
      </View>

      <Text style={styles.title}>Créer un compte</Text>
      <Text style={styles.subtitle}>Rejoignez Marhba en quelques secondes</Text>

      <Input
        label="Nom complet"
        placeholder="Salma Mirat"
        value={fullName}
        onChangeText={setFullName}
      />
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
        placeholder="min 6 caracteres"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        helperText="Minimum 6 caractères"
      />

      <ErrorText message={error} />

      <Button title="S'inscrire" onPress={handleRegister} loading={loading} />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Déjà un compte ? </Text>
        <Link href="/login" style={styles.link}>
          Se connecter
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.card },
  content: { padding: 24, paddingTop: 60, flexGrow: 1 },
  header: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 40 },
  brand: { color: colors.text, fontSize: 20, fontWeight: "700" },
  title: { color: colors.text, fontSize: 26, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: colors.subtext, fontSize: 14, marginBottom: 28 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: colors.subtext, fontSize: 14 },
  link: { color: colors.text, fontSize: 14, fontWeight: "700", textDecorationLine: "underline" },
});
