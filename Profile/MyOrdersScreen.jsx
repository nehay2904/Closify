import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function MyOrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

const fetchOrders = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId"); // ✅ dynamic user

    if (!token || !userId) {
      setLoading(false);
      return;
    }

    const res = await axios.get(
      `https://closify-server-3.onrender.com/orders/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data?.orders || []);
    setLoading(false);

  } catch (error) {
    setLoading(false);
  }
};


  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#2ecc71";
      case "Pending":
        return "#f39c12";
      case "Cancelled":
        return "#e74c3c";
      default:
        return "#888";
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff3f6c" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>MY ORDERS</Text>
          <Text style={styles.headerSubtitle}>Track, manage & review</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>You haven't placed any orders yet</Text>
        ) : (
          orders.map((order) => (
            <View key={order._id} style={styles.card}>
              <Image
                source={{
                  uri:
                    order.products?.[0]?.productId?.product_URL ||
                    "https://via.placeholder.com/150",
                }}
                style={styles.image}
              />

              <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>
                  {order.products?.[0]?.productId?.ProductName}
                </Text>

                <Text style={styles.total}>₹{order.totalAmount}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>

                <Text style={styles.date}>
                  Ordered on {new Date(order.createdAt).toDateString()}
                </Text>
              </View>
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
    backgroundColor: "#fdfdfd",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#111",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#777",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 120,
    fontSize: 16,
    color: "#999",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  image: {
    width: 110,
    height: 130,
    borderRadius: 15,
  },

  details: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
  },

  total: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 4,
    color: "#111",
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginVertical: 4,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  date: {
    fontSize: 11,
    color: "#888",
  }
});

// code is completed