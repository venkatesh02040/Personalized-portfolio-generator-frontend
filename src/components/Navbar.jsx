import { useState } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  MenuOutlined,
  CloseOutlined,
  LoginOutlined,
  UserAddOutlined,
  DashboardOutlined,
  PlusCircleOutlined,
  EditOutlined,
  AppstoreOutlined,
  EyeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Modal, message } from "antd";
import { FaShareAlt, FaCopy } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 NEW STATES (only for share)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/", { replace: true });
  };

  const closeMenu = () => setMenuOpen(false);

  // 🔹 Check if we are in /view page
  const isViewPage = location.pathname === "/view";

  // 🔹 Check if template exists
  const selectedTemplate = localStorage.getItem("selectedTemplate");
  const user = JSON.parse(localStorage.getItem("user"));

  const isShareDisabled = !selectedTemplate || !user || !user.slug; // ✅ also check slug exists

  // 🔹 Share Handler
  const handleShare = () => {
    if (isShareDisabled) {
      message.warning("Please select a template first");
      return;
    }

    const generatedLink = `${window.location.origin}/portfolio/${user.slug}/${selectedTemplate}`; // ✅ use slug instead of username
    setShareLink(generatedLink);
    setIsModalOpen(true);
  };

  // 🔹 Copy Handler
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    message.success("Link copied successfully!");
  };

  return (
    <nav className="navbar">
      <div className="navbar-wrapper">

        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMenu}>
            PortfolioGen
          </Link>
        </div>

        {/* Nav Links */}
        <div className={`navbar-links ${menuOpen ? "show" : ""}`}>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" onClick={closeMenu}>
                <LoginOutlined className="nav-icon" />
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={closeMenu}
                className="primary-btn"
              >
                <UserAddOutlined className="nav-icon" />
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>
                <DashboardOutlined className="nav-icon" />
                Dashboard
              </NavLink>

              <NavLink to="/create-portfolio" onClick={closeMenu}>
                <PlusCircleOutlined className="nav-icon" />
                Create
              </NavLink>

              <NavLink to="/edit-portfolio" onClick={closeMenu}>
                <EditOutlined className="nav-icon" />
                Edit
              </NavLink>

              <NavLink to="/templates" onClick={closeMenu}>
                <AppstoreOutlined className="nav-icon" />
                Templates
              </NavLink>

              <NavLink to="/view" onClick={closeMenu}>
                <EyeOutlined className="nav-icon" />
                View
              </NavLink>

              <button onClick={handleLogout} className="logout-btn">
                <LogoutOutlined className="nav-icon" />
                Logout
              </button>
            </>
          )}
        </div>

        {/* 🔹 Share Icon (ONLY on /view) */}
        {isAuthenticated && isViewPage && (
          <div
            className={`navbar-share ${isShareDisabled ? "disabled" : ""}`}
            onClick={handleShare}
          >
            <FaShareAlt />
          </div>
        )}

        {/* Hamburger */}
        <div
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>

        {/* 🔹 Share Modal */}
        <Modal
          title="Share Your Portfolio"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="share-modal-content">
            <input
              value={shareLink}
              readOnly
              className="share-input"
            />
            <FaCopy
              className="copy-icon"
              onClick={handleCopy}
            />
          </div>
        </Modal>

      </div>
    </nav>
  );
};

export default Navbar;