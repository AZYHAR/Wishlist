import { Button, Checkbox, TextInput } from 'react-native-paper';
import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

export default AddWish = ({ route, navigation }) => {
  const { wishlistId } = route.params;
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);

  const [wishTitle, setWishTitle] = useState('');
  const [wishContex, setWishContext] = useState('');
  const [completed, setCompleted] = useState(false);

  const addWish = async () => {
    try {
      const added_wish = await firebase.createWish({
        title: wishTitle,
        context: wishContex,
        completed: completed,
        uid: user.uid,
        wishlistId: wishlistId,
      });

      setUser((state) => {
        return { ...state, wishes: [...state.wishes, added_wish] };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('WishListInfo', { id: wishlistId });
    }
  };

  return (
    <>
      <TextInput
        label='Title'
        mode='outlined'
        style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
        value={wishTitle}
        onChangeText={(text) => setWishTitle(text)}
      />
      <TextInput
        label='Context'
        mode='outlined'
        style={{ margin: 20, maxHeight: 150 }}
        multiline
        dense
        value={wishContex}
        onChangeText={(text) => setWishContext(text)}
        numberOfLines={10}
      />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 20,
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <Text>Completed: </Text>
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          color='purple'
          onPress={() => {
            setCompleted(!completed);
          }}
        />
      </View>
      <Button
        style={{
          marginLeft: 80,
          marginRight: 80,
          marginTop: 155,
          borderRadius: 15,
        }}
        mode='contained'
        onPress={() => {
          addWish();
        }}
      >
        Create
      </Button>
    </>
  );
};
