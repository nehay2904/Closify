import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DeliveryAddressScreen({ navigation, route }) {
  const [selected, setSelected] = useState("home");
  const { totalAmount, cartItems } = route.params;

  // ✅ ADD THIS OBJECT HERE (before return)
  const addressData = {
    type: selected,
    name: "Neha Yednurwar",
    address:
      selected === "home"
        ? "FH1 savitri nagar , urja nagar colony, Raigarh 496107"
        : "Qtr no 21/6 sasti wcl colony, rajura 442905",
    phone: "9370672015",
  };

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

        {/* Section Title */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>YOUR ADDRESSES</Text>
          <Text style={styles.savedText}>2 SAVED</Text>
        </View>

        {/* Address Card 1 */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === "home" && styles.selectedCard,
          ]}
          onPress={() => setSelected("home")}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.name}>Neha Yednurwar</Text>
              <Text style={styles.address}>
                FH1 savitri nagar , urja nagar colony{"\n"}
                Raigarh 496107
              </Text>
            </View>

            <View style={styles.radioOuter}>
              {selected === "home" && <View style={styles.radioInner} />}
            </View>
          </View>

          <Text style={styles.phone}>9370672015</Text>
        </TouchableOpacity>

        {/* Address Card 2 */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === "office" && styles.selectedCard,
          ]}
          onPress={() => setSelected("office")}
        >
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.name}>Neha Yednurwar</Text>
              <Text style={styles.address}>
                Qtr no 21/6 sasti wcl colony{"\n"}
                rajura 442905
              </Text>
            </View>

            <View style={styles.radioOuter}>
              {selected === "office" && <View style={styles.radioInner} />}
            </View>
          </View>

          <Text style={styles.phone}>9370672015</Text>
        </TouchableOpacity>

        {/* Add Address Button */}
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addText}>+ Add New Address</Text>
        </TouchableOpacity>

        {/* Map Image */}
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA18P1ZoMDZ4YvUqVpuH5eALzi95f22VkNe-bnNKjFfsn271oOmtg-qTghOG7XqhRvhhG-mUJRLW1EeudzdnMDKLmVQY0V7BlI250n5U2zZFfEGSpAgWpl2_Y2QWojRh-Jjpd81ZMLwNMT3B0A817eFctoj-3M8_VF0PshvsvIDNH5dOVDRymtk3Q-X4n-uVP-CaM_9bOvZ0exzZZQDwA5pW7_3mztosaSZeRPzUZjAbhcgpuAhER1TXBMNyUoZZjrk-mfAzvvhH59W",
          }}
          style={styles.map}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.summaryLabel}>Order Summary</Text>
          <Text style={styles.price}>₹{totalAmount?.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.deliverBtn}
          onPress={() =>
            navigation.navigate("paymentScreen", {
              totalAmount,
              cartItems,
              addressData, // ✅ now defined properly
            })
          }
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
  container: {
    flex: 1,
    backgroundColor: "#F8FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerBtn: {
    fontSize: 18,
  },
  scroll: {
    padding: 16,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  activeBar: {
    width: 40,
    height: 4,
    backgroundColor: "#A5D6A7",
    marginHorizontal: 4,
    borderRadius: 4,
  },
  inactiveBar: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 4,
    borderRadius: 4,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#888",
  },
  savedText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedCard: {
    borderColor: "#E2B49A",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "600",
    marginBottom: 4,
  },
  address: {
    color: "#666",
    fontSize: 13,
  },
  phone: {
    marginTop: 10,
    color: "#888",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E2B49A",
  },
  addBtn: {
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  addText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  map: {
    width: "100%",
    height: 150,
    borderRadius: 16,
    marginBottom: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#888",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  deliverBtn: {
    backgroundColor: "#A5D6A7",
    padding: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  deliverText: {
    color: "#fff",
    fontWeight: "700",
  },
});
