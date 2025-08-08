import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import DrugDetails from './pages/DrugDetails';
import ProfilePage from './pages/ProfilePage';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import AddDrug from "./pages/AddDrug";
import ViewOrders from "./pages/ViewOrders";
import UpdateOrderStatus from "./pages/UpdateOrderStatus";
import UserProfile from './pages/UserProfile';
import DrugSearch from './pages/DrugSearch';
import ManageDrugs from './pages/ManageDrugs';
import EditDrugForm from './pages/EditDrugForm';
import Wishlist from './pages/Wishlist';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InventoryDashboard from "./pages/InventoryDashboard";



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/drug/:id" element={<DrugDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/add-drug"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddDrug />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ViewOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/update-order-status"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UpdateOrderStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/browse"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <DrugSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-drugs"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ManageDrugs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-drug/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EditDrugForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryDashboard />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;