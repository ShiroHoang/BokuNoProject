import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../../components/AppNavbar";

function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    const loadOrders = () => {
        axios.get(`http://localhost:8080/api/admin/orders?page=${page}&size=9`, {
            withCredentials: true
        }).then(res => {
            // Kiểm tra dữ liệu tránh crash
            if (res.data && res.data.content) {
                setOrders(res.data.content);
                setTotalPages(res.data.totalPages);
            }
        }).catch(err => console.error("403 Forbidden: Check Role Admin"));
    };

    useEffect(() => { loadOrders(); }, [page]);

    const updateStatus = (id, status) => {
        axios.put(`http://localhost:8080/api/admin/orders/${id}/status?status=${status}`, {}, { withCredentials: true })
            .then(() => {
                alert("Updated!");
                loadOrders();
            });
    };

    return (
        <>
            <AppNavbar />
            <Container className="mt-4">
                <Row className="mb-4">
                    <Col><h2>🧑‍💼 Admin - Orders</h2></Col>
                    <Col className="text-end">
                        <Button variant="outline-secondary" onClick={() => navigate(-1)}>← Back</Button>
                    </Col>
                </Row>
                <Table bordered hover responsive>
                    <thead>
                        <tr><th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map(o => (
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.user?.username}</td>
                                    <td>${o.totalPrice}</td>
                                    <td><Badge bg="info">{o.status}</Badge></td>
                                    <td>
                                        <Form.Select size="sm" onChange={(e) => updateStatus(o.id, e.target.value)} defaultValue="">
                                            <option value="" disabled>Change</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </Form.Select>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" className="text-center">No orders found.</td></tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
export default AdminDashboard;