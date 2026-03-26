import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/Homepage.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import CartPage from "./pages/CartPage/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage/OrderHistoryPage";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductAdminPage from "./pages/admin/ProductAdminPage";
import ProductForm from "./pages/admin/ProductForm";
import CategoryAdminPage from "./pages/admin/CategoryAdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductAdminPage />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        <Route path="/admin/categories" element={<CategoryAdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;