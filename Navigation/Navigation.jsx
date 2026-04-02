import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import SplashScreen from '../Login pages/Launch_screen';
import LoginScreen from '../Login pages/Login';
import Home from '../Screens/Home';
import Categories from '../Screens/Categories';
import Profile from '../Screens/profile';
import Setting_screen from '../Screens/Settings';
import ProductDetails from '../Screens/ProductDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


// Stack Navigation (Splash → Login → Tabs)
export default function Navigation_tab() {
  return (
   
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash"  component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="/" component={Home} />
        <Stack.Screen name="Cat" component={Categories} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="settings" component={Setting_screen} />
        <Stack.Screen name="sizeselector" component={SizeSelector} />
      </Stack.Navigator>
  );
}
