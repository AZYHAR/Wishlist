import React, { useContext, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import { Text } from 'react-native';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default EditUserInfo = ({ navigation }) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  // edit data
  const [newBio, setBio] = useState(user.bio);
  const [firstName, setFirstName] = useState(user.userFirstName);

  const updateData = async () => {
    try {
      await firebase.updateUserInfo(user.uid, { newBio, firstName });

      // update user data
      setUser({ ...user, bio: newBio, userFirstName: firstName });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('Profile');
    }
  };

  return (
    <Container>
      <BioTitle>Bio: </BioTitle>
      <BioField
        maxlength='50'
        multiline={true}
        numberOfLines={3}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(bio) => setBio(bio)}
        value={newBio}
      />

      <FNameTitle>First Name: </FNameTitle>
      <FNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(firstN) => setFirstName(firstN.trim())}
        value={firstName}
      />

      <SaveUserData onPress={updateData}>
        <Text>Save User</Text>
      </SaveUserData>
    </Container>
  );
};

const FNameField = styled.TextInput`
  border: #8e93a1;
  border-radius: 15px;
  padding: 5px;
  top: 25%;
  width: 45%;
  left: 5%;
`;

const FNameTitle = styled(Text)`
  left: 10%;
  top: 15%;
  width: 20%;
  color: #000000;
  font-size: 14px;
  font-weight: 300;
  width: 20%;
`;

const BioField = styled.TextInput`
  border: #8e93a1;
  border-radius: 15px;
  padding: 7px;
  top: 9%;
  width: 75%;
  left: 20%;
`;

const BioTitle = styled(Text)`
  left: 10%;
  top: 13%;
  width: 20%;
  color: #000000;
  font-size: 14px;
  font-weight: 300;
  width: 20%;
`;

const Container = styled.View`
  flex: 1;
`;

const SaveUserData = styled.TouchableOpacity`
  left: 45%;
  top: 50%;
`;
