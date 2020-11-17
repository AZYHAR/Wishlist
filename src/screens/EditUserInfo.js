import React, { useContext } from 'react';

import { Text } from 'react-native';
import styled from 'styled-components';

export default EditUserInfo = () => {
  return (
    <Container>
      <SaveUserData>
        <Text>Edit User</Text>
      </SaveUserData>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const SaveUserData = styled.TouchableOpacity`
  left: 45%;
  top: 50%;
`;
