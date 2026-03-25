import React from "react";
import AppNavbar from "../components/Navbar";

function HomePage() {
  return (
    <div>
      <AppNavbar />

      <div className="container mt-4">
        <h2>Welcome to MyShop 🛍️</h2>
        <p>Browse our products...</p>
      </div>
    </div>
  );
}

export default HomePage;