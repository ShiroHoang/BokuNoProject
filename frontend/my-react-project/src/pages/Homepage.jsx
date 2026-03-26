import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AppNavbar from "../components/AppNavbar";
import manyPoke from '../assets/many_poke.jpg';
import sittingPoke from '../assets/sitting-poke.jpg';
import pachirisu from '../assets/pachirisu.jpg';
import { useNavigate } from "react-router-dom";
import "./Homepage.css"
import { addToCart } from "../service/cartService";

function HomePage() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/products/top10")
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []); // ✅ chỉ chạy 1 lần

  return (
    <>
      <AppNavbar />

      <Container className="mt-3">

        {/* ===== SLIDER ===== */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src={manyPoke}
              alt="slide1"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src={sittingPoke}
              alt="slide2"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src={pachirisu}
              alt="slide3"
            />
          </Carousel.Item>
        </Carousel>

        {/* ===== FEATURED PRODUCTS ===== */}
        <h3 className="mt-4 mb-3">🔥 Featured Products</h3>

        <Row>
          {products.map((p) => (
            <Col md={3} sm={6} xs={12} className="mb-4" key={p.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={p.imageUrl} className="product-img" />

                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>${p.price}</Card.Text>

                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </Button>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    View Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </>
  );
}

export default HomePage;