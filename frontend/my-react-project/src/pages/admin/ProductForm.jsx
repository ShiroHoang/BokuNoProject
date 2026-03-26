import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Row, Col, Image, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";

function ProductForm() {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        imageUrl: "",
        categoryId: "",
        description: "",
        stock: "" // 🔥 1. Thêm stock vào state
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // URL gốc của Admin API theo Controller của bạn
    const ADMIN_API_URL = "http://localhost:8080/api/admin/products";

    useEffect(() => {
        // 1. Load danh mục (Dùng API public)
        axios.get("http://localhost:8080/api/categories")
            .then(res => setCategories(res.data))
            .catch(err => console.error("Không thể tải danh mục"));

        // 2. Nếu là mode Edit, load dữ liệu sản phẩm (Dùng API public để lấy detail)
        if (id) {
            axios.get(`http://localhost:8080/api/products/${id}`)
                .then(res => {
                    const p = res.data;
                    setProduct({
                        name: p.name || "",
                        price: p.price || "",
                        imageUrl: p.imageUrl || "",
                        description: p.description || "",
                        stock: p.stock || "", // 🔥 2. Load stock từ DB
                        categoryId: p.category?.id || ""
                    });
                });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            ...product,
            price: product.price === "" ? null : Number(product.price),
            stock: product.stock === "" ? 0 : Number(product.stock), // 🔥 3. Ép kiểu số cho stock
            category: { id: product.categoryId }
        };

        const config = { withCredentials: true };

        // 🔥 QUAN TRỌNG: URL phải là ADMIN_API_URL (/api/admin/products)
        const apiCall = id
            ? axios.put(`${ADMIN_API_URL}/${id}`, payload, config)
            : axios.post(ADMIN_API_URL, payload, config);

        apiCall
            .then(() => {
                alert(id ? "Cập nhật thành công!" : "Thêm mới thành công!");
                navigate("/admin/products");
            })
            .catch(err => {
                console.error("Lỗi:", err.response);
                alert("Lỗi: " + (err.response?.status === 405 ? "Sai Method hoặc URL!" : "Kiểm tra quyền Admin!"));
            })
            .finally(() => setLoading(false));
    };

    return (
        <>
            <AppNavbar />
            <Container className="mt-4 pb-5">
                {/* ... Header giữ nguyên ... */}
                <Card className="shadow-sm">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={7}>
                                    {/* Name Field */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Product Name</Form.Label>
                                        <Form.Control
                                            required
                                            value={product.name}
                                            onChange={e => setProduct({ ...product, name: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold">Price ($)</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    value={product.price}
                                                    onChange={e => setProduct({ ...product, price: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        {/* 🔥 4. THÊM Ô NHẬP STOCK */}
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold">Stock Quantity</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    placeholder="0"
                                                    value={product.stock}
                                                    onChange={e => setProduct({ ...product, stock: e.target.value })}
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="fw-bold">Category</Form.Label>
                                                <Form.Select
                                                    required
                                                    value={product.categoryId}
                                                    onChange={e => setProduct({ ...product, categoryId: e.target.value })}
                                                >
                                                    <option value="">-- Select --</option>
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.id}>{c.name}</option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Description</Form.Label>
                                        <Form.Control
                                            as="textarea" rows={3}
                                            value={product.description}
                                            onChange={e => setProduct({ ...product, description: e.target.value })}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Image URL</Form.Label>
                                        <Form.Control
                                            value={product.imageUrl}
                                            onChange={e => setProduct({ ...product, imageUrl: e.target.value })}
                                        />
                                    </Form.Group>
                                </Col>

                                {/* Preview Image Col giữ nguyên */}
                                <Col md={5} className="text-center border-start d-flex flex-column align-items-center justify-content-center">
                                    <Form.Label className="fw-bold d-block w-100 text-start ps-3">Preview</Form.Label>
                                    <div className="border rounded bg-light d-flex align-items-center justify-content-center" style={{ width: "250px", height: "250px", overflow: "hidden" }}>
                                        {product.imageUrl ? (
                                            <Image src={product.imageUrl} fluid style={{ maxHeight: "100%" }} />
                                        ) : (
                                            <span className="text-muted">No Image</span>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                            <hr />
                            <div className="text-end">
                                <Button variant="primary" type="submit" size="lg" disabled={loading}>
                                    {loading ? "Saving..." : "Save Product"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default ProductForm;