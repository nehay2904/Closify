import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

 import SplashScreen from "./Screens/Launch_screen";
 import BottomTab from "./Navigation/Bottomnav";
import Setting_screen from "./Screens/Settings";
import Wishlist from "./Screens/Wishlist";
import Login from "./Screens/Login";
import Sign_up from "./Screens/Sign_up";
import ProductDetails from "./Screens/ProductDetails";
const Stack = createNativeStackNavigator();
import { CartProvider } from "./Context/Cardcontext";
import DeliveryAddressScreen from "./Proceed_to_checkout/DeliveryAddressScreen";
import PaymentScreen from "./Proceed_to_checkout/PaymentMethod";
import ReviewOrderScreen from "./Proceed_to_checkout/ReviewOrder";
import OrderConfirmationScreen from "./Proceed_to_checkout/Confirmation";
import { WishlistProvider } from "./Context/WishlistContext";
import MyOrdersScreen from "./Profile/MyOrdersScreen";
import AddAddressScreen from "./Proceed_to_checkout/AddAddressScreen";

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="sign_up" component={Sign_up} />
            <Stack.Screen name="MainTabs" component={BottomTab} />
            <Stack.Screen name="settings" component={Setting_screen} />
            <Stack.Screen name="wishlist" component={Wishlist} />
            <Stack.Screen name="productDetails" component={ProductDetails} />
            <Stack.Screen name="deliveryAddressScreen" component={DeliveryAddressScreen} />
            <Stack.Screen name="addAddressScreen" component={AddAddressScreen} />
            <Stack.Screen name="paymentScreen" component={PaymentScreen} />
            <Stack.Screen name="reviewOrderScree" component={ReviewOrderScreen} />
            <Stack.Screen name="orderConfirmationScreen" component={OrderConfirmationScreen} />
             <Stack.Screen name="myOrdersScreen" component={MyOrdersScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
}
