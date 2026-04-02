import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { CartContext } from "../Context/Cardcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ReviewOrderScreen({ navigation, route }) {
  const {
    cartItems = [],
    addressData,
    totalAmount = 0,
    paymentMethod,
  } = route.params || {};

  const { setCartItems } = useContext(CartContext);

  const grandTotal = totalAmount;

const userId =  AsyncStorage.getItem("userId");
// 
const placeOrder = async () => {
  try {

    const userId = await AsyncStorage.getItem("userId"); // ✅ get real id

    const orderData = {
      userId,
      products: cartItems,
      totalAmount,
    };

    console.log("Sending Order:", orderData);

    const res = await axios.post(
      "https://closify-server-3.onrender.com/order/place",
      orderData
    );

    console.log("Order success:", res.data);
    navigation.navigate("orderConfirmationScreen");

  } catch (error) {
    console.log("Order error:", error.response?.data || error.message);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#2d4a3e" />
        </TouchableOpacity>

        <Text style={styles.title}>Review Order</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Bag Details</Text>

        {cartItems.map((item) => (
          <View key={item._id} style={styles.itemRow}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.itemInfo}>
              <Text style={styles.productName}>{item.name}</Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.qty}>Qty {item.quantity}</Text>
              </View>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Delivery To</Text>
        <Text style={styles.deliveryLabel}>{addressData?.type}</Text>
        <Text style={styles.deliveryText}>{addressData?.address}</Text>
        <Text>{addressData?.phone}</Text>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Text>{paymentMethod}</Text>

        <Text style={styles.sectionTitle}>Total Summary</Text>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{grandTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalAmount}>₹{grandTotal.toFixed(2)}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={placeOrder}>
          <Text style={styles.payText}>Confirm & Pay</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.payAmount}>₹{grandTotal.toFixed(2)}</Text>
            <MaterialIcons
              name="arrow-forward"
              size={20}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2d4a3e",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 25,
    marginBottom: 10,
    color: "#2d4a3e",
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  productImage: {
    width: 90,
    height: 120,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
  },
  productDetails: {
    fontSize: 12,
    color: "#888",
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 14,
  },
  qty: {
    fontSize: 12,
    color: "#888",
  },
  deliveryLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
  deliveryText: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cardBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  cardText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  cardNumber: {
    fontSize: 13,
    color: "#777",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  summaryLabel: {
    color: "#777",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    color: "#2d4a3e",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "white",
  },
  payButton: {
    backgroundColor: "#2d4a3e",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  payText: {
    color: "white",
    fontWeight: "600",
  },
  payAmount: {
    color: "white",
    opacity: 0.8,
  },
});
