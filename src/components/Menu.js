import { Link } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';

const Menu = () => {
  return (
    <Container>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link to="/login" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <button type="button" className="btn btn-outline-primary me-2">
            Login
          </button>
        </Link>
        <Nav>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/validate-address" className="nav-link px-2 link-secondary">
                Validate Address
              </Link>
            </li>
            <li>
              <Link to="/company-check" className="nav-link px-2 link-secondary">
                Company Check
              </Link>
            </li>
            <li>
              <Link to="/officer-check" className="nav-link px-2 link-secondary">
                Officer Check
              </Link>
            </li>
          </ul>
        </Nav>
      </header>
    </Container>
  );
};

export default Menu;
