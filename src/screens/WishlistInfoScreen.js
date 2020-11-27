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
  <Text>{item.listName}</Text>

  )
}