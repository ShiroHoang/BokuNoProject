import { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    Pagination
} from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductListPage.css";


function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 9;

    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get("keyword") || "";

    //pagiantion
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    const currentProducts = products.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    useEffect(() => {
        fetchProducts();
    }, [category, sort, location.search]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [category, sort, keyword]);

    const fetchProducts = () => {
        let url = "http://localhost:8080/api/products?";

        if (category) url += `categoryId=${category}&`;
        if (sort) url += `sort=${sort}&`;
        if (keyword) url += `keyword=${keyword}`;

        axios.get(url)
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    return (
        <>
            <AppNavbar />

            <Container className="mt-4">
                <Row>

                    {/* FILTER BOX */}
                    <Col md={3}>
                        <h5>Filter</h5>

                        <Form.Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>

                            {categories.map(c => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>

                    {/* PRODUCT LIST */}
                    <Col md={9}>

                        {/* SORT */}
                        <div className="d-flex justify-content-end mb-3">
                            <Form.Select
                                style={{ width: "200px" }}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="">Sort By</option>
                                <option value="priceAsc">Price ↑</option>
                                <option value="priceDesc">Price ↓</option>
                            </Form.Select>
                        </div>

                        <Row>
                            {currentProducts.map(p => (
                                <Col md={4} key={p.id} className="mb-4">
                                    <Card className="h-100 product-list">
                                        <Card.Img variant="top"
                                            src={p.imageUrl}
                                            className="product-img" />

                                        <Card.Body>
                                            <Card.Title>{p.name}</Card.Title>
                                            <Card.Text>${p.price}</Card.Text>

                                            <Button variant="outline-primary"
                                                size="sm"
                                                onClick={() => navigate(`/product/${p.id}`)}>
                                                View Detail
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Pagination className="justify-content-center mt-4">

                            <Pagination.Prev
                                onClick={() => setCurrentPage(p => p - 1)}
                                disabled={currentPage === 1}
                            />

                            {[...Array(totalPages)].map((_, i) => (
                                <Pagination.Item
                                    key={i}
                                    active={i + 1 === currentPage}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next
                                onClick={() => setCurrentPage(p => p + 1)}
                                disabled={currentPage === totalPages}
                            />

                        </Pagination>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProductListPage;