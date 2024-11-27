import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { useSelector } from "react-redux";
import Logo from "../Navbar/Logo.jpg"
import "../Navbar/Nav.css"
const Navbarsection = () => {
  const Counterproducts = useSelector((store) => store.cart.cart);

  return (
    <Navbar className="nav border-bottom bg-white sticky-top" expand="lg">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            position: "relative",
            display: "inline-block",
            backgroundImage: "url('your-background-image.jpg')", // Replace with the actual background image path
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backgroundBlendMode: "exclusion",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <img
            src={Logo}
            alt="CRUZ Logo"
            style={{
              width: "85px", // Adjust size as needed
              height: "auto", // Maintain aspect ratio
              zIndex: 2,
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
            <Nav.Link as={Link} to="/WishlistPAGE">
             WishList
            </Nav.Link>

            <Link to="/cart" className="nav-link">
              <HiShoppingCart size={30} />
              <Badge bg="primary">{Counterproducts.length}</Badge>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarsection;
