import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default WishlistScreen = ({ navigation }) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const [list, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const firebase = useContext(FirebaseContext);



  const loadData = async () => {
    var data;
    try {
      data = await firebase.getWishlists(user.uid);
    } catch (error) {
      alert(error.message);
    } finally {
      setWishList(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

 console.log(list);

 const renderList = ({ item }) => (
   <ListContainer>
    <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('WishListInfo')}
          >
     <ListHeaderContainer>
       <ListInfoContainer>
          <Text bold large>{item.listName}</Text>
          <Text>{item.listDesc}</Text>
          <Text>{item.listItem.itemName}</Text>
       </ListInfoContainer>
     </ListHeaderContainer>
     </TouchableOpacity>
   </ListContainer>
 )

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
        
      
        {loading === true ? (
                <Text>Loading... </Text>
            ) : (
              
              <FeedContainer>
              
                <Feed data={list} renderItem={renderList} keyExtractor={(item) => item.id.toString()}/>

              </FeedContainer>
            )}
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

const Feed = styled.FlatList``;

const FeedContainer = styled.View`
  flex: 1;
  bottom: 310px;
  right: 20px;
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

const ListContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #dcd6f7;
  border-radius: 6px;
  padding: 8px;


`
const ListHeaderContainer = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
  align-items: center;
`
const ListInfoContainer = styled.View`
  flex: 1;
  margin: 0 16px;
  top: 10px;
`