import React, { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';
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
          username: userInfo.username,
          email: userInfo.email,
          uid,
          isLoggedIn: true,
          profilePhotoUrl: userInfo.profilePhotoUrl,
          userFirstName: userInfo.userFirstName,
          userLastName: userInfo.userLastName,
          bio: userInfo.bio,
          location: userInfo.location,
          birthday: userInfo.birthday,
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
};
