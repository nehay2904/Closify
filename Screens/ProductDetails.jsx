import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { CartContext } from "../Context/Cardcontext";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function ProductDetails({ route, navigation }) {
const { addToCart } = useContext(CartContext);

const id = route?.params?.id;

const [product, setProduct] = useState(null);
const [isAdded, setIsAdded] = useState(false);
const [isFavorite, setIsFavorite] = useState(false);

const [stylistData, setStylistData] = useState(null);
const [stylistLoading, setStylistLoading] = useState(false);

const [userId, setUserId] = useState(null);


// Get logged in userId
useEffect(() => {
  const getUserId = async () => {
    try {
      const storedId = await AsyncStorage.getItem("userId");
      setUserId(storedId);
    } catch (err) {
      console.log("UserId error:", err);
    }
  };

  getUserId();
}, []);


// Fetch product
useEffect(() => {
  const fetchProduct = async () => {
    try {
      if (!id) return;

      const res = await axios.get(
        `https://closify-server-3.onrender.com/products/${id}`
      );

      setProduct(res.data);
    } catch (err) {
      console.log("Product fetch error:", err);
    }
  };

  fetchProduct();
}, [id]);


// Reset AI when product changes
useEffect(() => {
  setStylistData(null);
}, [id]);


// Generate AI outfit
const generateOutfit = async () => {
  try {
    if (!product) return;

    setStylistLoading(true);

    const res = await axios.post(
      "https://closify-server-3.onrender.com/ai-stylist",
      {
        productId: product.product_id,
      }
    );

    setStylistData(res.data);

  } catch (err) {
    console.log("AI error:", err);
  } finally {
    setStylistLoading(false);
  }
};


// Check wishlist
useEffect(() => {
  const checkWishlist = async () => {
    try {

      if (!userId || !id) return;

      const res = await axios.get(
        `https://closify-server-3.onrender.com/wishlist/${userId}`
      );

      const exists = res.data.some((item) => item._id === id);

      setIsFavorite(exists);

    } catch (err) {
      console.log("Wishlist check error:", err);
    }
  };

  checkWishlist();
}, [id, userId]);


// Add or remove wishlist
const handleWishlist = async () => {
  try {

    if (!userId || !product) return;

    if (isFavorite) {

      await axios.post(
        "https://closify-server-3.onrender.com/wishlist/remove",
        {
          userId,
          productId: product._id,
        }
      );

      setIsFavorite(false);

    } else {

      await axios.post(
        "https://closify-server-3.onrender.com/wishlist/add",
        {
          userId,
          productId: product._id,
        }
      );

      setIsFavorite(true);
    }

  } catch (error) {
    console.log("Wishlist error:", error);
  }
};


// Add to cart
const handleAddToCart = async () => {
  try {

    if (!userId) {
      console.log("User not logged in");
      return;
    }

    if (!product?._id) {
      console.log("Product ID missing");
      return;
    }

    await axios.post(
      "https://closify-server-3.onrender.com/cart/add",
      {
        userId,
        productId: product._id,
        quantity: 1,
      }
    );

    addToCart({
      _id: product._id,
      name: product.ProductName,
      price: Number(product.Price),
      image: product.product_URL,
      quantity: 1,
    });

    setIsAdded(true);

  } catch (err) {
    console.log("Cart Error:", err.response?.data || err.message);
  }
};


// Loader
if (!product) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#B76E79" />
    </View>
  );
}


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.product_URL }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.brand}>{product.BrandName || "Closify"}</Text>

          <Text style={styles.title}>{product.ProductName}</Text>

          <Text style={styles.price}>₹{product.Price}</Text>

          <Text style={styles.sectionTitle}>Product Details</Text>

          <Text style={styles.description}>
            {product.Description || "Premium quality fashion piece."}
          </Text>
      
      
          {/* AI STYLIST */} {product.Category === "Women Dress" && (
          <View style={styles.aiSection}>
            <View style={styles.aiHeader}>
              <Ionicons name="sparkles" size={18} color="#B76E79" />
              <Text style={styles.aiTitle}>AI Stylist</Text>
            </View>

            {!stylistData && !stylistLoading && (
              <TouchableOpacity
                style={styles.generateBtn}
                onPress={generateOutfit}
              >
                <Text style={styles.generateText}>
                  Generate Outfit Suggestion
                </Text>
              </TouchableOpacity>
            )}

            {stylistLoading && (
              <ActivityIndicator size="small" color="#B76E79" />
            )}

            {stylistData && (
              <View style={styles.aiCard}>
                <Text style={styles.aiNote}>
                  {stylistData.stylistNote}
                </Text>

                <View style={styles.outfitRow}>
                  {/* FOOTWEAR */}
                 <TouchableOpacity
  style={styles.outfitItem}
  onPress={() =>
    navigation.push("productDetails", {
      id: stylistData.outfit.footwear.item._id,
    })
  }
>
  <Image
    source={{
      uri: stylistData.outfit.footwear.product_URL,
    }}
    style={styles.outfitImage}
  />
  <Text numberOfLines={1} style={styles.outfitName}>
    {stylistData.outfit.footwear.ProductName}
  </Text>
</TouchableOpacity>

                  {/* BAG */}
                  <TouchableOpacity
  style={styles.outfitItem}
  onPress={() =>
    navigation.push("productDetails", {
      id: stylistData.outfit.bag.item._id,
    })
  }
>
  <Image
    source={{
      uri: stylistData.outfit.bag.product_URL,
    }}
    style={styles.outfitImage}
  />
  <Text numberOfLines={1} style={styles.outfitName}>
    {stylistData.outfit.bag.ProductName}
  </Text>
</TouchableOpacity>
                </View>
              </View>
            )}
          </View> )}
        </View>
      </ScrollView>

      {/* Footer */}
    <View style={styles.footer}> 
      {!isAdded ? ( <View style={styles.footerRow}> 
        <TouchableOpacity style={styles.heartButton} onPress={handleWishlist} > 
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "red" : "black"} /> </TouchableOpacity>
           <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart} > <Text style={styles.cartText}>Add to Bag</Text>
            </TouchableOpacity> </View> ) : ( <View style={styles.afterAddContainer}> <TouchableOpacity style={styles.addedBtn} disabled> <Text style={styles.addedText}>Added ✓</Text> </TouchableOpacity> <TouchableOpacity style={styles.goToCartBtn} onPress={() => navigation.navigate("MainTabs", { screen: "shopping-bag", }) } > <Text style={styles.goToCartText}>Go to Cart</Text> </TouchableOpacity> </View> )} </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 420,
  },

  info: {
    padding: 20,
  },

  brand: {
    fontSize: 13,
    color: "#888",
    letterSpacing: 1,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 6,
  },

  price: {
    fontSize: 20,
    color: "#B76E79",
    marginTop: 5,
  },

  sectionTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },

  description: {
    marginTop: 8,
    color: "#666",
    lineHeight: 20,
  },

  aiSection: {
    marginTop: 30,
  },

  aiHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },

  aiTitle: {
    fontWeight: "600",
    fontSize: 16,
  },

  generateBtn: {
    backgroundColor: "#B76E79",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  generateText: {
    color: "#fff",
    fontWeight: "600",
  },

  aiCard: {
    backgroundColor: "#fafafa",
    borderRadius: 14,
    padding: 16,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  aiNote: {
    fontStyle: "italic",
    color: "#555",
    marginBottom: 12,
  },

  outfitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  outfitItem: {
    width: width * 0.42,
    marginHorizontal: 7
  },

  outfitImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },

  outfitName: {
    marginTop: 5,
    fontSize: 13,
  },

footer: {
  padding: 18,
  borderTopWidth: 1,
  borderColor: "#eee",
  backgroundColor: "#fff",
},

footerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},

heartButton: {
  width: 55,
  height: 55,
  borderRadius: 14,
  backgroundColor: "#f8f8f8",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
},

cartButton: {
  flex: 1,
  marginLeft: 12,
  backgroundColor: "#000",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
},

cartText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "600",
  letterSpacing: 0.5,
},

afterAddContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
},

addedBtn: {
  flex: 1,
  backgroundColor: "#E8F5E9",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  marginRight: 10,
},

addedText: {
  color: "#2E7D32",
  fontWeight: "600",
  fontSize: 15,
},

goToCartBtn: {
  flex: 1,
  backgroundColor: "#000",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
},

goToCartText: {
  color: "#fff",
  fontWeight: "600",
  fontSize: 15,
},
});