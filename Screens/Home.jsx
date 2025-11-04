import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/colors";

export default function Home() {
  const trending = [
    {
      name: "The Classic Tote",
      price: "$220",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA6pcLOlM1QTe4oylGrIGwnEae8zj5l3OTURCv0OFm4I3w-kYeB5wbns4JwRwXu3m7Z-vfbuHdiSqH-TSGZhJo6WxpqR9cxEWvD1R-73m5kcMwD9tzfPxKT3cNExAQ1c-R9z8mZk_9RckjvVghjRscgpuRA2S0Ds2twILfmUeq2AkqTad-1Fqy5S9YA6PLePMjZAcXPzX25sOzDIuCx1xjgPjeVFJVaymn6JEJy0rERsveFRYTwH_yqMheoykNcAY_gnxinwU8NYsA3",
    },
    {
      name: "Floral Midi Dress",
      price: "$120",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB081fkcnsqzYhp6m558Z6VRqAhy7TQgNpe8HNlxQwPSoGJe8XjM_lc47u-rLQ2XJg4xXBfV92jFtbDOcZHYnNHPIBvtfUADSC1wwgtFm1xFRyVyaM56SSEPabEXp0nUd2gPcMQZ8ij2t2geugOaDysSU0MYzilt-xsyoiF-Fgg1nJsVW9CcPB3Npt95h5v9lzJW5JCGzmz2ENzuxkeZHZGcoCR3jTJDEgSj356ZZiD7TGIqlR7QLqFTAsqEAj4rt8-tx_zvaRFhUdV",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>Chic</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <ImageBackground
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7bGqGQVUUvcV5UOqlx2VWV-3XLKxRIJ8pHREYtY110IVVuh4XVlTmQKUf_TswVzM5im_BndC1BjkJBKdSMaHz-My6rep1uhyFMJZjWAwptuT5EJUz58qlQn7kEBgr-w5smJxU4l-UCSpRG6ME5nUa660ABGBNVUwJluodn-Pr4wJbQV-B9ZrsMzEYKzsfyxfPhiQjWioTp6Oiui4g91yqIN2Avnu25abOOHHH2YE3YG9RdlF-tOKFPDq5RHf_IMbllyEyswESvxy5",
          }}
          style={styles.hero}
          imageStyle={{ borderRadius: 20 }}
        >
          <Text style={styles.heroText}>The Spring '24 Edit</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Shop Now</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Trending */}
        <Text style={styles.sectionTitle}>Trending Now</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 16 }}
        >
          {trending.map((item, index) => (
            <View key={index} style={styles.card}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 10 }}
              />
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>

    
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  topBar: {
    padding: 20,
    backgroundColor: Colors.bg,
    alignItems: "center",
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#7f8784ff" },
  hero: {
    marginHorizontal: 16,
    height: 280,
    justifyContent: "flex-end",
    padding: 20,
  },
  heroText: {
    fontSize: 24,
    color: "#ffffffff",
    fontWeight: "700",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#b8f9e29b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: "flex-start",
  },
  buttonText: { color: "#4a4a4aff", fontWeight: "bold" },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 16,
    color: "#4a4a4aff",
  },
  card: {
    width: 150,
    marginRight: 16,
  },
  cardImage: {
    width: "100%",
    height: 180,
    marginBottom: 6,
  },
  cardName: { fontWeight: "500", color: "#4a4a4aff" },
  cardPrice: { color: "#618978ff" },
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
    color: "#61897aff",
  },
  navLabelActive: {
    fontWeight: "bold",
    color: "#b8f9deff",
  },
});
