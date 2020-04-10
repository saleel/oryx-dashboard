import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import usePromise from '../hooks/use-promise';
import StoreContext from '../contexts/store-context';
import './layout.scss';


const Layout = (props) => {
  const { children } = props;

  const { findEntities } = React.useContext(StoreContext);

  const [entities] = usePromise(() => findEntities(), {
    defaultValue: [],
  });


  return (
    <div className="layout">
      <Navbar className="layout__appbar" bg="white">
        <Container>
          <Navbar.Brand href="/">Oryx Dashboard</Navbar.Brand>
          <Nav className="ml-auto">
            <div>User Name</div>
          </Nav>
        </Container>
      </Navbar>

      <Navbar className="layout__menu" bg="white">
        <Container>
          <Nav.Link href="/">Home</Nav.Link>
          {entities.map((entity) => (
            <Nav.Link href={`/${entity.id}`}>{entity.name}</Nav.Link>
          ))}
          <Nav.Link href="/entity/new">New Entity</Nav.Link>
        </Container>
      </Navbar>

      <main className="layout__content">
        <Container>
          {children}
        </Container>
      </main>
    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Layout;
