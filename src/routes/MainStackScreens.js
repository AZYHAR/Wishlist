import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import WishlistScreen from "../screens/WishlistScreen";
import AddWishlistScreen from "../screens/AddWishlistScreen";

export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator();
    const WishlistStack = createStackNavigator();
    const tabBarOptions = {
        showLabel: false
    }

    const screenOptions = ({route}) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = "ios-home";

            switch (route.name) {
                case "Home": 
                    iconName = "ios-home"
                    break;
            
                case "Search": 
                    iconName = "ios-search"
                    break;

                case "Wishlist": 
                    iconName = "ios-list"
                    break;

                case "Profile": 
                    iconName = "ios-contact"
                    break;

                default:
                    iconName = "ios-home"
            }
          
            return <Ionicons name={iconName} size={24} color={focused ? "#000000" : "#5c5c5c"} />;
        }
    });

    return (
        <MainStack.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
            <MainStack.Screen name="Wishlist">{()=> (
                <WishlistStack.Navigator>
                    <WishlistStack.Screen
                        name="MyWishlists"
                        component={WishlistScreen}
                        />
                    <WishlistStack.Screen
                        name="AddWishlist"
                        component={AddWishlistScreen}
                        />
                </WishlistStack.Navigator>
            )}
            </MainStack.Screen>
            <MainStack.Screen name="Profile" component={ProfileScreen} />
        </MainStack.Navigator>
    );
};