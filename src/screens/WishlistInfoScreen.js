import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../components/Text';
import styled from 'styled-components';

export default WishlistInfoScreen = (props) => {
  const [listName, setListName] = useState();
  const [listDesc, setListDesc] = useState();

  const { route } = props 
  const { item } = route.params

  return (
    <Container>
      <ListName>
        {item.listName}
      </ListName>
      <ListDesc>
        {item.listDesc}
      </ListDesc>
    </Container>
  

  )
};

const Container = styled.View`
  flex: 1;
`;

const ListName = styled.Text`
  margin-left: 20px;
  font-weight: 300;
  font-size: 14px;

`
const ListDesc = styled.Text`
  margin-left: 20px;
  font-weight: 300;
`

