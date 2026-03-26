import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";
import "./ProductDetail.css";
import { addToCart } from "../../service/cartService";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <AppNavbar />

      <Container className="mt-4 product-detail">
        <Row>
          {/* IMAGE */}
          <Col md={6}>
            <Card>
              <Card.Img
                src={product.imageUrl}
                className="product-img "
              />
            </Card>
          </Col>

          {/* INFO */}
          <Col md={6}>
            <h2>{product.name}</h2>
            <h4 className="text-danger">${product.price}</h4>

            <p>{product.description}</p>

            <Button
              variant="success"
              size="sm"
              onClick={() => addToCart(p)}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetail;