import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import LearnMorePage from "./pages/LearnPage/LearnPage";
import CartPage from "./pages/CartPage/CartPage";
import UserAccountPage from "./pages/UserAccountPage/UserAccountPage";
import ProductPage from "./pages/ProductPage/ProductPage";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coffee" element={<ProductPage />} />
        <Route path="/tea" element={<ProductPage />} />
        <Route path="/coffee/:id" element={<LearnMorePage />} />
        <Route path="/tea/:id" element={<LearnMorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<Navigate to={"/account/login"} />} />
        <Route
          path="/account/login"
          element={<UserAccountPage login={true} user={null} />}
        />
        <Route
          path="/account/signup"
          element={<UserAccountPage login={false} user={null} />}
        />
        <Route
          path="/account/detail"
          element={<UserAccountPage/>}
        />
      </Routes>
    </div>
  );
}
export default App;
