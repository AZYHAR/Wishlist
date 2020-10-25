import React, { useEffect, useContext }  from 'react';
import { View, Text } from 'react-native';
import { UserContext } from "../context/UserContext"
import firebase from 'firebase';

export default HomeScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
      setTimeout(async () => {
          const user = firebase.getCurrentUser();

          if (user) {
              const userInfo = await firebase.getUserInfo(user.uid);

              setUser({
                  isLoggedIn: true,
                  email: userInfo.email,
                  uid: user.uid,
                  username: userInfo.username,
              });
          } else {
              setUser((state) => ({ ...state, isLoggedIn: false }));
          }
      }, 500);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}