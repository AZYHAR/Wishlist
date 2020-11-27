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
                <Text>{list[0].listName}</Text>
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

const FeedContainer = styled.View`
 
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
