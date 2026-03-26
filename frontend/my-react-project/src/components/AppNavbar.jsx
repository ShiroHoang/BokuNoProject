import React from "react";
import {
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  Nav,
  NavDropdown,
  Badge
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";

function AppNavbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🛒 MyShop
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* SEARCH */}
          <Form className="d-flex mx-auto w-50">
            <FormControl
              type="search"
              placeholder="Search for products..."
              className="me-2"
            />
            <Button variant="primary">Search</Button>
          </Form>

          {/* RIGHT SIDE */}
          <Nav className="ms-auto d-flex align-items-center gap-3">

            {/* CART */}
            <Link as={Link} to="/cart" className="position-relative">
              <FaShoppingCart size={22} />
              <Badge
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                2
              </Badge>
            </Link>

            {/* USER */}
            {user ? (
              <NavDropdown
                title={<FaUser size={20} />}
                align="end"
              >
                <NavDropdown.Item>
                  Hello, {user.username}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/orders">
                  My Orders
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login">
                <FaUser size={20} />
              </Link>
            )}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;