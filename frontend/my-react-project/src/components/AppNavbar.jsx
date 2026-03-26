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

  const [cartCount, setCartCount] = React.useState(0);
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  const handleSearch = (e) => {
    e.preventDefault(); // 🔥 bắt buộc

    console.log("Searching:", keyword); // debug

    navigate(`/products?keyword=${keyword}`);
  };

  React.useEffect(() => {
    updateCartCount(); // load lần đầu

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
      <Container>

        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          🛒 MyShop
        </Navbar.Brand>

        <Nav className="me-3">
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
        </Nav>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/* SEARCH */}
          <Form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search for products..."
              className="me-2"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
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
                {cartCount}
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