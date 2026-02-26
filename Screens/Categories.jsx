import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

export default function Categories({ navigation }) {
  const [selected, setSelected] = useState("dresses");
  const [dresses, setDresses] = useState([]);
  const [bags, setBags] = useState([]);
  const [footwear, setFootwear] = useState([]);

  useEffect(() => {
    axios.get("https://closify-server-3.onrender.com/products/women-dress")
      .then(res => setDresses(res.data));

    axios.get("https://closify-server-3.onrender.com/products/bags")
      .then(res => setBags(res.data));

    axios.get("https://closify-server-3.onrender.com/products/footwear")
      .then(res => setFootwear(res.data));
  }, []);

  const getData = () => {
    if (selected === "dresses") return dresses;
    if (selected === "bags") return bags;
    return footwear;
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* TITLE */}
      <Text style={styles.pageTitle}>Categories</Text>

      {/* GLASS TABS */}
      <BlurView intensity={40} tint="light" style={styles.tabsGlass}>
        <TabText title="Dresses" active={selected==="dresses"} onPress={() => setSelected("dresses")} />
        <TabText title="Bags" active={selected==="bags"} onPress={() => setSelected("bags")} />
        <TabText title="Footwear" active={selected==="footwear"} onPress={() => setSelected("footwear")} />
      </BlurView>

      {/* PRODUCT GRID */}
      <FlatList
        data={getData()}
        numColumns={2}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 14 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("productDetails", { id: item._id })}
          >
            <Image source={{ uri: item.product_URL }} style={styles.image} />
            <Text numberOfLines={1} style={styles.name}>{item.Description}</Text>
            <Text style={styles.price}>{item.Price}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

/* TEXT TAB */
const TabText = ({ title, active, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.tabText, active && styles.activeTab]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9F8",
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 10,
    letterSpacing: 0.5,
    color: "#1E2925",
  },

  /* Glass Tabs */
  tabsGlass: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 15,
    paddingVertical: 10,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  tabText: {
    fontSize: 16,
    color: "#678177",
    fontWeight: "500",
  },

  activeTab: {
    color: "#1E2925",
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  /* Product Cards */
  card: {
    width: width / 2 - 22,
    margin: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 190,
    borderRadius: 16,
  },

  name: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: "500",
  },

  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3,
  },
});