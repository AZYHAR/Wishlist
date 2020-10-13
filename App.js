import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppStackScreens from "./src/routes/AppStackScreens"
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from "./src/context/UserContext"
export default function App() {
  return (
    <UserProvider>
        <NavigationContainer>
          <AppStackScreens/>  
        </NavigationContainer>
    </UserProvider>
    
  );
}


