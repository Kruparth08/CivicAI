import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
  toast.error(err.response?.data?.message || "Logout failed");
}
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-600 transition";

  const goHome = () => {
    navigate(user?.role === "admin" ? "/admin/dashboard" : "/dashboard");
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  const NavLinks = ({ mobile = false }) => (
    <div
      className={
        mobile
          ? "flex flex-col gap-3"
          : "hidden md:flex items-center gap-6"
      }
    >
      {user?.role === "admin" ? (
        <>
          <Link
            to="/admin/dashboard"
            onClick={closeMenu}
            className={isActive("/admin/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/issues"
            onClick={closeMenu}
            className={isActive("/admin/issues")}
          >
            Manage Issues
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className={isActive("/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            to="/create-issue"
            onClick={closeMenu}
            className={isActive("/create-issue")}
          >
            Report
          </Link>

          <Link
            to="/my-issues"
            onClick={closeMenu}
            className={isActive("/my-issues")}
          >
            My Issues
          </Link>

          <Link
            to="/leaderboard"
            onClick={closeMenu}
            className={isActive("/leaderboard")}
          >
            Leaderboard
          </Link>
        </>
      )}

      <Link
        to="/profile"
        onClick={closeMenu}
        className={isActive("/profile")}
      >
        Profile
      </Link>

      {/* Logout */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">

        {/* LOGO */}
        <h1
          onClick={goHome}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          CivicAI
        </h1>

        {/* DESKTOP */}
        <NavLinks />

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-5 py-4">

          <NavLinks mobile />

        </div>
      )}

    </nav>
  );
};

export default Navbar;