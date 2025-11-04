// components/BottomTab.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

// Import your screens
import SplashScreen from '../Screens/Launch_screen';
import LoginScreen from '../Screens/Login';
import Home from '../Screens/Home';
import Categories from '../Screens/Categories';
import Profile from '../Screens/profile';
import Setting_screen from '../Screens/Settings';
import Colors from "../constants/colors";
import ShoppingCart from "../Screens/Shopping_cart";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#578773ff",
        tabBarInactiveTintColor: "#72a58a7c",
        tabBarStyle: {
          backgroundColor: "#ffffffff",
          height: 60,
          borderTopWidth: 0,
          elevation: 8,
        },
        // 👇 custom icon + label layout
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Categories") iconName = "category";
          else if (route.name === "shopping-bag") iconName = "shopping-bag";
          else if (route.name === "Profile") iconName = "person";

          return (
            <MaterialIcons
              name={iconName}
              size={26}
              color={color}
              style={{ marginBottom: 2 }}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -4, // pushes label slightly down
        },
        tabBarItemStyle: {
          flexDirection: "column", // 🔥 makes icon above and label below
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="shopping-bag" component={ShoppingCart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
