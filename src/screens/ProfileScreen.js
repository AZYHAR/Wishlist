import React, { useContext } from 'react';

import { Entypo } from '@expo/vector-icons';
import { FirebaseContext } from '../context/FirebaseContext';
import { Text } from 'react-native';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default ProfileScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  console.log(user);

  const userTest = {
    profilePhotoUrl: 'default',
    username: 'Anton Zyhar',
    nickname: 'antonzyhar',
    bio:
      'Hello! My name is Anton Zyhar. I want to introduce my profile short bio intro',
    location: 'Toronto, ON',
    birthday: 'April 20, 1969',
  };

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  return (
    <Container>
      <ProfileHeadContainer
        source={require('../../assets/user_background.jpg')}
      />
      <ProfilePhoto
        source={
          userTest.profilePhotoUrl === 'default'
            ? require('../../assets/defaultProfilePhoto.jpg')
            : { uri: userTest.profilePhotoUrl }
        }
      />
      <UserName>{userTest.username}</UserName>
      <UserNickname>@{userTest.nickname}</UserNickname>
      <UserBio>{userTest.bio}</UserBio>
      <BirthdayLocation>
        <UserLocation>
          <Entypo name='location-pin' size={16} color='black' />
          {' ' + userTest.location}
        </UserLocation>
        <UserBirthday>
          <Entypo name='calendar' size={16} color='black' />
          {'  ' + userTest.birthday}
        </UserBirthday>
      </BirthdayLocation>
      <DivideLine />
      <Logout onPress={logOut}>
        <Text>Log Out</Text>
      </Logout>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ProfileHeadContainer = styled.Image`
  height: 133px;
  position: relative;
`;

const ProfilePhoto = styled.Image`
  margin-left: 20px;
  width: 78px;
  height: 78px;
  border-radius: 50px;
  position: absolute;

  border-width: 5px;
  border-color: #f1f1f1;

  top: 95px;
`;

const UserName = styled.Text`
  margin-top: 55px;
  margin-left: 25px;
  height: 22px;

  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
`;

const UserNickname = styled.Text`
  margin-left: 25px;

  color: #747474;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
`;

const UserBio = styled.Text`
  margin-top: 10px;
  margin-left: 25px;
  width: 85%;
  height: 35px;

  ${'' /* background: black; */}

  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
`;

const BirthdayLocation = styled.View`
  margin-top: 15px;
  margin-left: 25px;
  display: flex;
  flex-direction: row;

  line-height: 15px;
`;

const UserLocation = styled.Text`
  margin-right: 50px

  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

const UserBirthday = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
`;

const DivideLine = styled.View`
  width: 90%;
  height: 0px;
  left: 5%;
  top: 10px;

  border: 1px solid #e7b1b3;
`;

const Logout = styled.TouchableOpacity`
  left: 45%;
  top: 50%;
`;
