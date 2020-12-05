import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default WishlistInfoScreen = (props) => {
  const id = props.route.params.item.id;

  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);

  const wishes = user.wishes.filter((wish) => wish.wishId == id);

  console.log(wishes);

  var List = () => <Feed data={wishes} renderItem={renderList} />;

  useEffect(() => {
    List = () => <Feed data={wishes} renderItem={renderList} />;
  }, [wishes]);

  const renderList = ({ item }) => {
    return (
      <ListContainer>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <ListHeaderContainer>
            <ListInfoContainer>
              <Text bold large>
                {item.title}
              </Text>
              <Text>{item.context}</Text>
            </ListInfoContainer>
          </ListHeaderContainer>
        </TouchableOpacity>
      </ListContainer>
    );
  };

  return (
    <>
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

const FeedContainer = styled.View`
  height: 79%;
  top: 80px;
  bottom: 20px;
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
