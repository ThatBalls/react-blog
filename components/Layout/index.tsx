import Image from 'next/image';
import { Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Footer } from "components/Footer";
import Link from 'next/link';
import styles from 'styles/Layout.module.css'
import { MainContent, LayoutContainer } from './Layout.css';

const NavLink = ({href, children}) => {
  return (
    <div className="nav-link"><Link href={href}>{children}</Link></div>
  );
};

const DropDownLink = ({href, children}) => {
  return (
    <div className="dropdown-item"><Link href={href}>{children}</Link></div>
  );
};

export const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar className={styles.navbar} bg="dark" variant="dark" sticky="top">
        <Navbar.Brand><Link href='/'>Dire Dice</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/brews">Brews</NavLink>
            <NavLink href="/builds">Builds</NavLink>
            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <DropDownLink href="/tools/dice">Dice Calculator</DropDownLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MainContent>
        { children }
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};