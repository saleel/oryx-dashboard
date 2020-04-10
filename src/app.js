import React from 'react';
import './app.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth-context';
import { StoreContextProvider } from './contexts/store-context';
import Layout from './layout';
import Home from './home';
import EntityPage from './pages/entity-page';
import ItemCreatePage from './pages/item-create-page';
import EntityCreatePage from './pages/entity-create-page';


function App() {
  return (
    <AuthContextProvider>
      <StoreContextProvider>

        <Router>
          <Switch>

            <Route path="/entity/new">
              <Layout>
                <EntityCreatePage />
              </Layout>
            </Route>

            <Route path="/:entityId/new">
              <Layout>
                <ItemCreatePage />
              </Layout>
            </Route>

            <Route path="/:entityId">
              <Layout>
                <EntityPage />
              </Layout>
            </Route>

            <Route path="/">
              <Layout>
                <Home />
              </Layout>
            </Route>

          </Switch>
        </Router>

      </StoreContextProvider>
    </AuthContextProvider>
  );
}


export default App;
