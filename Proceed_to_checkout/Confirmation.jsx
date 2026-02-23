import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function OrderConfirmationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Soft Background Shape */}
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
        {/* Success Icon */}
        <View style={styles.iconWrapper}>
          <View style={styles.iconOuter}>
            <View style={styles.iconInner}>
              <MaterialIcons
                name="check-circle"
                size={42}
                color="#7DBE9F"
              />
            </View>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Thank you for choosing us
        </Text>

        <Text style={styles.subtitle}>
          Your order has been placed successfully. We're getting your wardrobe upgrade ready.
        </Text>

        {/* Order Reference */}
        <View style={styles.referenceBox}>
          <Text style={styles.referenceLabel}>ORDER REFERENCE</Text>
          <Text style={styles.referenceValue}>#NY-8829034</Text>
        </View>

        {/* Product Preview Scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: 20 }}
        >
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKuhrKW6s-gUpyQvWLhYxJPUijrAo-B6X_B-hE3oDLUKrpBiYrxzxowl44PTjO3AzD0JZZI8inZkY4T_l4rCHdNpQ4F-sQscRNOu4LD215wSZocX-XraV6-CCBAanAwHb3mpZmhGtXNKTvGZzYAaLcosJPrdwJEi-oEFU7my9FBUHRMScxH2MAfkFwjj8x2u-IgVeskAibqRUTaJrroWvUgk8E8-4_ShDjYS2XQaYALQQpV-Qbfxtqk_TJkqzZRE2iXJ2aV3PEOKfr",
            }}
            style={styles.previewImage}
          />
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjm3kKBp2dQzLeKLjEVBDp52jhV_OCbznoWRcGff3F1fmysUJoP5pMNWq0QnaRh9l-vpXqkhVsffuWpmG4bKZjG0fJrueTdX69UyTmUGrdr3TVlIqWLdkyFItoz5lPaxNcha35_xqzX_5uItwKX55Jhg6BgyaFTWBBERy3UCFXHDqoEdDrvlyVGP0g--DPRUaLdLgF5nmC3aRum3S8XcrQ6dBuLtun9-p4kI123c-u4_nxwWvcl6jdKIaAWUn7bHxpxu0TNFudALa6",
            }}
            style={styles.previewImage}
          />
          <View style={styles.moreBox}>
            <Text style={styles.moreText}>+2</Text>
          </View>
        </ScrollView>

        {/* Delivery Box */}
        <View style={styles.deliveryCard}>
          <View style={styles.deliveryIcon}>
            <MaterialIcons name="schedule" size={20} color="#7DBE9F" />
          </View>
          <View>
            <Text style={styles.deliveryLabel}>
              EXPECTED DELIVERY
            </Text>
            <Text style={styles.deliveryDate}>
              October 24 — 28, 2024
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

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Bottom Handle */}
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

  iconWrapper: {
    marginTop: 40,
    marginBottom: 30,
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
    fontSize: 28,
    fontStyle: "italic",
    textAlign: "center",
    color: "#3D5A4D",
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

  previewImage: {
    width: 70,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },

  moreBox: {
    width: 70,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(125,190,159,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  moreText: {
    color: "#7DBE9F",
    fontWeight: "600",
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
  },

  bottomHandle: {
    alignSelf: "center",
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(61,90,77,0.1)",
    marginBottom: 8,
  },
});
