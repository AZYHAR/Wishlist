import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default WishlistScreen = ({ navigation }, props) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const { wishlists } = user;

  var List = () => <Feed data={wishlists} renderItem={renderList} />;

  useEffect(() => {
    List = () => <Feed data={wishlists} renderItem={renderList} />;
  }, [wishlists]);

  const renderList = ({ item }) => {
    // console.log(item);
    return (
      <ListContainer>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('WishListInfo', { item: item })}
        >
          <ListHeaderContainer>
            <ListInfoContainer>
              <Text bold large>
                {item.listName}
              </Text>
              <Text>{item.listDesc}</Text>
            </ListInfoContainer>
          </ListHeaderContainer>
        </TouchableOpacity>
      </ListContainer>
    );
  };

  return (
    <>
      <HeaderContainer>
        <Text bold large>
          My Wishlists
        </Text>
      </HeaderContainer>

      <AddWishlist
        onPress={() => {
          navigation.navigate('AddWishlist');
        }}
      >
        <PlusText>+</PlusText>
      </AddWishlist>

      {/* TODO: Add wishlist */}
      {/* also update the page when redirecting */}
      <FeedContainer>
        <List />
      </FeedContainer>
    </>
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

const PlusText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const HeaderContainer = styled.View`
  top: 9%;
  left: 10%;
`;

const FeedContainer = styled.View`
  height: 79%;
  top: 80px;
  bottom: 20px;
`;

const AddWishlist = styled.TouchableOpacity`
  position: absolute;
  width: 80px;
  height: 34px;

  top: 9%;
  bottom: 20px;
  left: 75%;

  background: #ff708d;
  border-radius: 26px;
`;

const Feed = styled.FlatList`
  top: 35px;
`;

const ListContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #dcd6f7;
  border-radius: 6px;
  padding: 8px;
`;

const ListHeaderContainer = styled.View``;

const ListInfoContainer = styled.View`
  flex: 1;
  margin: 0 16px;
  top: 10px;
`;
