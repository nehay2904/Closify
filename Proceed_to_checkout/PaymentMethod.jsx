import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen({navigation, route}) {
  const [selected, setSelected] = useState("apple");
  const { totalAmount = 0, cartItems, addressData } = route.params;


  const PaymentOption = ({ id, title, subtitle }) => (
    <TouchableOpacity
      style={[
        styles.option,
        selected === id && styles.selectedOption,
      ]}
      onPress={() => setSelected(id)}
    >
      <View>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.optionSub}>{subtitle}</Text>
        )}
      </View>

      <View style={styles.radioOuter}>
        {selected === id && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FDFCFB" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>

        {/* Header */}
        <Text style={styles.header}>Checkout</Text>

        {/* Total Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>₹{totalAmount?.toFixed(2)}</Text>
        </View>

        {/* Digital Express */}
        <Text style={styles.sectionTitle}>DIGITAL EXPRESS</Text>

        <PaymentOption
          id="apple"
          title="Apple Pay"
          subtitle="One-tap secure payment"
        />

        <PaymentOption
          id="upi"
          title="UPI / Digital Wallets"
          subtitle="GPay, PhonePe & others"
        />

        {/* Cards */}
        <Text style={styles.sectionTitle}>CREDIT & DEBIT CARDS</Text>

        <PaymentOption
          id="card1"
          title="•••• •••• •••• 4242"
          subtitle="Exp 12/26"
        />

        <TouchableOpacity style={styles.addCardBtn}>
          <Text style={{ color: "#D4A373", fontWeight: "600" }}>
            + Add New Card
          </Text>
        </TouchableOpacity>

        {/* Other */}
        <Text style={styles.sectionTitle}>OTHER METHODS</Text>

        <PaymentOption
          id="netbanking"
          title="Net Banking"
        />

      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn}  onPress={() => navigation.navigate("reviewOrderScree", {
  totalAmount,
  cartItems,
  addressData,
  paymentMethod: selected
})}>
          <Text style={styles.payText}>
            COMPLETE PAYMENT 🔒
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  totalCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#eee",
  },
  totalLabel: {
    fontSize: 12,
    color: "#777",
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#4A5D54",
  },
  option: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    borderColor: "#D4A373",
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  optionSub: {
    fontSize: 11,
    color: "#777",
    marginTop: 2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D4A373",
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D4A373",
  },
  addCardBtn: {
    padding: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  payBtn: {
    backgroundColor: "#D4A373",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  payText: {
    color: "#fff",
    fontWeight: "700",
    letterSpacing: 1,
  },
});
