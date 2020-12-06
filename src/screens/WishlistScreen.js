import {
  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../context/FirebaseContext';
import Text from '../components/Text';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

export default WishlistScreen = ({ navigation }, props) => {
  // get data
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  //model visible
  const [toEdit, setToEdit] = useState({});
  const { wishlists } = user;

  //Edit wishlist
  const [modalVisible, setModalVisible] = useState(false);

  // Edit Fields
  const [wName, setWName] = useState('');
  const [wDescription, setWDescription] = useState('');

  var List = () => <Feed data={wishlists} renderItem={renderList} />;

  useEffect(() => {
    List = () => <Feed data={wishlists} renderItem={renderList} />;
  }, [wishlists]);

  const removeWishlist = async (id) => {
    try {
      await firebase.deleteWishlist(id);

      setUser((state) => {
        return {
          ...state,
          wishlists: [...state.wishlists.filter((w) => w.id != id)],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('MyWishlists');
    }
  };

  const updateWishlist = async () => {
    const date = new Date();
    try {
      // Pass data LName, DName, update Date
      await firebase.updateWishlist({
        listName: wName,
        listDesc: wDescription,
        lastEdited: date,
        id: toEdit.id,
      });

      // Pass object from firebase to update value
      setUser((state) => {
        return {
          ...state,
          wishlists: [
            ...state.wishlists.filter((w) => w.id != toEdit.id),
            {
              ...toEdit,
              listName: wName,
              listDesc: wDescription,
              lastEdited: date,
            },
          ],
        };
      });
    } catch (error) {
      alert(error.message);
    } finally {
      navigation.navigate('MyWishlists');
    }
  };

  const renderList = ({ item }) => {
    return (
      <ListContainer
        style={modalVisible ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {}}
      >
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
        <EditButton
          onPress={() => {
            setWName(item.listName);
            setWDescription(item.listDesc);
            setToEdit(item);
            setModalVisible(true);
          }}
        >
          <Feather name='edit' size={24} color='black' />
        </EditButton>
        <DeleteButton
          onPress={() => {
            removeWishlist(item.id);
          }}
        >
          <MaterialIcons name='delete' size={27} color='black' />
        </DeleteButton>
      </ListContainer>
    );
  };

  return (
    <>
      {/* Edit Single Wishlist Data */}
      <View>
        <Modal animationType='fade' transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>
            <TitleText>Title: </TitleText>
            <WishlistName
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(wName) => setWName(wName)}
              value={wName}
            />

            <DescText>Description: </DescText>
            <WishlistDetail
              autoCapitalize='none'
              autoCorrect={false}
              onChangeText={(wDescription) => setWDescription(wDescription)}
              value={wDescription}
            />

            <SaveBtn
              style={styles.openButton}
              onPress={() => {
                // TODO: update database
                // TODO: update wishlist from firestore
                updateWishlist();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Save</Text>
            </SaveBtn>

            <CloseBtn
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </CloseBtn>
          </View>
        </Modal>
      </View>

      {/* Display wishlists */}
      <View
        style={
          modalVisible
            ? { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }
            : { flex: 1 }
        }
      >
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
      </View>
    </>
  );
};

const TitleText = styled.Text``;
const DescText = styled.Text``;

const SaveBtn = styled.TouchableOpacity``;
const CloseBtn = styled.TouchableOpacity``;

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
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginTop: 30,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 100,
  },
  openButton: {
    backgroundColor: '#ff708d',
    borderRadius: 20,
    paddingLeft: 30,
    paddingRight: 30,
    padding: 10,
    // elevation: 2,
    margin: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const WishlistName = styled.TextInput`
  border-color: black;
`;

const WishlistDetail = styled.TextInput``;

const EditButton = styled.TouchableOpacity`
  position: absolute;
  left: 73%;
  top: 13px;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.TouchableOpacity`
  position: absolute;
  left: 87%;
  top: 13px;

  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusText = styled.Text`
  font-size: 25px;
  font-weight: 600;
  text-align: center;
`;

const HeaderContainer = styled.View`
  top: 63px;
  position: absolute;
  left: 10%;
`;

const FeedContainer = styled.View`
  height: 79%;
  top: 90px;
  bottom: 20px;
  width: 100%;
  position: absolute;
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
