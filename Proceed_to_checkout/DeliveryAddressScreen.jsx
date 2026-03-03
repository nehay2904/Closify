import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

export default function DeliveryAddressScreen({ navigation, route }) {
  const { totalAmount, cartItems } = route.params;

  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  const userId = "12345"; // ⚠️ MUST match the one used in AddAddressScreen

  // ✅ Refresh every time screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAddresses();
    });

    return unsubscribe;
  }, [navigation]);

  // ✅ Fetch Addresses
  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `https://closify-server-3.onrender.com/address/${userId}`
      );

      const data = await response.json();

      setAddresses(data);

      // ✅ Auto select first address
      if (data.length > 0) {
        setSelected(data[0]._id);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  const selectedAddress = addresses.find(
    (item) => item._id === selected
  );

  const addressData = selectedAddress || {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerBtn}>←</Text>
        <Text style={styles.headerTitle}>Delivery Address</Text>
        <Text style={styles.headerBtn}>⋯</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={styles.activeBar} />
          <View style={styles.activeBar} />
          <View style={styles.inactiveBar} />
        </View>

        {/* Section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>YOUR ADDRESSES</Text>
          <Text style={styles.savedText}>
            {addresses.length} SAVED
          </Text>
        </View>

        {/* Address List */}
        {addresses.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No addresses found
          </Text>
        ) : (
          addresses.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={[
                styles.card,
                selected === item._id && styles.selectedCard,
              ]}
              onPress={() => setSelected(item._id)}
            >
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.address}>{item.address}</Text>
                  <Text style={styles.phone}>{item.phone}</Text>
                </View>

                <View style={styles.radioOuter}>
                  {selected === item._id && (
                    <View style={styles.radioInner} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Add Address */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddAddressScreen")}
        >
          <Text style={styles.addText}>+ Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.summaryLabel}>Order Summary</Text>
          <Text style={styles.price}>
            ₹{totalAmount?.toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deliverBtn}
          onPress={() => {
            if (!selectedAddress) {
              Alert.alert("Error", "Please select an address");
              return;
            }

            navigation.navigate("paymentScreen", {
              totalAmount,
              cartItems,
              addressData,
            });
          }}
        >
          <Text style={styles.deliverText}>
            DELIVER TO THIS ADDRESS →
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  scroll: { padding: 20 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  headerBtn: { fontSize: 18 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  progressRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  activeBar: {
    flex: 1,
    height: 4,
    backgroundColor: "black",
    marginRight: 5,
  },

  inactiveBar: {
    flex: 1,
    height: 4,
    backgroundColor: "#ddd",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionTitle: { fontWeight: "bold" },
  savedText: { color: "gray" },

  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },

  selectedCard: {
    borderColor: "black",
    borderWidth: 2,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  address: {
    color: "gray",
    marginBottom: 5,
  },

  phone: {
    marginTop: 5,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },

  addBtn: {
    padding: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  addText: {
    fontWeight: "bold",
  },

  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: { color: "gray" },

  price: {
    fontSize: 18,
    fontWeight: "bold",
  },

  deliverBtn: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  deliverText: {
    color: "white",
    fontWeight: "bold",
  },
});