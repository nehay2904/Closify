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
      <Text style={styles.logo}>Chic</Text>      </View>

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
    justifyContent:'center'
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
    backgroundColor: "#305347ff",
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
    margin: 12,
    marginHorizontal: 16,
  },
  grid: {
    flexDirection: 'column',
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 100                                                                                       
  },
  card: {
    width: "90%",
    marginHorizontal:16,
    marginVertical:8
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    height:170,
    marginBottom:8
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
