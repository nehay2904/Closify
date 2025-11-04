import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";

export default function Categories() {
  const categories = [
    {
      name: "Dresses",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDjWkxxT-1EoMwcVFP0w3GZPEmu5Vc4mmhQDVkVG1GaYzB-ixLcrXzCxwifH_rEB-vR1mx-sI65kjrBIvXsyVqpOv2M_tTU7Cp7al9bDPuuYrHXblkGAKHp3BkgpkczlyFkQUifavQ47ugJj6_O9lxx1G-ueWGrDYeqARQ886Nl_stf5dWVZb8xnb_1f4GZCBkGYcDMuXBiwPJSZVFEC4x6BekgmsYfIpmnFRxCU3Nkwdm050635t2lAeVIB1R5xFuLwT1yTzQL43jY",
    },
    {
      name: "Tops",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBkxjw2ZbQHr2RJ_8ztciMYXjnO2veJoGkz9vf_bUWmr78PP2CLWLnV_c6PR53EW_3L5Q4ziu5IDMXC_Yq7hcp61rDEVjeOvwnqGPEhS2DG3zyyYZA3naPAh2mDFImEF11O9WOJPBGTBw_RRnk3KmdKl6Q1R0Ay2F-oh9PE7hjECUwufxPHFSlurG_4N9rgWjRzWeW6JYmogGJdKVwUa24h3emszve-_JUcS2FzIAPBZdKha49u2Zp76GdIWCNEh3yxRzmRu5CAKKDp",
    },
    {
      name: "Footwear",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDZOWIu6Ynb7Kjf1nY6PXDximAQzU2WVIOGruNlxEG7bnkDzqUJfdSULdI00nGdV2OykeMzcSXjKGv85iAyMtvq6BmJi8XEs6WphbR2x0Hm9aM0zt3qIwffEP3phga2poG2XXZ5XdnKbLOnDq7J9gj5w85TDLuVjP0MGnvJCt5dOcHSsunx_lziZRj2uSazzU1OFD8REUe1-hhXC600NhjEx5axTT25kKIZ-bYNRD9vfCpm0PHK06xF73N-nbqrdZXhAebzUnX4lo_g",
    },
    {
      name: "Accessories",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBI53Fgw7NPaKZOB5qTWXPt-_u_jter9wGuuBMpkyoIwzrvX7TW5LYeIWtMd5LdrUDfuhc5MtocYs5SNs2UbqnNyq3fqHOQ2WuepQrAskYOUQL0Uj5Tz5CKiirlBMQvuEXgsariMW2rJ_GdhHCBLdqMCfyxjyilNxUvzUr74AW3r_3vonfbQ5FgWj591gSmSgCZ_iGFw5JBGbE8ABsShWqVYJ-B3oPlKQ5QWMgXAo43SmpguptuezWphtYy0BKlAaec17ejt1M0-JHU",
    },
    {
      name: "Ethnic Wear",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWZDAo-6KIZxSJ0s0ziXQNlGu1zCCZcis-WE7pkLPXnUHFIk8fz0ulBFTEuNVehITfq7s9JDfTtU4w8NPq6Nl25IGY30hXClW5R4-dRAlZpx4COrYgU1T0sJOyEfkR8H4qlOBYWXpSj6cle-AJ-7dvRt0j8jYpP98_j3c-phXbSii-KMecJBig6QjQjHFLz0S8lejRpLsc3ImESzGo3VYi99Xmjw0EaB6zg7wqKD-1gU94uOgm7l0nZtjikdx2FpKk44lUg62FmmWb",
    },
    {
      name: "Bags & Wallets",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwlp2VpPLAZXCkKIK47_K5EAAByzre1R8-SNKTWCbideQ9innVH5RPig6B_YjYRDAiZyHhftUHT3Lt6bSFv8EYOYSspHaeNCzL0_jX6yAMuQWyI6myBEPgxu0A0LtsRKl4nPXgPTGX2VVJYGRrhQ5G4U9dzSibAOiRb4aeQndWQDLEcQYq20ka-9bNiVEvrOZiUfWOZRu7DmlxAZYSrUjr2n4qb670hsv_l-c-RbWd8tWjhuSSCZOJxqbHr-7vz1vREwsoGg1puzpJ",
    },
    {
      name: "New Arrivals",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBdSdtntuL3QN5eomFYCmamaXsgLgGBJEsTJV9x2mo9WPA720nZzHPEqNrd-_sHz2TAnTYky26vHyNStb-revb_P170uP-y2fxTFHvunc-DAWSqRTI-zBRzxezGIMTMSQiON-1fiI3_zTzX6FhGrFy9OECtk_8yKYbOcFV4RwwwydtfaN356R6Ei9XZGSENEE-jNaLGEJzIe8xmhPxxyNE2vE5ip5d3V74yfKoKBnyntcXk7_DAPD4lSowqaKZx0TWBOHDMSPQgajFN",
    },
    {
      name: "Sale",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCSCPUKPvri6MAI6xgEByumkEMNCi49ElXfuVizb1m7ZMlPKy8FwOFN-dGjSlC7IQ_JG7I3yOfZRa0yzolAoIvUr4i6c2aE878IYRQKwtcC5qUgmwJiIq5rE3IPnd44DP7z-OWxWBF0gIys756nrXC40XA1S-H6U3ZU6bnX4woKsuT7WENbjOkNbgCwUwXNKifBFCtkZcsVTv24xy9aIo2_GWMapnz6AWuoWfMnITMKEfTIXz68idjI_9nZ1001huoq5XtQcgvsIOf3",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f6f6" />
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Chic</Text>
        <View style={styles.headerIcons}>
          <MaterialIcons name="search" size={24} color="#4A4A4A" />
          <MaterialIcons name="favorite-border" size={24} color="#4A4A4A" />
          <View>
            <MaterialIcons name="shopping-bag" size={24} color="#4A4A4A" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Shop by Category</Text>

      {/* Category Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((item, index) => (
          <View key={index} style={styles.card}>
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
              imageStyle={{ borderRadius: 16 }}
            />
            <Text style={styles.cardText}>{item.name}</Text>
          </View>
        ))}
      </ScrollView>

     
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: Colors.bg,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#b8f9e3ff",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a4a4aff",
    marginTop: 12,
    marginHorizontal: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    width: "47%",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 8,
  },
  cardText: {
    textAlign: "center",
    fontSize: 16,
    color: "#4a4a4aff",
    fontWeight: "500",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#ddddddff",
    backgroundColor: "#f6f8f7ff",
    paddingVertical: 8,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#61897bff",
  },
  navLabelActive: {
    fontWeight: "bold",
    color: "#b8f9d7ff",
  },
});
