import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

export default function ChicModernLaunchScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.6],
  });

  return (
    <View style={styles.container}>
      {/* LEFT SIDE */}
      <View style={styles.leftSide} />

      {/* RIGHT SIDE IMAGE */}
      <View style={styles.rightSide}>
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/736x/12/26/23/1226235683655c32f8869f4b212bebd3.jpg",
          }}
          style={styles.image}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.2)"]}
            style={styles.gradient}
          />
        </ImageBackground>
      </View>

      {/* CENTER CONTENT */}
      <Animated.View
        style={[styles.centerContent, { opacity: fadeAnim }]}
      >
        <BlurView intensity={50} tint="light" style={styles.logoWrapper}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>CM</Text>
          </View>
        </BlurView>

        <Text style={styles.title}>
          Chic<Text style={styles.titleItalic}>Modern</Text>
        </Text>

        <BlurView intensity={30} tint="light" style={styles.tagWrapper}>
          <Text style={styles.tagline}>
            STYLE THAT SPEAKS SOFTLY
          </Text>
        </BlurView>
      </Animated.View>

      {/* PROGRESS BAR */}
      <View style={styles.progressContainer}>
        <Animated.View
          style={[styles.progressBar, { width: progressWidth }]}
        />
      </View>

      {/* BOTTOM TEXT */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          PREMIUM COLLECTION 2024
        </Text>
      </View>

      {/* Accent Bar */}
      <View style={styles.accentBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f9f7f2",
  },
  leftSide: {
    width: width / 2,
    backgroundColor: "#f9f7f2",
  },
  rightSide: {
    width: width / 2,
  },
  image: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  centerContent: {
    position: "absolute",
    top: height / 3,
    width: "100%",
    alignItems: "center",
  },
  logoWrapper: {
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#d1e7dd",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  logoText: {
    fontSize: 28,
    fontStyle: "italic",
    color: "#1a1a1a",
  },
  title: {
    fontSize: 42,
    fontWeight: "300",
    color: "#1a1a1a",
  },
  titleItalic: {
    fontStyle: "italic",
  },
  tagWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
  },
  tagline: {
    fontSize: 10,
    letterSpacing: 3,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  progressContainer: {
    position: "absolute",
    bottom: 100,
    width: width * 0.6,
    height: 4,
    backgroundColor: "#ddd",
    alignSelf: "center",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#d1e7dd",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },
  bottomText: {
    fontSize: 9,
    letterSpacing: 5,
    color: "#6b7280",
    opacity: 0.6,
  },
  accentBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width / 4,
    height: 4,
    backgroundColor: "#d1e7dd",
  },
});