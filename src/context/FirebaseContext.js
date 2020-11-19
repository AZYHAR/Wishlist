import 'firebase/auth';
import 'firebase/firestore';

import React, { createContext } from 'react';

import config from '../config/firebase';
import firebase from 'firebase';

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  createUser: async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      await db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl: user.profilePhotoUrl,
        userFirstName: user.userFirstName,
        userLastName: user.userLastName,
        bio: user.bio,
        location: user.location,
        locationCode: user.locationCode,
        birthday: user.birthday,
      });

      delete user.password;

      return { ...user, uid };
    } catch (error) {
      console.log('Error @createUser: ', error.message);
    }
  },

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed.'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      const user = await db.collection('users').doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log('Error @getUserInfo: ', error);
    }
  },

  updateUserInfo: async (uid, user) => {
    try {
      await db.collection('users').doc(uid).update({
        bio: user.newBio,
        userFirstName: user.firstName,
        userLastName: user.lastName,
        birthday: user.birth,
        location: user.countryName,
        locationCode: user.countryCode,
        profilePhotoUrl: user.profilePhoto,
        username: user.uname,
      });
    } catch (error) {
      console.log('Error @updateUserInfo: ', error);
    }
  },

  logOut: async () => {
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log('Error @logOut: ', error);
    }

    return false;
  },

  signIn: async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
