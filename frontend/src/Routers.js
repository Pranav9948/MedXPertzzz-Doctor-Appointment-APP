import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Users/HomePage";
import LoginPage from "./pages/Users/LoginPage";
import RegisterPage from "./pages/Users/RegisterPage";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default Routers;
