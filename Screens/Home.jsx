import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import axios from "axios";

const { width } = Dimensions.get("window");

const COLORS = {
  background: "#F8F5F2",
  gold: "#C6A75E",
  textDark: "#2E2A27",
  muted: "#8E8681",
  white: "#FFFFFF",
};

const heroImage =
  "https://i.pinimg.com/736x/16/28/b4/1628b40428d54907bca400dce0175f77.jpg";

const newArrivalImage =
  "https://assets.newme.asia/wp-content/uploads/2024/07/2812134426390f5a/NM-PRC-74-DRS-24-JUL-7789-WHITE(1).webp";

export default function Home({ navigation }) {
  const [dresses, setDresses] = useState([]);
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchDresses = async () => {
      const res = await axios.get(
        "https://closify-server-3.onrender.com/products/category/Women%20Dress"
      );
      setDresses(res.data);
    };

    const fetchShoes = async () => {
      const res = await axios.get(
        "https://closify-server-3.onrender.com/products/category/FOOTWEAR"
      );
      setShoes(res.data);
    };

    fetchDresses();
    fetchShoes();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>

        {/* GLASS HEADER */}
        <BlurView intensity={80} tint="light" style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={24} color={COLORS.textDark} />
          </TouchableOpacity>

          <Text style={styles.brand}>CHIC</Text>

          <TouchableOpacity onPress={() => navigation.navigate("wishlist")}>
            <MaterialIcons name="favorite-border" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
        </BlurView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 90, paddingBottom: 100 }}
        >

          {/* HERO */}
          <View style={styles.heroWrap}>
            <ImageBackground
              source={{ uri: heroImage }}
              style={styles.hero}
              imageStyle={{ borderRadius: 30 }}
            >
              <LinearGradient
                colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.55)"]}
                style={styles.heroOverlay}
              >
                <Text style={styles.heroSub}>Modern Collection</Text>
                <Text style={styles.heroTitle}>
                  Refined. Minimal. Timeless.
                </Text>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* TRENDING DRESSES */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Dresses</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dresses.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("productDetails", { id: item._id })
                  }
                >
                  <Image
                    source={{ uri: item.product_URL }}
                    style={styles.cardImage}
                  />
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {item.Description}
                  </Text>
                  <Text style={styles.cardPrice}>₹{item.Price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* NEW ARRIVAL FEATURE */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>New Arrival</Text>

            <TouchableOpacity
              style={styles.largeCard}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("Categories")}
            >
              <ImageBackground
                source={{ uri: newArrivalImage }}
                style={styles.largeImage}
                imageStyle={{ borderRadius: 28 }}
              >
                <View style={styles.largeOverlay}>
                  <Text style={styles.largeTitle}>
                    Satin Slip Dress
                  </Text>
                  <Text style={styles.largePrice}>
                    ₹4,990
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* SHOES SECTION */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Luxury Footwear</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {shoes.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("productDetails", { id: item._id })
                  }
                >
                  <Image
                    source={{ uri: item.product_URL }}
                    style={styles.cardImage}
                  />
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {item.Description}
                  </Text>
                  <Text style={styles.cardPrice}>₹{item.Price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F5F2",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8F5F2",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 20,
    zIndex: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor:
      Platform.OS === "android"
        ? "rgba(255,255,255,0.85)"
        : "transparent",
  },

  brand: {
    fontSize: 18,
    letterSpacing: 6,
    fontWeight: "700",
    color: "#2E2A27",
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
    }),
  },

  heroWrap: {
    marginHorizontal: 20,
    height: 460,
    borderRadius: 30,
    overflow: "hidden",
  },

  hero: { flex: 1 },

  heroOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  heroSub: {
    color: "#FFFFFF",
    fontSize: 12,
    letterSpacing: 3,
    marginBottom: 14,
    textTransform: "uppercase",
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
    fontWeight: "700",
  },

  section: {
    marginTop: 40,
  },

  sectionTitle: {
    fontSize: 20,
    marginLeft: 24,
    marginBottom: 20,
    fontWeight: "600",
    color: "#2E2A27",
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
    }),
  },

  card: {
    width: width * 0.55,
    marginLeft: 18,
  },

  cardImage: {
    width: "100%",
    height: width * 0.75,
    borderRadius: 22,
  },

  cardTitle: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "500",
    color: "#2E2A27",
  },

  cardPrice: {
    marginTop: 6,
    fontSize: 13,
    color: "#C6A75E",
    fontWeight: "600",
  },

  largeCard: {
    marginHorizontal: 20,
    height: 420,
    borderRadius: 28,
    overflow: "hidden",
  },

  largeImage: { flex: 1 },

  largeOverlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  largeTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },

  largePrice: {
    color: "#E8C77A",
    marginTop: 6,
    fontSize: 14,
  },
});