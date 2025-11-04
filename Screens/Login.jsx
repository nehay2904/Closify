import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Button} from "react-native";

export default function LoginScreen({navigation}) {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💎</Text>
      <Text style={styles.title}>Hello, Gorgeous</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email or mobile number"
        placeholderTextColor="#888888ff"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
        <Text style={styles.mainButton}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.or}>or</Text>

      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        By continuing, you agree to our{" "}
        <Text style={styles.link}>Terms</Text> &{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfffeff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: { fontSize: 46, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dbe6e2ff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
  },
  mainButton: {
    width: "100%",
    backgroundColor: "#79b38cff",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  btnText: { color: "#24624fff", fontWeight: "bold", fontSize: 16 },
  or: { color: "#888", marginVertical: 10 },
  socialBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e6dbde",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 8,
  },
  socialText: { color: "#333", fontWeight: "bold" },
  footer: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 30,
  },
  link: { textDecorationLine: "underline", color: "#333" },
});
