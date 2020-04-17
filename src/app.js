import React from 'react';
import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Layout from './layout';
import HomePage from './pages/home-page/home-page';
import EntityPage from './pages/entity-page';
import ItemCreatePage from './pages/item-create-page';
import EntityCreatePage from './pages/entity-create-page';
import StoreContext from './contexts/store-context';
import usePromise from './hooks/use-promise';
import ItemPage from './pages/item-page';


function App() {
  const { findEntities } = React.useContext(StoreContext);

  const [entities, { isFetching }] = usePromise(() => findEntities());


  if (!entities || isFetching) {
    return (<Spinner animation="border" />);
  }


  const routes = [
    {
      path: '/entity/new',
      component: EntityCreatePage,
      title: 'New entity',
    },
    {
      path: '/:entityId/new',
      component: ItemCreatePage,
      title: ({ entityId }) => `New ${entities.find((e) => e.id === entityId).name}`,
    },
    {
      path: '/:entityId/:itemId',
      component: ItemPage,
      title: ({ entityId }) => `${entities.find((e) => e.id === entityId).name}`,
    },
    {
      path: '/:entityId',
      component: EntityPage,
      title: ({ entityId }) => `${entities.find((e) => e.id === entityId).name}`,
    },
    {
      path: '/',
      component: HomePage,
      title: 'Home',
    },
  ];


  return (
    <Router>
      <Switch>

        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={({ match }) => {
              const pageTitle = typeof route.title === 'function' ? route.title(match.params) : route.title;

              return (
                <Layout entities={entities} pageTitle={pageTitle}>
                  <route.component />
                </Layout>
              );
            }}
          />
        ))}

      </Switch>
    </Router>
  );
}


export default App;
