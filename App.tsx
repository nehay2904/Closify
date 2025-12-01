import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

 import SplashScreen from "./Screens/Launch_screen";
 import BottomTab from "./Navigation/Bottomnav";
import Setting_screen from "./Screens/Settings";
import Wishlist from "./Screens/Wishlist";
import Login from "./Screens/Login";
import Sign_up from "./Screens/Sign_up";
import Home from "./Screens/Home";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="sign_up" component={Sign_up} />
        <Stack.Screen name="MainTabs" component={BottomTab} />
        <Stack.Screen name="settings" component={Setting_screen} />
        <Stack.Screen name="wishlist" component={Wishlist} />
      </Stack.Navigator>
    </NavigationContainer>
    
    
    //  <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //      <Stack.Screen name="/" component={Auth} />
    //     <Stack.Screen name="home" component={Sample} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    
    
  );
}
