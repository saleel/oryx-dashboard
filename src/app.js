import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { AuthContextProvider } from './contexts/auth-context';
import { StoreContextProvider } from './contexts/store-context';
import theme from './theme';
import Layout from './layout';
import Home from './home';
import EntityPage from './pages/entity';
import ItemCreatePage from './pages/item-create';
import EntityCreatePage from './pages/entity-create';


function App() {
  return (
    <AuthContextProvider>
      <StoreContextProvider>
        <ThemeProvider theme={theme}>

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

        </ThemeProvider>
      </StoreContextProvider>
    </AuthContextProvider>
  );
}


export default App;
