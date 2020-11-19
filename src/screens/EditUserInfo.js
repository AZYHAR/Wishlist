import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';
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

  // Country
  const [countryCode, setCountryCode] = useState(user.locationCode);
  const [countryName, setCountryName] = useState(user.location);

  const onSelect = (country) => {
    console.log(country);
    setCountryCode(country.cca2);
    setCountryName(country.name);
  };

  // date time
  const [date, setDate] = useState(Date.parse(user.birthday));
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
        countryCode,
        countryName,
        profilePhoto,
      });

      // update user data
      setUser({
        ...user,
        bio: newBio,
        userFirstName: firstName,
        userLastName: lastName,
        birthday: birth,
        location: countryName,
        locationCode: countryCode,
        profilePhotoUrl: profilePhoto,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('Profile');
    }
  };

  return (
    <>
      {/* First Name */}
      <FNameTitle>First Name: </FNameTitle>
      <FNameField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(firstN) => setFirstName(firstN.trim())}
        value={firstName}
      />

      {/* Last Name */}
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

      {/* Country */}
      <CountryTitle>Location: </CountryTitle>
      <LocationField>
        <CountryPicker
          {...{
            countryCode: countryCode,
            withCountryNameButton: true,
            withFilter: true,
            onSelect,
          }}
        />
      </LocationField>

      {/* PhotoURL */}
      <PhotoTitle>Photo URL: </PhotoTitle>
      <PhotoField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(pPhoto) => setProfilePhoto(pPhoto.trim())}
        value={profilePhoto}
      />

      {/* Bio */}
      <BioTitle>Bio: </BioTitle>
      <BioField
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={(bio) => setBio(bio.trim())}
        value={newBio}
      />

      <SaveUserData onPress={updateData}>
        <Text>Save User</Text>
      </SaveUserData>
    </>
  );
};

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

const CountryTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5.5%;
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

const LocationField = styled.View`
  text-align: center;
  padding-left: 22%;
  position: absolute;
  width: 67%;
  height: 30px;
  width: 67%;
  left: 27%;
  top: 30%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const PhotoTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5%;
  top: 38%;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`;

const PhotoField = styled.TextInput`
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 0.5%;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 37%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const BioTitle = styled(Text)`
  position: absolute;
  width: 70px;
  height: 18px;
  left: 5%;
  top: 45%;

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;

  color: #000000;
`;

const BioField = styled.TextInput`
  text-align: center;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 0.5%;
  position: absolute;
  width: 67%;
  height: 30px;
  left: 27%;
  top: 44%;

  background: #ffffff;
  border: 1px solid #9dc9c1;
  border-radius: 25px;
`;

const SaveUserData = styled.TouchableOpacity`
  left: 45%;
  top: 70%;
`;
