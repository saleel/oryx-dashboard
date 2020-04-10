import React from 'react';
import WidgetCount from '../../components/widget-count';
// import StoreContext from './contexts/store-context';
// import usePromise from './hooks/use-promise';


function Home() {
  // const { findEntities } = React.useContext(StoreContext);

  // const [entities] = usePromise(() => findEntities(), {
  //   defaultValue: [],
  // });

  // if (!entities.length) return null;


  return (
    <div>

      <WidgetCount className="col-xs-12 col-md-3 col-lg-2" label="Users" value={92001} />

    </div>
  );
}


export default Home;
