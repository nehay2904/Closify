
import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { CartContext } from "../Context/Cardcontext"; // make sure name is correct

export default function ShoppingCart({navigation}) {
  const { cartItems = [], setCartItems } = useContext(CartContext);

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

  const removeItem = (_id) => {
    setCartItems((items) =>
      items.filter((item) => item._id !== _id)
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  const discount = subtotal * 0.1;
  const total = subtotal - discount;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>

      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        {/* Empty Cart Message */}
        {cartItems.length === 0 && (
          <Text style={styles.emptyText}>
            Your cart is empty 🛍️
          </Text>
        )}

        {/* Cart Items */}
        {cartItems.map((item) => (
          <View key={item._id} style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>
                {Number(item.price).toFixed(2)}
              </Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  onPress={() => decreaseQuantity(item._id)}
                >
                  <Text style={styles.qtyBtn}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => increaseQuantity(item._id)}
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

        {/* Order Summary */}
        {cartItems.length > 0 && (
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

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate("deliveryAddressScreen", { totalAmount: total , cartItems: cartItems})}>
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8F5", // soft pastel green background
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "left",
    color: "#3D6655", // deep pastel green
    margin: 18,
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
