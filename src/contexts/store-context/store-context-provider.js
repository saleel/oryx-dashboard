// @ts-check

import React from 'react';
import PropTypes from 'prop-types';
import StoreContext from './store-context';
import DataManager from './data-manager';


function StoreContextProvider({ children }) {
  const value = new DataManager();

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}


StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default StoreContextProvider;
