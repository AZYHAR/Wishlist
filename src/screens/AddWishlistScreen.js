import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../components/Text';
import styled from 'styled-components';

export default AddWishlist = () => {
  const [listName, setListName] = useState();
  const [listDesc, setListDesc] = useState();

  return (
    <Container>
      <HeaderContainer>
        <Text large bold>
          Create new wishlist
        </Text>
      </HeaderContainer>

      <List>
        <ListContainer>
          <Title>List Name</Title>
          <ListField
            onChangeText={(listName) => setListName(listName)}
            value={listName}
          ></ListField>
        </ListContainer>
        
        <ListContainer>
          <Title>List Description</Title>
          <ListField
            onChangeText={(listDesc) => setListDesc(listDesc)}
            value={listDesc}
          ></ListField>
          <Create>
            <Text>Create</Text>
          </Create>
        </ListContainer>
      </List>
    </Container>
  );
};
const Create = styled.TouchableOpacity`
  margin: 0 32px;
  top: 35px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #ff708d;
  border-radius: 20px;
`;

const Container = styled.View`
  flex: 1;
  padding-left: 32px;
`;

const HeaderContainer = styled.View`
  margin-top: 75px;
  
`;

const List = styled.View`
  margin: 64px 32px 32px;
`;

const ListContainer = styled.View`
  margin-bottom: 32px;
  right: 5%;
`;

const ListField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 1px;
  height: 48px;
  font-size: 16px;
`;

const Title = styled(Text)`
  color: #000000;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 300;
  margin-top: 60px;
`;


