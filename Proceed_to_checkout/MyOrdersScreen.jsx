import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
 const userId = "698ed558a5249413d1783c1b";
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");

    if (!userData) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(userData);

    const res = await axios.get(
      `https://closify-server-3.onrender.com/orders/${userId}`
    );

    console.log("ORDERS:", res.data);

    setOrders(res.data || []);
    setLoading(false);
   console.log("Stored user:", user);
  } catch (error) {
    console.log("Orders fetch error:", error);
    setLoading(false);
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
      
      {/* Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={22} color="#3D6655" />
        </TouchableOpacity>

        <Text style={styles.header}>My Orders</Text>

        <View style={{ width: 22 }} />
      </View>

      <ScrollView style={styles.scrollArea}>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>
            No orders placed yet 🛍️
          </Text>
        ) : (
          orders.map((order, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.orderId}>
                Order #{index + 1}
              </Text>

              <Text>Status: {order.status}</Text>

              <Text style={styles.total}>
                ₹{Number(order.totalAmount).toFixed(2)}
              </Text>
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
    backgroundColor: "#F1F8F5",
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3D6655",
    margin: 18,
  },
  scrollArea: {
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#6E8B7E",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3D6655",
  },
  status: {
    marginTop: 5,
    color: "#5A7C6C",
  },
  total: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#3D6655",
  },
});
