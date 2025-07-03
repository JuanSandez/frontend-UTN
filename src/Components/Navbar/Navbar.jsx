import React from "react";
import "./Navbar.css";
import { logout } from "../../utils/LogoutScreen.js";
import { Link } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const userName = user?.name || user?.email || "Usuario";

  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-title">
        ✉️ Conecta
      </Link>

      <div className="navbar-right">
        {user && <span className="navbar-user">👤 {userName}</span>}

        {user && (
          <button onClick={logout} className="logout-button">
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
