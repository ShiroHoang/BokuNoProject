import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username,
          password
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Login successful");
      navigate("/");

    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">

      <Card className="login-card">
        <Card.Body>

          <h3 className="text-center mb-4">Login</h3>

          <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Login
            </Button>

            <div className="text-center">
              Don't have an account? <Link to="/register">Register now</Link>
            </div>

          </Form>

        </Card.Body>
      </Card>

    </div>
  );
}

export default LoginPage;