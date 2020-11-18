import React, { useContext } from 'react';

import { Entypo } from '@expo/vector-icons';
import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

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
          user.profilePhotoUrl === 'default'
            ? require('../../assets/defaultProfilePhoto.jpg')
            : { uri: user.profilePhotoUrl }
        }
      />
      <UserName>{user.userFirstName + ' ' + user.userLastName}</UserName>
      <UserNickname>@{user.username}</UserNickname>
      <UserBio>{user.bio}</UserBio>
      <BirthdayLocation>
        <UserLocation>
          <Entypo name='location-pin' size={16} color='black' />
          {' ' + user.location}
        </UserLocation>
        <UserBirthday>
          <Entypo name='calendar' size={16} color='black' />
          {'  ' + user.birthday}
        </UserBirthday>
      </BirthdayLocation>
      <DivideLine />
      <Logout onPress={logOut}>
        <Text large light center>
          Log Out
        </Text>
      </Logout>
      <Edit onPress={() => navigation.navigate('EditUser')}>
        <Text>Edit user</Text>
      </Edit>
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
  margin-right: 50px;
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
  position: absolute;
  width: 33%;
  height: 8%;
  left: 33%;
  top: 627px;
  padding-top: 8%;

  background: #c0e5d5;
  border-radius: 26px;
`;

const Edit = styled.TouchableOpacity`
  padding-top: 4%;
  padding-left: 17%;
  position: absolute;
  width: 91px;
  height: 34px;
  left: 70%;
  top: 21%;

  background: #c0e5d5;
  border: 2px solid #c0e5d5;
  border-radius: 25px;
`;
