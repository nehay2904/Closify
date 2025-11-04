import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Button, Alert} from "react-native";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from "../constants/colors";

WebBrowser.maybeCompleteAuthSession();

export default function Sign_up({ navigation }) {
    const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Missing Fields", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://closify-server-1.onrender.com/register", {
        name: username,
        email,
        password,
      });

      console.log("✅ Registration success:", res.data);
      

      Alert.alert("Success", "Account created successfully!");
      await AsyncStorage.setItem("userEmail", email);
       navigation.replace("MainTabs"); 
    } catch (error) {
      console.error("❌ Registration error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
   
     <View style={styles.container}>
          <Text style={styles.logo}>💎</Text>
          <Text style={styles.title}>Welcome back, Gorgeous</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#888888ff"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#888888ff"
            value={username}
            onChangeText={setUsername}
          />
           <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#888888ff"
            value={password}
            onChangeText={setPassword}
          />
         <TouchableOpacity style={styles.mainButton} onPress={handleRegister}>
           <Text style={{ fontSize: 16}}>Sign Up </Text>
         </TouchableOpacity>
           <Text style={styles.footer}>
            New here?{" "}
            <Text style={styles.link}  onPress={() => navigation.navigate("Login")}> click here to Login</Text> 
      
          </Text>
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
