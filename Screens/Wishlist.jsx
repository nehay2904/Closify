import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Wishlist({ navigation }) {
const [wishlist, setWishlist] = useState([]);
const [loading, setLoading] = useState(true);
const [userId, setUserId] = useState(null);


// Get userId
useEffect(() => {
  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    } catch (err) {
      console.log("UserId error:", err);
    }
  };

  getUserId();
}, []);


// Fetch wishlist when userId loads
useEffect(() => {
  if (userId) {
    fetchWishlist();
  }
}, [userId]);


const fetchWishlist = async () => {
  try {

    const res = await axios.get(
      `https://closify-server-3.onrender.com/wishlist/${userId}`
    );

    setWishlist(res.data);
    setLoading(false);

  } catch (err) {
    console.log("Wishlist fetch error:", err);
    setLoading(false);
  }
};


// Remove item
const removeItem = async (productId) => {
  try {

    await axios.post(
      "https://closify-server-3.onrender.com/wishlist/remove",
      {
        userId: userId,
        productId: productId,
      }
    );

    setWishlist((prev) =>
      prev.filter((item) => item._id !== productId)
    );

  } catch (err) {
    console.log("Remove error:", err);
  }
};


// Loader
if (loading) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#D6B4A8" />
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={28}
          color="#4A4A4A"
          onPress={() => navigation.navigate("MainTabs")}
        />
        <Text style={styles.headerText}>My Wishlist</Text>
        <MaterialIcons name="share" size={24} color="#4A4A4A" />
      </View>

      {/* Wishlist */}
      <ScrollView contentContainerStyle={styles.grid}>
        {wishlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/4076/4076549.png",
              }}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyTitle}>Your Wishlist is Empty 💖</Text>
            <Text style={styles.emptySubtitle}>
              Start adding your favorite luxury items and make it shine!
            </Text>
            <TouchableOpacity
              style={styles.shopBtn}
              onPress={() => navigation.navigate("MainTabs")}
            >
              <Text style={styles.shopBtnText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          wishlist.map((item) => (
            <View key={item._id} style={styles.card}>
              <ImageBackground
                source={{ uri: item.product_URL }}
                style={styles.image}
                imageStyle={{ borderRadius: 16 }}
              >
                <TouchableOpacity
                  style={styles.favoriteBtn}
                  onPress={() => removeItem(item._id)}
                >
                  <MaterialIcons name="favorite" size={22} color="red" />
                </TouchableOpacity>
              </ImageBackground>

              <Text style={styles.brand}>{item.Brand}</Text>
              <Text style={styles.name}>{item.Description}</Text>
              <Text style={styles.price}>₹{item.Price}</Text>

              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5", // pastel pink
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: "#F5F5F5",
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A4A4A",
    fontFamily: "sans-serif",
  },

  // Wishlist grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
    paddingBottom: 100,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 10,
    marginBottom: 16,
    shadowColor: "#D6B4A8",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 8,
  },
  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 50,
    padding: 6,
  },
  brand: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4A4A4A",
    marginTop: 4,
  },
  name: {
    fontSize: 12,
    color: "#8b8b8b",
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#4A4A4A",
    marginTop: 2,
  },
  addBtn: {
    backgroundColor: "#D6B4A8",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 8,
  },
  addText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  // Empty wishlist
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 180,
    height: 180,
    marginBottom: 20,
    tintColor: "#D6B4A8",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4A4A4A",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#8b8b8b",
    textAlign: "center",
    marginBottom: 20,
  },
  shopBtn: {
    backgroundColor: "#D6B4A8",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  shopBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
