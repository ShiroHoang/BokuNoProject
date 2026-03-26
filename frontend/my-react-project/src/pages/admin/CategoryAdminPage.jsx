import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Form, InputGroup, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";

function CategoryAdminPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();
    const [description, setDescription] = useState("");

    // 🔥 URL ADMIN (Theo AdminCategoryController.java)
    const ADMIN_CAT_API = "http://localhost:8080/api/admin/categories";
    // 🔥 URL PUBLIC (Dùng để load danh sách nếu Controller Admin không có hàm Get)
    const PUBLIC_CAT_API = "http://localhost:8080/api/categories";

    // 1. Load danh sách
    const load = () => {
        // Thử gọi Admin API trước, nếu bạn chưa viết hàm GET ở Admin thì dùng Public API
        axios.get(PUBLIC_CAT_API)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setCategories(res.data);
                }
            })
            .catch(err => console.error("Lỗi khi tải danh mục:", err));
    };

    useEffect(() => {
        load();
    }, []);

    // 2. Thêm hoặc Cập nhật
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return alert("Tên danh mục không được để trống!");

        const payload = { name, description };
        const config = { withCredentials: true };

        if (editingId) {
            // Chế độ Sửa: PUT http://localhost:8080/api/admin/categories/{id}
            axios.put(`${ADMIN_CAT_API}/${editingId}`, { name }, config)
                .then(() => {
                    alert("Cập nhật thành công!");
                    setEditingId(null);
                    setName("");
                    load();
                })
                .catch(err => alert("Lỗi: Không có quyền sửa hoặc trùng tên!"));
        } else {
            // Chế độ Thêm mới: POST http://localhost:8080/api/admin/categories
            axios.post(ADMIN_CAT_API, { name }, config)
                .then(() => {
                    alert("Thêm mới thành công!");
                    setName("");
                    load();
                })
                .catch(err => alert("Lỗi: Không có quyền thêm!"));
        }
    };

    // 3. Xóa
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            axios.delete(`${ADMIN_CAT_API}/${id}`, { withCredentials: true })
                .then(() => {
                    alert("Đã xóa!");
                    load();
                })
                .catch(err => alert("Lỗi: Không có quyền xóa hoặc danh mục này đang có sản phẩm!"));
        }
    };

    // 4. Bật chế độ sửa
    const startEdit = (category) => {
        setEditingId(category.id);
        setName(category.name);
        setDescription(c.description || "");
        window.scrollTo(0, 0);
    };

    return (
        <>
            <AppNavbar />
            <Container className="mt-4">
                <h3>🏷️ Category Management</h3>
                
                <Card className="mb-4 shadow-sm border-0 bg-light">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="fw-bold small">Category Name</Form.Label>
                                        <Form.Control
                                            placeholder="Tên danh mục..."
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-2">
                                        <Form.Label className="fw-bold small">Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={1}
                                            placeholder="Mô tả ngắn..."
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="text-end mt-2">
                                {editingId && <Button variant="secondary" className="me-2" onClick={() => {setEditingId(null); setName(""); setDescription("");}}>Hủy</Button>}
                                <Button variant={editingId ? "warning" : "primary"} type="submit">
                                    {editingId ? "Cập nhật danh mục" : "Thêm danh mục"}
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

                <Table bordered hover responsive className="shadow-sm bg-white">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: "10%" }}>ID</th>
                            <th>Category Info</th>
                            <th style={{ width: "20%", textAlign: "center" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>
                                    <div className="fw-bold text-primary">{c.name}</div>
                                    <small className="text-muted">{c.description || "No description provided."}</small>
                                </td>
                                <td className="text-center">
                                    <Button size="sm" variant="outline-warning" className="me-2" onClick={() => startEdit(c)}>Sửa</Button>
                                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(c.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );

}

export default CategoryAdminPage;