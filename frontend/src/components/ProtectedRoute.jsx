import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserLayout from "./UserLayout";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <UserLayout>{children}</UserLayout>;
};

export default ProtectedRoute;