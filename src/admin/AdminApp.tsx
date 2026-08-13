import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ToastProvider } from "../context/ToastContext";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./AdminLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsListPage from "./pages/ProductsListPage";
import ProductFormPage from "./pages/ProductFormPage";
import CategoriesPage from "./pages/CategoriesPage";

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="productos" element={<ProductsListPage />} />
            <Route path="productos/nuevo" element={<ProductFormPage />} />
            <Route path="productos/:id" element={<ProductFormPage />} />
            <Route path="categorias" element={<CategoriesPage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
