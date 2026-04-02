import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function Categories({ navigation }) {
  const [selected, setSelected] = useState("dresses");
  const [dresses, setDresses] = useState([]);
  const [bags, setBags] = useState([]);
  const [footwear, setFootwear] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    axios.get("https://closify-server-3.onrender.com/products/category/Women%20Dress")
      .then(res => setDresses(res.data));

    axios.get("https://closify-server-3.onrender.com/products/category/BAGS")
      .then(res => setBags(res.data));

    axios.get("https://closify-server-3.onrender.com/products/category/FOOTWEAR")
      .then(res => setFootwear(res.data));
    axios.get("https://closify-server-3.onrender.com/products/category/Top")
      .then(res => setTopPicks(res.data));
  }, []);

  const getData = () => {
    if (selected === "dresses") return dresses;
    if (selected === "bags") return bags;
    if (selected === "footwear") return footwear;
    return topPicks;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.brand}>CLOSIFY</Text>
          <Text style={styles.tagline}>Choose your outfit</Text>
        </View>

        {/* CATEGORY SELECTOR */}
        <View style={styles.tabs}>
          {["Dresses", "Bags", "Footwear", "Top Picks"].map((item) => {
            const key = item.toLowerCase();
            const active = selected === key;

            return (
              <TouchableOpacity key={item} onPress={() => setSelected(key)}>
                <Text style={[styles.tabText, active && styles.activeTab]}>
                  {item}
                </Text>
                {active && <View style={styles.underline} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PRODUCT GRID */}
        <FlatList
          data={getData()}
          numColumns={2}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("productDetails", { id: item._id })
              }
            >
              <Image
                source={{ uri: item.product_URL }}
                style={styles.image}
              />
              <Text numberOfLines={1} style={styles.name}>
                {item.Description}
              </Text>
              <Text style={styles.price}>₹ {item.Price}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EF", // soft luxury beige
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 30,
  },

  brand: {
    fontSize: 34,
    fontWeight: "600",
    letterSpacing: 6,
    textAlign: "center",
    fontFamily: "serif",
  },

  tagline: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
    letterSpacing: 2,
    color: "#7A7A7A",
  },

  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },

  tabText: {
    fontSize: 15,
    letterSpacing: 1,
    color: "#999",
    paddingBottom: 8,
  },

  activeTab: {
    color: "#000",
    fontWeight: "600",
  },

  underline: {
    height: 1,
    backgroundColor: "#000",
    marginTop: 4,
  },

  card: {
    width: width / 2 - 30,
    marginBottom: 30,
    marginHorizontal:10
  },

  image: {
    width: "100%",
    height: 230,
    borderRadius: 6,
  },

  name: {
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 0.5,
  },

  price: {
    fontSize: 16,
    marginTop: 6,
    fontWeight: "600",
  },
});