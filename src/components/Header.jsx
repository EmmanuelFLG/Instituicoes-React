import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react';
import logo from '../assets/logolivro.png';
import './header.css';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  return (
    <header className="header">
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/" className="navbar-brand ms-3">
            <img src={logo} alt="Logo" />
            PortalEducacional
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setOpenNav(!openNav)}
          />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-3">
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/instituicoes">Instituições</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
