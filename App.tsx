import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

 import SplashScreen from "./Screens/Launch_screen";
 import LoginScreen from "./Screens/Login";
 import BottomTab from "./Navigation/Bottomnav";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
