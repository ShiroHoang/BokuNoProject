import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Badge, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";

function ProductAdminPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const loadProducts = () => {
        axios.get("http://localhost:8080/api/products", {
            withCredentials: true // Luôn mang theo session nếu cần check quyền xem
        })
        .then(res => {
            if (Array.isArray(res.data)) {
                setProducts(res.data);
            } else if (res.data.content) {
                // Trường hợp backend trả về Page object (có phân trang)
                setProducts(res.data.content);
            }
        })
        .catch(err => console.error("Lỗi khi tải sản phẩm:", err));
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("❗ Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

        axios.delete(`http://localhost:8080/api/products/${id}`, {
            withCredentials: true // Bắt buộc để không bị 403 khi xóa
        })
        .then(() => {
            alert("Xóa thành công!");
            loadProducts();
        })
        .catch(err => {
            alert("Lỗi: Bạn không có quyền xóa hoặc sản phẩm đang nằm trong đơn hàng!");
        });
    };

    return (
        <>
            <AppNavbar />
            <Container className="mt-4">
                {/* HEADER SECTION */}
                <Row className="mb-4 align-items-center">
                    <Col>
                        <h3>📦 Product Management</h3>
                        <p className="text-muted">Total: {products.length} products</p>
                    </Col>
                    <Col className="text-end">
                        <Button 
                            variant="outline-secondary" 
                            className="me-2" 
                            onClick={() => navigate(-1)}
                        >
                            ← Back
                        </Button>
                        <Button 
                            variant="primary" 
                            onClick={() => navigate("/admin/products/new")}
                        >
                            + Add New Product
                        </Button>
                    </Col>
                </Row>

                {/* TABLE SECTION */}
                <Table bordered hover responsive className="shadow-sm bg-white align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: "5%" }}>ID</th>
                            <th style={{ width: "10%" }}>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th style={{ width: "15%", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>
                                        <Image 
                                            src={p.imageUrl || "https://via.placeholder.com/50"} 
                                            alt={p.name}
                                            rounded
                                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>
                                        <div className="fw-bold">{p.name}</div>
                                        <small className="text-muted text-truncate d-block" style={{maxWidth: "200px"}}>
                                            {p.description}
                                        </small>
                                    </td>
                                    <td>
                                        <Badge bg="secondary">
                                            {p.category?.name || "Uncategorized"}
                                        </Badge>
                                    </td>
                                    <td className="text-danger fw-bold">
                                        ${p.price?.toLocaleString()}
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            size="sm"
                                            variant="outline-warning"
                                            className="me-2"
                                            onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline-danger"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-muted">
                                    No products found. Start by adding one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default ProductAdminPage;