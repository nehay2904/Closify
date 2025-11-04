import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet , Button} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function Auth({ navigation }) {
    const [text, setText] = useState("");
  // 1️⃣ Create the auth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "1095714555219-p555htrn8rm7ii6m4icpmr6rqikgcmhg.apps.googleusercontent.com",
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "1095714555219-p555htrn8rm7ii6m4icpmr6rqikgcmhg.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  });

  // 2️⃣ Handle the sign-in response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("✅ Google Login Success");
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  // 3️⃣ Fetch user info from Google API
  const getUserInfo = async (token) => {
    try {
      const res = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("👤 User Info:", res.data);

      // Save user data locally
      await AsyncStorage.setItem("@user", JSON.stringify(res.data));

      // ✅ Redirect to mainTabs after login
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });

    } catch (err) {
      console.error("❌ Error fetching user info:", err);
    }
  };

  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text style={{ fontSize: 18, marginBottom: 20 }}>Login with Google</Text>
    //   <Button
    //     title="Login with Google"
    //     onPress={() => {
    //       if (request) promptAsync();
    //       else console.log("⚠️ Google request not ready yet");
    //     }}
    //   />
    // </View>
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
            <Button style={styles.mainButton} title="Login with Google"
             onPress={() => {
             if (request) promptAsync();
             else console.log("⚠️ Google request not ready yet");
             }}
           />
         
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
    backgroundColor: "#2f7847ff",
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
