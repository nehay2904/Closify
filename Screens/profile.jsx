import React, {useState, useEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({navigation}) {
  
  const [user, setUser] = useState(null);
    useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) setUser(JSON.parse(userData));
    };
    loadUser();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>My Account</Text>
          <MaterialIcons name="settings" size={26} color="#333"  onPress={() => navigation.navigate("settings")}/>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdjqbCRhvVqoi67muqrYKeKSduYuqzae43pfwAa3H4Dt1tZbaivfreyXzJPAZ_vDnSWtgeXxVlDfYpzQD9k2D4Cm5rdIZ5aoAzsfV18D6TJ0R-0Y9eyXC_UejXfIenV4t5HDkJII5iRAj2iwru2n48cwbsTJ7Z5FvJ5KGW6_g813nmTIQd87GpOHgvhpqmg97mKXDFB_E4CvzxrU2I_wzFhPKXUN75Auktmz0W6QZGD2MpfJMkHyQj8rKws-qr5SV5hgsBdVs9GCAi",
            }}
            style={styles.profilePic}
          />
            {user ? (
             <Text style={styles.name}>Welcome, {user.name}!</Text>
      ) : (
        <Text style={styles.name}>Loading user info...</Text>
      )}   
       {user ? (
         <Text style={styles.email}>{user.email}</Text>

      ) : (
        <Text style={styles.name}>Loading user info...</Text>
      )}
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        {[
          { icon: "local-mall", label: "My Orders" },
          { icon: "favorite", label: "My Wishlist" },
          { icon: "home", label: "Saved Addresses" },
          { icon: "credit-card", label: "Payment Methods" },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.optionCard}>
            <View style={styles.optionLeft}>
              <View style={styles.iconBox}>
                <MaterialIcons name={item.icon} size={22} color="#333" />
              </View>
              <Text style={styles.optionLabel}>{item.label}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#999" />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn}  onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="logout" size={22} color="#888" />
          <Text style={styles.logoutText} onPress={() => navigation.navigate("Login")}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FBF9" },
  scroll: { paddingBottom: 100, alignItems: "center" },
  header: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#F8FBF9",
  },
  title: { fontSize: 22, fontWeight: "700" },
  profileSection: { alignItems: "center", marginVertical: 20 },
  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#D1EADF",
  },
  name: { fontSize: 20, fontWeight: "700", marginTop: 10 },
  email: { fontSize: 14, color: "#777" },
  editButton: {
    backgroundColor: "#D1EADF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 15,
  },
  editText: { fontWeight: "600" },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBox: {
    backgroundColor: "#E8F4EF",
    padding: 8,
    borderRadius: 8,
  },
  optionLabel: { fontSize: 16, fontWeight: "500" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
    gap: 8,
  },
  logoutText: { color: "#888", fontSize: 16 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomItem: { alignItems: "center" },
  bottomLabel: { fontSize: 12, color: "#888" },
});
