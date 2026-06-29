import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "./AdminLayout";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-red-600">
            Access Denied
          </h1>
          <p className="text-gray-600 mt-2">
            Admin access required
          </p>
        </div>
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminRoute;