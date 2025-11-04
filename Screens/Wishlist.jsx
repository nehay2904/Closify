import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomTab from "../Navigation/Bottomnav";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";

export default function Wishlist({navigation}) {
  const products = [
    {
      id: 1,
      brand: "Aura London",
      name: "Floral Print Maxi Dress",
      price: "$129.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDX_5Ave6R1r5LmqdA69khQHlnpJ0DEPQ4gcsZlP3SmmDCBPTSjQGP3dKjefwh0kO1VjtfkS4iM1j7PGbKWUGsJwQdfW0zcTGNY2fKxHMCayT_8h6hwrEZ76vntpbetfjKUYptc3MeNot4QIozQBrTkwhXsxtoB-4EEB3mQcIDoIBfEs2g3kakjzrtZvzow0ELR1PzicBWs02fYztSa3e_3HQUJ4EbMhW5WohWeV2HqZP78J56W93a1pWvSgeL5_ZlEhdsSDUMTqjHe",
    },
    {
      id: 2,
      brand: "Vogue St.",
      name: "Classic Trench Coat",
      price: "$199.50",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAK7IvqOS7xTDeC6qU2Yoo8KXKj6dRJOiwQnFM7BvkAjkGqgxKp7WhClvgN5cdW-try7Ris4JZoW0EqwP3xL7UTmKbs48WH2IOGg4RniJk-ZMK_LEb_q46MFhT-cB3FA0NIfTAOrSu_zB7ua1ZV0inDhA4yGL7-mv3s0PDjaVikE0Kn82AG0JAzK7XHq25-1UblN1l-mxD1vNC9tmJbe6IVSQziGDYc14_-TyTCcWNlOzRZhAN_311luVEsi1vdwdYdWs1tOusR7zQs",
    },
    {
      id: 3,
      brand: "Elysian",
      name: "Rose Gold Handbag",
      price: "$85.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBdt9ZZFejJgmJGcjeX4oRYast6LPOMoiw1VsfpiMO5Tr_1hFJ9DKd3gkArPqQR4hXPkieHxqcxmmaVQMjGzHhtJLqL3TuImspkdWzDZQaHjlHP8kVKFPoLrPLSLvD1ecyc7RWOCDyCAg877rxWIa3lPtSGx_aWCMw1oPVok1hIl4XYaWjJkvrKswPzThEW9inJz1kdgx2ukDZ_2cnTKcSfjKT48E-FwXfTIUtk-QM0hOQOdQ0ku23slb-btdKxHikctJtwyuVP420Y",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={26} color="#4A4A4A" onPress={() => navigation.navigate("MainTabs")}/>
        <Text style={styles.headerText}>My Wishlist</Text>
        <MaterialIcons name="ios-share" size={22} color="#4A4A4A" />
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {products.map((item) => (
          <View key={item.id} style={styles.card}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
              imageStyle={{ borderRadius: 14 }}
            >
              <TouchableOpacity style={styles.favoriteBtn}>
                <MaterialIcons name="favorite" size={22} color="#D6B4A8" />
              </TouchableOpacity>
            </ImageBackground>

            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>

            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5af", // pastel green
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: "#F5F5F5"
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4A4A4A",
  },

  // Product grid
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
    paddingBottom: 100,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    marginBottom: 14,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 190,
    borderRadius: 12,
    marginBottom: 8,
  },
  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 100,
    padding: 5,
  },
  brand: {
    fontSize: 13,
    fontWeight: "600",
    color: "#4A4A4A",
  },
  name: {
    fontSize: 11,
    color: "#777",
  },
  price: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4A4A4A",
    marginTop: 4,
  },
  addBtn: {
    backgroundColor: "#D6B4A8", // rose gold
    borderRadius: 8,
    paddingVertical: 6,
    marginTop: 6,
  },
  addText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  // Bottom navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    color: "#777",
  },
});
