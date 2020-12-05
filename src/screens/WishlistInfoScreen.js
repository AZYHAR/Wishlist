import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import styled from 'styled-components';

export default WishlistInfoScreen = (props) => {
  const firebase = useContext(FirebaseContext);
  const [wishes, setWishes] = useState([]);

  const {
    route: {
      params: { item },
    },
  } = props;

  // const loadData = async () => {
  //   var data;
  //   try {
  //     data = await firebase.getWishes(item.id);
  //   } catch (error) {
  //     alert(error.message);
  //   } finally {
  //     setWishes(data);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  console.log(props);

  return (
    <>
      {/* <ListName>
        {item.listName}
      </ListName>
      <ListDesc>
        {item.listDesc}
      </ListDesc> */}
    </>
  );
};

const Container = styled.View`
  flex: 1;
`;

const ListName = styled.Text`
  margin-left: 20px;
  font-weight: 300;
  font-size: 14px;
`;
const ListDesc = styled.Text`
  margin-left: 20px;
  font-weight: 300;
`;
