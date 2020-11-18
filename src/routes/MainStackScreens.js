import AddWishlistScreen from '../screens/AddWishlistScreen';
import EditUserInfo from '../screens/EditUserInfo';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import React from 'react';
import WishlistScreen from '../screens/WishlistScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

export default MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();
  const WishlistStack = createStackNavigator();
  const ProfileStack = createStackNavigator();
  const tabBarOptions = {
    showLabel: false,
    keyboardHidesTabBar: true,
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = 'ios-home';

      switch (route.name) {
        case 'Wishlist':
          iconName = 'ios-list';
          break;

        case 'Profile':
          iconName = 'ios-contact';
          break;

        default:
          iconName = 'ios-list';
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? '#000000' : '#5c5c5c'}
        />
      );
    },
  });

  return (
    <MainStack.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
      initialRouteName='Profile'
    >
      <MainStack.Screen name='Wishlist'>
        {() => (
          <WishlistStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <WishlistStack.Screen
              name='MyWishlists'
              component={WishlistScreen}
            />
            <WishlistStack.Screen
              name='AddWishlist'
              component={AddWishlistScreen}
            />
          </WishlistStack.Navigator>
        )}
      </MainStack.Screen>
      <MainStack.Screen name='Profile'>
        {() => (
          <ProfileStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName='Profile'
          >
            <ProfileStack.Screen name='Profile' component={ProfileScreen} />
            <ProfileStack.Screen name='EditUser' component={EditUserInfo} />
          </ProfileStack.Navigator>
        )}
      </MainStack.Screen>
    </MainStack.Navigator>
  );
};
