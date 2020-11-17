import React, {useContext, useState} from "react";
import styled from "styled-components"
import Text from "../components/Text";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default AddWishlist = () => {

  const [listName, setListName] = useState();
  const [listDesc, setListDesc] = useState();

  return (
    <Container>
      <HeaderContainer>
        <Text large bold>Create new wishlist</Text>
      </HeaderContainer>
      <List>
        <ListContainer>
          <Title>List Name</Title>
           <ListName 
            onChangeText={listName => setListName(listName)}
            value={listName}
            >
          </ListName>
          <Title>List Description</Title>
          <ListDesc 
             onChangeText={listDesc => setListDesc(listDesc)}
             value={listDesc}
          >
          </ListDesc>
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
    background-color: #FF708D;
    border-radius: 20px;

`;


const Container = styled.View`
  flex: 1;
  padding-top: 64px;
  padding-left: 32px;
  `;

const HeaderContainer = styled.View`
  flex-direction: row;
  flex: 1;
  `;

const List = styled.View`
  margin: 64px 32px 32px
`; 

const ListContainer = styled.View`
  bottom: 340px;
  right: 20px;
`;

const ListName = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
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

const ListDesc = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
  font-size: 16px;
`;
