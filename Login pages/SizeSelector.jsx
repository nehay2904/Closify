import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const sizes = [
  {
    label: "XS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCO2cQDjkeHJhIvNabhKwV1pcqiQtf5SnTr8IfEV3vP5hc2sxbMyf06mwD6mhsqCsDXZTokTr17ogxldgvKMY3THXAci9HyxqmmlXPPSlxwrwi4D7IpN9Kw010H93p2dZn-v1ayP4yhVRR5lsyin4z3p3ySlcTponXWH7x0BFrgPoyF6PLRmxpbEq5XtE3PRFjFKHED-00Myz99SlAjU3UwmonD3XQv0ZgFcXEj9YzyimV5uc076Tt6QD8SU27W4wsxr33rs6b02ck",
  },
  {
    label: "S",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ9dRjRiw9MehTJNNcvC3mNNXoaZfFdlMewIH6ii9VsO6BqT_knIUAdFngAbHdAeFJMZn5dV_G-au842Xwn2RPjOLukMkJHc00qApZMh7tDGqzKuY2JTVylTQlZnqlFJF7wcIjrTYMD2POnlDaHY_9D0hCSBCIr36aq2QV_ibfidSSyAzzYyva7lMIRrIaGEWaI75uNfM8kD1dOu1iVKW-fkwDAi3b3tCYHu8PKxBWFFJ0nWPJtvfB3WFSoSVC7WuZGPusY9ugw98",
  },
  {
    label: "M",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-gT9zVYya5biTlxvVzKYzAfwlRcB6g9FmdyYSth1DpBP5J4BVy_-kSjIIlpD_YPyqLNevuU5ss8WWtXrfs-Tm-mfcY6ipR5HzizNItauPttsYcfCYUdorBqcrVTV3WBjqhZ_kSzb8jhNlGmuUoKRlVFPwJh_9ZybQ0k08XmLy_eAcSJDlj9PsEvIdfaf8C-Y9u2djxUvXoh6fmT743bF3ofh7UI7xFQp6i1pk95F8_Na0RxHppW6Xwq6BsW-ZBqWN57jOE",
  },
  {
    label: "L",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJMvMW_Gl2X0eo4izkA8uZlsO-pInW78M6k0WHDROlUqCQLqlFgMaIWKhKy_idx1hNv_woUqE_UVt8kgcybN37MIHTIBJ_xoWHfZi92yGHZU2-pHQuyUQ95k9BHr3N1mFLAqvrBYSP8V_OgDnNXCROYcmld1pQE6D1X-3jbqRaPKv6wORN6soGhfv_L5mbQvDtXBEc5wvsDaECbOMEzTnD0LdCiTHVbI8LoS8G44TaVK1gqhuIyIF8nyvoWqnJVdbT3kqUz6HBULo",
  },
  {
    label: "XL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADFqwEr0SkmVHE6FLH6mJX5KM83LP1yzpOScmpPa0LLrQW62SKMOHOIW665aYZAkRBU22artDrGLD7-_6j9quc_TUWSH67-BNtdSkYBOCAaaNiZXp6W1z9N9duaVJ6ozEDaRsFKgtktB8BTWvQbos8ldsCO7gJ3vF24TTuL1eSPwS3VwyI-urVVnvgbmWcVEpFLPDEdWr_t4b-zmQFjs_LdkPFQqWEvqwRRo_EZ5fllEFpxuAIkoyLH_47SWMm5srDFffNLLfpm1U",
  },
];

export default function SizeSelector({ navigation }) {
  const [selected, setSelected] = useState("M");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // ✅ Load userId + check saved size
  useEffect(() => {
    const init = async () => {
      const id = await AsyncStorage.getItem("userId");
      // const savedSize = await AsyncStorage.getItem("userSize");

      // if (savedSize) {
      //   navigation.replace("MainTabs"); // skip screen
      // }

      setUserId(id);
    };

    init();
  }, []);

  const handleContinue = async () => {
    if (!selected) {
      Alert.alert("Select Size", "Please choose a size");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User not found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://closify-server-3.onrender.com/update-size",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            size: selected,
          }),
        }
      );

      const data = await res.json();
      console.log("SERVER RESPONSE:", data);

      await AsyncStorage.setItem("userSize", selected);

      Alert.alert("Success", "Size saved successfully!");

      navigation.replace("MainTabs");
    } catch (err) {
      console.log("❌ Size error:", err);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Size</Text>
      <Text style={styles.subtitle}>
        Choose the avatar that best matches your body type
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {sizes.map((item, index) => {
          const isActive = selected === item.label;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelected(item.label)}
              activeOpacity={0.9}
              style={[
                styles.cardWrapper,
                isActive && styles.activeWrapper,
              ]}
            >
              <View
                style={[
                  styles.card,
                  isActive && styles.activeCard,
                ]}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                />
              </View>

              <Text
                style={[
                  styles.label,
                  isActive && styles.activeLabel,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleContinue}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Saving..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbf9f5",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    marginBottom: 30,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  cardWrapper: {
    width: width * 0.55,
    marginRight: 16,
    alignItems: "center",
  },
  activeWrapper: {
    transform: [{ scale: 1.05 }],
  },
  card: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    backgroundColor: "#eee",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeCard: {
    borderColor: "#ffccd5",
    backgroundColor: "#fff",
    elevation: 5,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  label: {
    marginTop: 10,
    fontWeight: "600",
    color: "#777",
  },
  activeLabel: {
    color: "#7c5357",
    fontWeight: "800",
    marginTop: 14,
  },
  button: {
    marginTop: "auto",
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7c5357",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});