import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FirebaseContext } from '../context/FirebaseContext';
import Moment from 'moment';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default EditUserInfo = ({ navigation }) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  // edit data
  const [newBio, setBio] = useState(user.bio);
  const [firstName, setFirstName] = useState(user.userFirstName);
  const [lastName, setLastName] = useState(user.userLastName);
  const [birth, setBirth] = useState(user.birthday);
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhotoUrl);
  const [loc, setLocation] = useState(user.loc);

  // Country

  // date time
  const [date, setDate] = useState(Date.parse(user.birthday)); // parse birthday of user
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setBirth(Moment(selectedDate).format('MMMM DD, YYYY'));
  };

  const updateData = async () => {
    try {
      await firebase.updateUserInfo(user.uid, {
        newBio,
        firstName,
        lastName,
        birth,
        // loc,
      });

      // update user data
      setUser({
        ...user,
        bio: newBio,
        userFirstName: firstName,
        userLastName: lastName,
        birthday: birth,
        // location: loc,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('Profile');
    }
  };

  return (
    <>
      {/* <BioTitle>Bio: </BioTitle>
      <BioField
        maxlength='50'
        multiline={true}
        numberOfLines={3}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(bio) => setBio(bio)}
        value={newBio}
      /> */}

      <FNameTitle>First Name: </FNameTitle>
      <FNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(firstN) => setFirstName(firstN.trim())}
        value={firstName}
      />

      <LNameTitle>Last Name: </LNameTitle>
      <LNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(lastN) => setLastName(lastN.trim())}
        value={lastName}
      />

      {/* Birthday */}
      <BirthdayTitle>Birthday: </BirthdayTitle>
      <BirthdayField onPress={() => setShow(true)}>
        <Text>
          <AntDesign name='calendar' size={18} color='black' />
          {'  ' + birth}
        </Text>
      </BirthdayField>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={date}
          mode='date'
          is24Hour={false}
          display='default'
          onChange={onChange}
        />
      )}

      {/* <LocationTitle>Location: </LocationTitle>
      <LocationField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(loc) => setLastName(loc}
        value={location}
      /> */}

      <SaveUserData onPress={updateData}>
        <Text>Save User</Text>
      </SaveUserData>
    </>
  );
};

const LocationTitle = styled(Text)`
  position: absolute;
  width: 88px;
  height: 18px;
  left: 3.3%;
  top: 31%;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const LocationField = styled.TextInput`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 9%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const FNameTitle = styled(Text)`
  position: absolute;
  width: 88px;
  height: 18px;
  left: 5%;
  top: 10%;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const FNameField = styled.TextInput`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 9%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const LNameTitle = styled(Text)`
  position: absolute;
  width: 88px;
  height: 18px;
  left: 5%;
  top: 17%;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const LNameField = styled.TextInput`
  text-align: center;
  padding-left: 15px;
  padding-right: 15px;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 16%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const BirthdayTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5%;
  top: 24%;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const BirthdayField = styled.TouchableOpacity`
  text-align: center;
  padding-left: 22%;
  padding-top: 1.5%;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 23%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

// const BioField = styled.TextInput`
//   border: #8e93a1;
//   border-radius: 15px;
//   padding: 7px;
//   top: 9%;
//   width: 75%;
//   left: 20%;
// `;

// const BioTitle = styled(Text)`
//   left: 10%;
//   top: 13%;
//   width: 20%;
//   color: #000000;
//   font-size: 14px;
//   font-weight: 300;
//   width: 20%;
// `;

const Container = styled.View`
  flex: 1;
`;

const SaveUserData = styled.TouchableOpacity`
  left: 45%;
  top: 50%;
`;
