// App.js
import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // expo install @expo/vector-icons
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#A8D8C2",
  primarySubtle: "#E6F4EE",
  secondary: "#70A08D",
  backgroundLight: "#F7F9F8",
  backgroundDark: "#1A2420",
  textLight: "#1E2925",
  textDark: "#F0F5F3",
  mutedLight: "#678177",
  mutedDark: "#A0B5AD",
  rosegold: "#E3C8C1",
};

const heroImage =
  "https://i.pinimg.com/736x/c7/2e/41/c72e41cae3d2ef0a3a7b8ba3819b6a49.jpg";

const newArrivalImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuPTr3zvug2YBvqWEHknJamNIVsZ-OPjNX1tVOcLh7o-aIZBZLZC51fq01v-3A9UiQK5EpiirXf40poxDKztti9yNWpnLifIb9ZeCbkzYi6KR1mgCE7_rXXz4tA4-sbK64zWE-18cxvFf9-5ebTPyMMDSTCqPDEveczZlQ3XnATOP9hpvIrsIl2w3mb-Iem1HFY59AlMWU-CPQcQAwvyBOJHL7-1brIvJtSFmhsJ2TuBCaULw0EA__K8JU8wgj0_JtBpJwOwccF4oS";

const trending = [
  {
    id: "t1",
    title: "The Classic Tote",
    price: "$220.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6pcLOlM1QTe4oylGrIGwnEae8zj5l3OTURCv0OFm4I3w-kYeB5wbns4JwRwXu3m7Z-vfbuHdiSqH-TSGZhJo6WxpqR9cxEWvD1R-73m5kcMwD9tzfPxKT3cNExAQ1c-R9z8mZk_9RckjvVghjRscgpuRA2S0Ds2twILfmUeq2AkqTad-1Fqy5S9YA6PLePMjZAcXPzX25sOzDIuCx1xjgPjeVFJVaymn6JEJy0rERsveFRYTwH_yqMheoykNcAY_gnxinwU8NYsA3",
  },
  {
    id: "t2",
    title: "Floral Midi Dress",
    price: "$120.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB081fkcnsqzYhp6m558Z6VRqAhy7TQgNpe8HNlxQwPSoGJe8XjM_lc47u-rLQ2XJg4xXBfV92jFtbDOcZHYnNHPIBvtfUADSC1wwgtFm1xFRyVyaM56SSEPabEXp0nUd2gPcMQZ8ij2t2geugOaDysSU0MYzilt-xsyoiF-Fgg1nJsVW9CcPB3Npt95h5v9lzJW5JCGzmz2ENzuxkeZHZGcoCR3jTJDEgSj356ZZiD7TGIqlR7QLqFTAsqEAj4rt8-tx_zvaRFhUdV",
  },
];

const editorsPicks = [
  {
    id: "e1",
    title: "Oversized Sunglasses",
    price: "$140.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANv_dzxiq4JCC3VsU92zUu-sfBfueHIGkV0qoa7dCBc281bJcMzBq2by9OUtOsyMFZ1CIDwY5VYSWOOGbY7HxtlBAT8xNM0BOopX6V4MMSRt40MA35lRsEZOg0cZ-ePtHaB0o7hmTYx2G6tbhgFA_3ZubGM2d0IBTZlHgAS4OZ131oQIM0hJF3bdlRrTtmBC9KqdwJm-YWjLRpSnwcyiUdOianoV4evLuQuAbh7uBv4OAqEkOmHSU1F7fHCGX0rUrqxLzhPMIFWNh_",
  },
  {
    id: "e2",
    title: "Leather Crossbody",
    price: "$190.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6pcLOlM1QTe4oylGrIGwnEae8zj5l3OTURCv0OFm4I3w-kYeB5wbns4JwRwXu3m7Z-vfbuHdiSqH-TSGZhJo6WxpqR9cxEWvD1R-73m5kcMwD9tzfPxKT3cNExAQ1c-R9z8mZk_9RckjvVghjRscgpuRA2S0Ds2twILfmUeq2AkqTad-1Fqy5S9YA6PLePMjZAcXPzX25sOzDIuCx1xjgPjeVFJVaymn6JEJy0rERsveFRYTwH_yqMheoykNcAY_gnxinwU8NYsA3",
  },
  {
    id: "e3",
    title: "Cashmere Sweater",
    price: "$250.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCerawpr5aZPMS1YVqANRjz1Vo7OHyiDlDWUxX8Qpt0APTdh6mArQnzpTtGo55hqJhZxDHsOnxipxn5bLInaXdEQ9AJuzOXUfgkTaIVoxjCJMlbg3AuhjWzNgNmjSL8_IAhfAQlT1lwqRKWK0FfgIlU2WNo6z_uuYSSu_7dUt-o1Z399APSgz2_fAHjGRd8l7aF4EuvNgdCQG2NjxSVyBWJMTbRsaxUL_q4_3ac79lAXaHxtTBim_KKgypAZEsiwUXOqZaUTtNmn6k9",
  },
];

export default function Home({navigation}) {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: COLORS.backgroundLight }]}>
      <StatusBar barStyle="dark-content" translucent={false} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn}>
            <MaterialIcons name="menu" size={26} color={COLORS.textLight} />
          </TouchableOpacity>
          <Text style={styles.title}>Chic</Text>
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcons name="search" size={26} color={COLORS.textLight} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <MaterialIcons name="favorite-border" size={26} color={COLORS.textLight} onPress={() => navigation.navigate("wishlist")} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Hero */}
          <View style={styles.heroWrap}>
            <ImageBackground source={{ uri: heroImage }} style={styles.heroBg} imageStyle={{ opacity: 0.45 }}>
              <View style={styles.heroContent}>
                <Text style={styles.heroSmall}>Effortless Essentials</Text>
                <Text style={styles.heroTitle}>The Art of Dressing</Text>
                <TouchableOpacity style={styles.discoverBtn}>
                  <Text style={styles.discoverText}>Discover More</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
            {/* Trending Now */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Now</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.trendingGrid}>
              {trending.map((item) => (
                <View key={item.id} style={styles.trendingItem}>
                  <Image source={{ uri: item.img }} style={styles.trendingImage} />
                  <Text numberOfLines={1} style={styles.itemTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* New Arrivals */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>New Arrivals</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.largeCard}>
              <ImageBackground source={{ uri: newArrivalImage }} style={styles.largeCardBg} imageStyle={{ borderRadius: 18 }}>
                <View style={styles.largeCardFooter}>
                  <Text style={styles.largeCardTitle}>Satin Slip Dress</Text>
                  <Text style={styles.largeCardPrice}>$95.00</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        

          {/* Editor's Picks */}
          <View style={[styles.section, { paddingBottom: 30 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Editor's Picks</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled snapToAlignment="center">
              {editorsPicks.map((p) => (
                <View key={p.id} style={styles.picksCard}>
                  <ImageBackground source={{ uri: p.img }} style={styles.picksImage} imageStyle={{ borderRadius: 18 }} />
                  <Text numberOfLines={1} style={styles.itemTitle}>
                    {p.title}
                  </Text>
                  <Text style={styles.itemPrice}>{p.price}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Bottom Nav
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.bottomItem}>
            <MaterialIcons name="home" size={26} color={COLORS.primary} />
            <Text style={[styles.bottomLabel, { color: COLORS.primary }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem}>
            <MaterialIcons name="category" size={26} color={COLORS.mutedLight} />
            <Text style={styles.bottomLabel}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem}>
            <MaterialIcons name="shopping-bag" size={26} color={COLORS.mutedLight} />
            <Text style={styles.bottomLabel}>Bag</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomItem}>
            <MaterialIcons name="person" size={26} color={COLORS.mutedLight} />
            <Text style={styles.bottomLabel}>Profile</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    height: 64,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.backgroundLight,
    borderBottomWidth: Platform.OS === "ios" ? 0 : 0,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 999,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textLight,
    fontFamily: Platform.select({ ios: "Georgia", android: "sans-serif" }),
  },
  rightIcons: {
    flexDirection: "row",
    gap: 6,
  },
  scroll: {
    flex: 1,
  },
  heroWrap: {
    height: 260,
    backgroundColor: COLORS.primarySubtle,
    margin: 12,
    borderRadius: 14,
    overflow: "hidden",
  },
  heroBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  heroContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroSmall: {
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1,
    color: "#34443c7c",
    fontWeight: "600",
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 6,
    color: "#284637bb",
    textAlign: "center",
  },
  discoverBtn: {
    marginTop: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  discoverText: {
    fontWeight: "700",
    color: COLORS.textLight,
  },
  section: {
    marginHorizontal: 16,
    marginTop: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.textLight,
  },
  viewAll: {
    color: COLORS.secondary,
    fontWeight: "700",
  },
  largeCard: {
    borderRadius: 18,
    overflow: "hidden",
    height: (width - 32) * (5 / 4), // aspect 4/5 as in html -> use inverse for height
    marginTop: 6,
  },
  largeCardBg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  largeCardFooter: {
    padding: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  largeCardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  largeCardPrice: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 4,
  },
  trendingGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  trendingItem: {
    width: (width - 48) / 2,
  },
  trendingImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 14,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textLight,
  },
  itemPrice: {
    fontSize: 12,
    color: COLORS.mutedLight,
  },
  picksCard: {
    width: Math.round(width * 0.6),
    marginLeft: 16,
    marginRight: 8,
    marginBottom: 12,
  },
  picksImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 74,
    backgroundColor: Platform.OS === "ios" ? "rgba(247,249,248,0.95)" : "rgba(247,249,248,0.98)",
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLabel: {
    fontSize: 11,
    marginTop: 2,
    color: COLORS.mutedLight,
    fontWeight: "700",
  },
});
