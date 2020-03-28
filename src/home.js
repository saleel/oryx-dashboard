import React from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import StoreContext from './contexts/store-context';
import usePromise from './hooks/use-promise';


function Home() {
  const { findSchemas } = React.useContext(StoreContext);

  const [schemas] = usePromise(() => findSchemas(), {
    defaultValue: [],
  });

  if (!schemas.length) return null;


  return (
    <div>

      Home page


    </div>
  );
}


export default Home;
