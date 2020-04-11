import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './layout.scss';


const Layout = (props) => {
  const { children, pageTitle, entities } = props;


  return (
    <div className="layout">

      <div className="layout__header">
        <Navbar className="layout__brand" bg="white">
          <Container>
            <Navbar.Brand href="/">Oryx Dashboard</Navbar.Brand>
            <Nav className="ml-auto">
              <div>User Name</div>
            </Nav>
          </Container>
        </Navbar>

        <Navbar className="layout__menu" bg="white">
          <Container>
            <Link to="/">Home</Link>
            {entities.map((entity) => (
              <Link key={entity.id} to={`/${entity.id}`}>
                {entity.name}
              </Link>
            ))}
            <Link to="/entity/new">New Entity</Link>
          </Container>
        </Navbar>
      </div>

      <main className="layout__content">
        <Container>
          <h2 className="layout__page-title">
            {pageTitle}
          </h2>

          {children}
        </Container>
      </main>

    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};


export default Layout;
