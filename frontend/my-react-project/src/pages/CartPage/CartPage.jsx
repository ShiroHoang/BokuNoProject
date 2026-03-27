import { useEffect, useState } from "react";
import {
    getCart,
    removeFromCart,
    clearCart
} from "../../service/cartService";
import { Container, Table, Button } from "react-bootstrap";
import AppNavbar from "../../components/AppNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CartPage() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        setCart(getCart());
    }, []);

    const refreshCart = () => setCart(getCart());

    const handleRemove = (id) => {
        removeFromCart(id);
        refreshCart();
    };

    const handleIncrease = (item) => {
        // 🔥 Kiểm tra giới hạn Stock (Giả sử item có field stock)
        if (item.stock !== undefined && item.quantity >= item.stock) {
            return alert(`Sorry, only ${item.stock} units available in stock!`);
        }

        const currentCart = getCart();
        const updated = currentCart.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        localStorage.setItem("cart", JSON.stringify(updated));
        refreshCart();
    };

    const handleDecrease = (id) => {
        const updated = cart.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        localStorage.setItem("cart", JSON.stringify(updated));
        refreshCart();
    };

    const handleCheckout = () => {
        const payload = {
            userId: user.id,
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }))
        };

        axios.post("http://localhost:8080/api/orders/checkout", payload, { withCredentials: true })
            .then(() => {
                alert("✅ Order placed successfully!");
                clearCart();
                setCart([]);
                navigate("/");
            })
            .catch(err => {
                console.error(err);
                const errorMsg = err.response?.data?.message || "Checkout failed";
                alert(`❌ ${errorMsg}`);
            });
    };

    const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

    return (
        <>
            <AppNavbar />

            <Container className="mt-4">
                <h2>🛒 Your Cart</h2>

                {cart.length === 0 ? (
                    <div className="text-center mt-5">
                        <h4>Your cart is empty 😢</h4>
                        <Button onClick={() => navigate("/")}>
                            Go Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>

                                        <td>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleDecrease(item.id)}
                                            >
                                                -
                                            </Button>

                                            <span className="mx-2">{item.quantity}</span>

                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleIncrease(item.id)}
                                            >
                                                +
                                            </Button>
                                        </td>

                                        <td>${item.price * item.quantity}</td>

                                        <td>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                Remove
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <h4>Total: ${total.toFixed(2)}</h4>

                        <div className="d-flex gap-2">
                            <Button variant="success" onClick={handleCheckout}>
                                Checkout
                            </Button>

                            <Button variant="outline-danger" onClick={() => {
                                clearCart();
                                setCart([]);
                            }}>
                                Clear Cart
                            </Button>
                        </div>
                    </>
                )}
            </Container>
        </>
    );
}

export default CartPage;