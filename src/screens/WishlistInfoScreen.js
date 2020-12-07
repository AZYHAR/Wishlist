import React, { useContext, useEffect } from 'react';

import CircleCheckBox from 'react-native-circle-checkbox';
import { FirebaseContext } from '../context/FirebaseContext';
import { MaterialIcons } from '@expo/vector-icons';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default WishlistInfoScreen = ({ route, navigation }) => {
  const id = route.params.id;

  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);

  const wishes = user.wishes
    .filter((wish) => wish.wishlistId == id)
    .sort((a, b) => (a.lastEdited < b.lastEdited ? 1 : -1));

  // console.log(wishes);

  var List = () => (
    <Feed
      data={wishes}
      renderItem={renderList}
      keyExtractor={(item) => item.wishId}
    />
  );

  useEffect(() => {
    List = () => <Feed data={wishes} renderItem={renderList} />;
  }, [wishes]);

  const updateWishes = async (item) => {
    const date = new Date();
    try {
      await firebase.updateWishes({
        completed: !item.completed,
        context: item.context,
        title: item.title,
        lastEdited: date.toString(),
        wishId: item.wishId,
      });

      // Pass object from firebase to update value
      setUser((state) => {
        return {
          ...state,
          wishes: [
            ...state.wishes.filter((w) => w.wishId != item.wishId),
            {
              ...item,
              completed: !item.completed,
              context: item.context,
              lastEdited: date,
              title: item.title,
            },
          ],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
    }
  };

  const removeWish = async (wishId) => {
    try {
      await firebase.deleteWish(wishId);

      setUser((state) => {
        return {
          ...state,
          wishes: [...state.wishes.filter((w) => w.wishId != wishId)],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
    }
  };

  const renderList = ({ item }) => {
    return (
      <ListContainer>
        <CircleCheckBox
          checked={item.completed}
          style={{ postion: 'absolute' }}
          onToggle={() => {
            updateWishes(item);
          }}
        />
        <RowSingleData
          onPress={() => {
            navigation.navigate('AddWish', {
              wishlistId: id,
              editOption: 'edit',
              obj: item,
            });
          }}
        >
          <Text bold large>
            {item.title.substring(0, 20).trim() +
              (item.title.length > 11 ? '...' : '')}
          </Text>
          <Text>
            {item.context.substring(0, 20).trim() +
              (item.context.length > 11 ? '...' : '')}
          </Text>
        </RowSingleData>
        <DeleteButton
          onPress={() => {
            removeWish(item.wishId);
          }}
        >
          <MaterialIcons name='delete' size={27} color='black' />
        </DeleteButton>
      </ListContainer>
    );
  };

  return (
    <>
      <HeaderContainer>
        {/* <Text bold large>
          Wishlist Details
        </Text> */}
        <AddWish
          onPress={() => {
            navigation.navigate('AddWish', {
              wishlistId: id,
              editOption: 'create',
              obj: {},
            });
          }}
        >
          <PlusText>+</PlusText>
        </AddWish>
      </HeaderContainer>

      <FeedContainer>
        <List />
      </FeedContainer>
    </>
  );
};

const RowSingleData = styled.TouchableOpacity`
  position: absolute;
  left: 18%;
  width: 60%;
  top: 4px;
`;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  left: 80%;
  top: 19px;
  padding-bottom: 15px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  left: 95%;
  top: 19px;
  padding-bottom: 15px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.View`
  top: 630px;
  bottom: 20px;
`;

const PlusText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const AddWish = styled.TouchableOpacity`
  position: absolute;
  width: 33%;
  height: 34px;

  bottom: 20px;
  left: 33%;

  background: #ff708d;
  border-radius: 26px;
`;

const FeedContainer = styled.View`
  height: 87%;
  bottom: 20px;
`;

const Feed = styled.FlatList`
  /* border-color: black; */
  /* border-width: 1px; */
  top: 35px;
`;

const ListContainer = styled.View`
  margin: 16px 16px 0 16px;
  background-color: #dcd6f7;
  border-radius: 6px;
  padding: 20px;
  flex: 1;
`;

const ListHeaderContainer = styled.View``;

const ListInfoContainer = styled.View`
  flex: 1;
  margin: 0 16px;
  top: 10px;
`;
