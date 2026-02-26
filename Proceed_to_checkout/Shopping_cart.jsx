import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { CartContext } from "../Context/Cardcontext";

export default function ShoppingCart({ navigation }) {
  const { cartItems = [], setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  const userId = "698ed558a5249413d1783c1b";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `https://closify-server-3.onrender.com/cart/${userId}`
      );

      const { cart, products } = res.data;

      const formattedCart = cart.map((item) => {
        const product = products.find(
          (p) => p._id === item.productId
        );

        return {
          _id: product._id,
          name: product.ProductName,
          price: product.Price,
          image: product.product_URL,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        };
      });

      setCartItems(formattedCart);
      setLoading(false);
    } catch (error) {
      console.log("Cart fetch error:", error);
      setLoading(false);
    }
  };

  const increaseQuantity = (_id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (_id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === _id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = async (_id) => {
    try {
      await axios.post(
        `https://closify-server-3.onrender.com/cart/remove`,
        {
          userId: userId,
          productId: _id,
        }
      );

      setCartItems((items) =>
        items.filter((item) => item._id !== _id)
      );
    } catch (error) {
      console.log("Remove cart error:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  if (loading) {
    return (
      <View style={{ marginTop: 120 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      {/* EMPTY STATE */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>

          <Text style={styles.emptyTitle}>
            Ooh no! Your cart is empty
          </Text>

          <TouchableOpacity
            style={styles.shopNowBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.shopNowText}>
              Start Shopping
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
        >
          {cartItems.map((item) => (
            <View key={item._id} style={styles.card}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                  ₹{Number(item.price).toFixed(2)}
                </Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    onPress={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    <Text style={styles.qtyBtn}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    <Text style={styles.qtyBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => removeItem(item._id)}
              >
                <Text style={styles.delete}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>
              Order Summary
            </Text>

            <View style={styles.summaryRow}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>
                ₹{subtotal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.label}>
                Discount (10%)
              </Text>
              <Text style={styles.value}>
                -₹{discount.toFixed(2)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text
                style={[styles.label, { fontWeight: "700" }]}
              >
                Total
              </Text>
              <Text
                style={[styles.value, { fontWeight: "700" }]}
              >
                ₹{total.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() =>
                navigation.navigate(
                  "deliveryAddressScreen",
                  {
                    totalAmount: total,
                    cartItems: cartItems,
                  }
                )
              }
            >
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8F5",
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    color: "#3D6655",
    margin: 18,
  },

  /* EMPTY STATE */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 100,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D6655",
    marginBottom: 20,
    textAlign: "center",
  },
  shopNowBtn: {
    backgroundColor: "#A8D5BA",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 3,
  },
  shopNowText: {
    color: "#2E4D3E",
    fontSize: 16,
    fontWeight: "bold",
  },

  scrollArea: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3D6655",
  },
  price: {
    fontSize: 14,
    color: "#6E8B7E",
    marginVertical: 4,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  qtyBtn: {
    fontSize: 20,
    color: "#3D6655",
    borderWidth: 1,
    borderColor: "#A8D5BA",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  qtyText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#3D6655",
  },
  delete: {
    color: "#93BFA6",
    fontSize: 20,
    marginLeft: 10,
  },
  summary: {
    backgroundColor: "#EAF4EE",
    borderRadius: 16,
    padding: 16,
    marginVertical: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3D6655",
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    color: "#5A7C6C",
    fontSize: 15,
  },
  value: {
    color: "#3D6655",
    fontSize: 15,
  },
  checkoutBtn: {
    backgroundColor: "#A8D5BA",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 16,
    alignItems: "center",
  },
  checkoutText: {
    color: "#2E4D3E",
    fontSize: 16,
    fontWeight: "bold",
  },
});