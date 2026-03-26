import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Badge, Button } from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";
import { Modal } from "react-bootstrap";

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [show, setShow] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (!user) return;

        axios.get(`http://localhost:8080/api/orders/user/${user.id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));

    }, []);

    const handleShow = (order) => {
        setSelectedOrder(order);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedOrder(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING": return "warning";
            case "COMPLETED": return "success";
            case "CANCELLED": return "danger";
            default: return "secondary";
        }
    };

    return (
        <>
            <AppNavbar />

            <Container className="mt-4">
                <h2>📦 Order History</h2>

                {orders.length === 0 ? (
                    <p>No orders yet</p>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>#{order.id}</td>
                                    <td>{new Date(order.orderDate).toLocaleString()}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        <Badge bg={getStatusColor(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="info"
                                            onClick={() => handleShow(order)}
                                        >
                                            View Detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    🧾 Order #{selectedOrder?.id}
                                </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                {selectedOrder && (
                                    <>
                                        <p>Status: <b>{selectedOrder.status}</b></p>

                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {selectedOrder.items.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.product.name}</td>
                                                        <td>${item.price}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>${item.price * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                        <h5 className="text-end">
                                            Total: ${selectedOrder.totalPrice}
                                        </h5>
                                    </>
                                )}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Table>
                )}
            </Container>
        </>
    );
}

export default OrderHistoryPage;