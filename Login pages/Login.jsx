import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "../constants/colors";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ AUTO LOGIN CHECK
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        navigation.replace("MainTabs");
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true); // ✅ START LOADING HERE

      const res = await axios.post(
        "https://closify-server-1.onrender.com/login",
        { email, password }
      );

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      await AsyncStorage.setItem("userId", res.data.user._id);

      Alert.alert("Welcome", `Hello ${res.data.user.name}!`);

      navigation.replace("MainTabs"); // ✅ Navigate while loading is active
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false); // ✅ STOP LOADING
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>💎</Text>
      <Text style={styles.title}>Welcome back, Gorgeous</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.mainButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Text style={{ fontSize: 16 }}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.footer}>
        New here?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("sign_up")}
        >
          click here to sign up
        </Text>
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
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
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
    width: "60%",
    backgroundColor: Colors.primary,
    borderRadius: 13,
    padding: 10,
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
