import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { CartContext } from "../Context/Cardcontext";

const { width } = Dimensions.get("window");

export default function ProductDetails({ route, navigation }) {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { addToCart } = useContext(CartContext);
  const id = route?.params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://closify-server-3.onrender.com/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.Description,
      price: Number(product.Price),
      image: product.product_URL,
      quantity: 1,
      selectedSize,
      selectedColor,
    });

    setIsAdded(true);
  };

  if (!product) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#B76E79" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <Ionicons name="search-outline" size={26} />
          <Ionicons
            name="bag-outline"
            size={26}
            onPress={() => navigation.navigate("ShoppingCart")}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.product_URL }}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.brand}>
            {product.Brand || "Chic & Co."}
          </Text>

          <View style={styles.titleRow}>
            <Text style={styles.title}>
              {product.Description}
            </Text>
            <Text style={styles.price}>
              ₹{product.Price}
            </Text>
          </View>

          {/* Color */}
          {product.colors && (
            <>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorRow}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color },
                      selectedColor === color &&
                        styles.selectedColor,
                    ]}
                  />
                ))}
              </View>
            </>
          )}

          {/* Size */}
          {product.sizes && (
            <>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeRow}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.sizeButton,
                      selectedSize === size &&
                        styles.selectedSizeButton,
                    ]}
                  >
                    <Text
                      style={
                        selectedSize === size
                          ? styles.selectedSizeText
                          : styles.sizeText
                      }
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text style={styles.description}>
            {product.details || "No additional details available."}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {!isAdded ? (
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.heartButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "red" : "black"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cartButton}
              onPress={handleAddToCart}
            >
              <Text style={styles.cartText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.afterAddContainer}>
            <TouchableOpacity
              style={styles.addedBtn}
              disabled
            >
              <Text style={styles.addedText}>Added ✓</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.goToCartBtn}
              onPress={() =>
                navigation.navigate("MainTabs", {
  screen: "shopping-bag",
})

              }
            >
              <Text style={styles.goToCartText}>Go to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f6f6" },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },

  image: {
    width: width,
    height: 450,
  },

  info: {
    padding: 16,
  },

  brand: {
    color: "gray",
    marginBottom: 5,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "70%",
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
  },

  sectionTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
  },

  colorRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  colorCircle: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 12,
  },

  selectedColor: {
    borderWidth: 2,
    borderColor: "#B76E79",
  },

  sizeRow: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
  },

  sizeButton: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  selectedSizeButton: {
    backgroundColor: "#f9b9c9",
    borderColor: "#f9b9c9",
  },

  sizeText: { color: "gray" },

  selectedSizeText: {
    color: "black",
    fontWeight: "bold",
  },

  description: {
    marginTop: 10,
    color: "gray",
    lineHeight: 20,
  },

  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  heartButton: {
    width: 55,
    height: 55,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#fff",
  },

  cartButton: {
    flex: 1,
    backgroundColor: "#B76E79",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  cartText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  afterAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  addedBtn: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 8,
  },

  goToCartBtn: {
    flex: 1,
    backgroundColor: "#B76E79",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
  },

  addedText: {
    fontWeight: "bold",
    color: "black",
  },

  goToCartText: {
    fontWeight: "bold",
    color: "white",
  },
});
