import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function Wishlist({ navigation }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "698ed558a5249413d1783c1b";

  useEffect(() => {
    fetchWishlist();
  }, []);

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

  const removeItem = async (productId) => {
    try {
      await axios.post(
        `https://closify-server-3.onrender.com/wishlist/remove`,
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

  if (loading) {
    return (
      <View style={{ marginTop: 120 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="arrow-back"
          size={26}
          color="#4A4A4A"
          onPress={() => navigation.navigate("MainTabs")}
        />
        <Text style={styles.headerText}>My Wishlist</Text>
        <MaterialIcons name="ios-share" size={22} color="#4A4A4A" />
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {wishlist.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            Your wishlist is empty
          </Text>
        ) : (
          wishlist.map((item) => (
            <View key={item._id} style={styles.card}>
              <ImageBackground
                source={{ uri: item.product_URL }}
                style={styles.image}
                imageStyle={{ borderRadius: 14 }}
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
    backgroundColor: "#f5f5f5af", // pastel green
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: "#F5F5F5"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A4A4A",
  },

  // Product grid
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
    borderRadius: 16,
    padding: 8,
    marginBottom: 14,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 190,
    borderRadius: 12,
    marginBottom: 8,
  },
  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 100,
    padding: 5,
  },
  brand: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4A4A4A",
  },
  name: {
    fontSize: 11,
    color: "#777",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4A4A4A",
    marginTop: 4,
  },
  addBtn: {
    backgroundColor: "#D6B4A8", // rose gold
    borderRadius: 8,
    paddingVertical: 6,
    marginTop: 6,
  },
  addText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  // Bottom navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    color: "#777",
  },
});
