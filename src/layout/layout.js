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
        <Navbar className="layout__top-bar" bg="primary">
          <Link className="layout__logo" to="/">Oryx Dashboard</Link>
          <Nav className="ml-auto">
            <div>User Name</div>
          </Nav>
        </Navbar>
      </div>

      <div className="layout__body">

        <nav className="layout__sidebar d-none d-md-block">
          <Nav defaultActiveKey="/home" className="flex-column">
            <Link className="layout__menu-link" to="/">Home</Link>
            <Link className="layout__menu-link" to="/users">Users</Link>
            <hr />
            {entities.filter((e) => e.id !== 'users').map((entity) => (
              <Link className="layout__menu-link" key={entity.id} to={`/${entity.id}`}>
                {entity.name}
              </Link>
            ))}
            <hr />
            <Link className="layout__menu-link" to="/entity/new">New Entity</Link>
          </Nav>
        </nav>

        <main role="main" className="layout__content">
          <Container>
            <>
              <h2 className="layout__page-title">
                {pageTitle}
              </h2>

              {children}
            </>
          </Container>
        </main>

      </div>

    </div>
  );
};


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};


export default Layout;
