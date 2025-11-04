import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import {SafeAreaView } from "react-native-safe-area-context";

export default function Setting_screen({navigation}) {
  const [isPushEnabled, setPushEnabled] = React.useState(true);
  const [isEmailEnabled, setEmailEnabled] = React.useState(false);
  const [isDarkMode, setDarkMode] = React.useState(false);

  return (
   
     <ScrollView style={styles.container}>
      <SafeAreaView>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="#333"  onPress={() => navigation.navigate("MainTabs")}/>
        <Text style={styles.headerText}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* App Settings */}
      <Text style={styles.sectionTitle}>App Settings</Text>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="notifications" size={22} color={Colors.primary}/>
          <Text style={styles.itemText}>Push Notifications</Text>
        </View>
        <Switch value={isPushEnabled} onValueChange={setPushEnabled} />
      </View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="mark-email-unread" size={22} color={Colors.primary}/>
          <Text style={styles.itemText}>Email & SMS</Text>
        </View>
        <Switch value={isEmailEnabled} onValueChange={setEmailEnabled} />
      </View>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="dark-mode" size={22} color={Colors.primary}/>
          <Text style={styles.itemText}>Dark Mode</Text>
        </View>
        <Switch value={isDarkMode} onValueChange={setDarkMode} />
      </View>
      {/* Legal Section */}
      <Text style={styles.sectionTitle}>Legal & Information</Text>
      <TouchableOpacity style={styles.linkItem}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="shield" size={22} color={Colors.primary}/>
          <Text style={styles.itemText}>Privacy Policy</Text>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkItem}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="gavel" size={22} color={Colors.primary}/>
          <Text style={styles.itemText}>Terms of Service</Text>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#999" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkItem}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="help-center" size={22} color={Colors.primary}/>
          <Text style={styles.itemText}>Help & Support</Text>
        </View>
        <MaterialIcons name="chevron-right" size={22} color="#999" />
      </TouchableOpacity>
      {/* Account */}
      <Text style={styles.sectionTitle}>Account</Text>
      <TouchableOpacity style={[styles.linkItem, { justifyContent: "center" }]}>
        <View style={styles.itemLeft}>
          <MaterialIcons name="logout" size={22} color="#e53935" />
          <Text style={[styles.itemText, { color: "#e53935", fontWeight: "bold" }]}  onPress={() => navigation.navigate("Login")}>
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#555",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemText: {
    fontSize: 15,
    color: "#333",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
});
