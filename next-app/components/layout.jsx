import Image from 'next/image';
import { Row, Col, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import Link from 'next/link';
import styles from '../styles/Layout.module.css'

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

function Layout({ children }) {
  return (
    <>
      <Navbar className={styles.navbar} bg="dark" variant="dark" sticky="top">
        <Navbar.Brand><Link href='/'>Dire Dice</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/builds">Builds</NavLink>
            <NavDropdown title="Journals" id="basic-nav-dropdown">
              <DropDownLink href="/journals/skt">Storm King's Thunder</DropDownLink>
            </NavDropdown>
            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <DropDownLink href="/tools/dice">Dice Calculator</DropDownLink>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      { children }
  {/*         <footer className={styles.footer}>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}
              <span className={styles.logo}>
                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
              </span>
            </a>
          </footer> */}
    </>
  );
};

export default Layout;
