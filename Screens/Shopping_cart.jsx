import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Floral Dress",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
      quantity: 1,
    },
    {
      id: 2,
      name: "Summer Top",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
      quantity: 1,
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
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
        {cartItems.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                  <Text style={styles.qtyBtn}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Text style={styles.delete}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.label}>Discount (10%)</Text>
            <Text style={styles.value}>-${discount.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={[styles.label, { fontWeight: "700" }]}>Total</Text>
            <Text style={[styles.value, { fontWeight: "700" }]}>
              ${total.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
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
