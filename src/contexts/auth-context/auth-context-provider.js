import React from 'react';
import PropTypes from 'prop-types';
import AuthContext from './auth-context';


function AuthContextProvider({ children }) {
  function isLoggedIn() {
  }

  function login() {
  }

  function logout() {
  }

  const actions = {
    isLoggedIn,
    login,
    logout,
  };


  return (
    <AuthContext.Provider value={actions}>
      {children}
    </AuthContext.Provider>
  );
}


AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default AuthContextProvider;
