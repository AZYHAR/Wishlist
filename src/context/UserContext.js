import React, { createContext, useState } from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    uid: '',
    isLoggedIn: false,
    profilePhotoUrl: '',
    UserFirstName: '',
    UserLastName: '',
    bio: '',
    location: '',
    locationCode: '',
    birthday: '',
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
