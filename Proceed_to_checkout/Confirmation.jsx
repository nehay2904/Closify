import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OrderConfirmationScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const ringAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;

  // ✅ Calculate 5 days from today
  const today = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(today.getDate() + 5);

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    // Check bounce
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();

    // Expanding ring
    Animated.timing(ringAnim, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Text fade + slide
    Animated.timing(textAnim, {
      toValue: 1,
      duration: 1000,
      delay: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.softWave} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="close" size={24} color="#3D5A4D" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>SUCCESS</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Success Icon */}
        <View style={{ alignItems: "center", marginTop: 40 }}>
          {/* Expanding Ring */}
          <Animated.View
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "rgba(125,190,159,0.2)",
              transform: [
                {
                  scale: ringAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 2],
                  }),
                },
              ],
              opacity: ringAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 0],
              }),
            }}
          />

          {/* Check Bounce */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
            }}
          >
            <View style={styles.iconOuter}>
              <View style={styles.iconInner}>
                <MaterialIcons
                  name="check"
                  size={42}
                  color="#7DBE9F"
                />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Animated Text */}
        <Animated.View
          style={{
            opacity: textAnim,
            transform: [
              {
                translateY: textAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
            alignItems: "center",
          }}
        >
          <Text style={styles.title}>
            Thank you for choosing us
          </Text>

          <Text style={styles.subtitle}>
            Your order has been placed successfully.
          </Text>
        </Animated.View>

        {/* Order Reference */}
        <View style={styles.referenceBox}>
          <Text style={styles.referenceLabel}>ORDER REFERENCE</Text>
          <Text style={styles.referenceValue}>#NY-8829034</Text>
        </View>

        {/* Delivery Card */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryIcon}>
            <MaterialIcons name="schedule" size={20} color="#7DBE9F" />
          </View>
          <View>
            <Text style={styles.deliveryLabel}>
              EXPECTED DELIVERY
            </Text>
            <Text style={styles.deliveryDate}>
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={{ marginTop: 30 }}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>
              Track Your Order
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("MainTabs")}
          >
            <Text style={styles.secondaryButtonText}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomHandle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  softWave: {
    position: "absolute",
    top: -150,
    left: -100,
    width: width * 1.5,
    height: 300,
    backgroundColor: "#F2F9F5",
    borderRadius: 200,
    opacity: 0.6,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "600",
    color: "#3D5A4D",
    opacity: 0.6,
  },

  content: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 40,
  },

  iconOuter: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "rgba(125,190,159,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  iconInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(125,190,159,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontStyle: "italic",
    textAlign: "center",
    color: "#3D5A4D",
    marginTop: 30,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "rgba(61,90,77,0.6)",
    marginBottom: 30,
  },

  referenceBox: {
    alignItems: "center",
    marginBottom: 10,
  },

  referenceLabel: {
    fontSize: 11,
    letterSpacing: 2,
    color: "rgba(61,90,77,0.4)",
  },

  referenceValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3D5A4D",
  },

  deliveryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(242,249,245,0.7)",
    padding: 16,
    borderRadius: 20,
    marginTop: 20,
    width: "100%",
  },

  deliveryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  deliveryLabel: {
    fontSize: 11,
    letterSpacing: 1,
    fontWeight: "600",
    color: "rgba(61,90,77,0.4)",
  },

  deliveryDate: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3D5A4D",
  },

  primaryButton: {
    backgroundColor: "#7DBE9F",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 14,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "rgba(125,190,159,0.4)",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#7DBE9F",
    fontSize: 15,
    fontWeight: "600",
    paddingHorizontal:20
  },

  bottomHandle: {
    alignSelf: "center",
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(61,90,77,0.1)",
    marginBottom: 8
  },
});
