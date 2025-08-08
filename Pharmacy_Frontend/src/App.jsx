import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ModeratorDashboard from "./pages/ModeratorDashboard";
import RoleGuard from "./RoleGuard";
import TokenHandler from "./TokenHandler";
import authService from './services/authService';
import { AuthContextProvider } from './context/AuthContext';


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RoleGuard allowedRoles={["user", "admin", "moderator"]}>
              <Dashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleGuard allowedRoles={["admin"]}>
              <AdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/moderator"
          element={
            <RoleGuard allowedRoles={["admin", "moderator"]}>
              <ModeratorDashboard />
            </RoleGuard>
          }
        />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

