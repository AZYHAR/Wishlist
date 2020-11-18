import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../components/Text';
import styled from 'styled-components';

export default WishlistScreen = ({ navigation }) => {
  const [test, setTest] = useState();
  const testing = () => {
    setTest('Working!');
  };
  return (
    <Container>
      <HeaderContainer>
        <Text large bold>
          My Wishlists
        </Text>
      </HeaderContainer>
      <PlusSign>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddWishlist')}
        >
          <Text XL>+</Text>
        </TouchableOpacity>
      </PlusSign>

      <View>
        <Text>{test}</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    left: 8,
    top: -9,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});

const Container = styled.View`
  flex: 1;
  padding-top: 64px;
  padding-left: 32px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const PlusSign = styled.View`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 300px;
  border: 2px;
  left: 330px;
  top: 50px;
  border-color: #8b5fbf;
`;
